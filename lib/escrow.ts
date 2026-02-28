/**
 * Escrow client utilities for Sleepy Gatekeeper OS.
 *
 * Provides helpers to interact with the on-chain Anchor escrow program from
 * the Next.js frontend.  Uses @coral-xyz/anchor + @solana/web3.js which are
 * already project dependencies.
 */

import {
  PublicKey,
  Connection,
  SystemProgram,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Program ID — must match the deployed Anchor program (see Anchor.toml). */
export const ESCROW_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_ESCROW_PROGRAM_ID ??
    process.env.ESCROW_PROGRAM_ID ??
    "62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU",
);

/** USDC mint on Solana devnet. */
export const USDC_DEVNET_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
);

// ---------------------------------------------------------------------------
// PDA derivation helpers
// ---------------------------------------------------------------------------

/**
 * Derive the escrow state PDA for a given maker/taker pair.
 * Seeds: ["escrow", maker, taker]
 */
export function deriveEscrowStatePDA(
  maker: PublicKey,
  taker: PublicKey,
  programId: PublicKey = ESCROW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), maker.toBuffer(), taker.toBuffer()],
    programId,
  );
}

/**
 * Derive the vault associated token account for a given escrow PDA and mint.
 * The vault is an Associated Token Account owned by the escrow PDA.
 */
export async function deriveVaultATA(
  escrowState: PublicKey,
  mint: PublicKey,
): Promise<PublicKey> {
  return getAssociatedTokenAddress(mint, escrowState, true);
}

// ---------------------------------------------------------------------------
// IDL (minimal — enough for the three instructions)
// ---------------------------------------------------------------------------

/** Minimal IDL compatible with @coral-xyz/anchor for the escrow program. */
export const ESCROW_IDL = {
  version: "0.1.0",
  name: "escrow",
  instructions: [
    {
      name: "initializeEscrow",
      accounts: [
        { name: "escrow", isMut: true, isSigner: false },
        { name: "maker", isMut: true, isSigner: true },
        { name: "taker", isMut: false, isSigner: false },
        { name: "makerToken", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "mint", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "associatedTokenProgram", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "amount", type: "u64" },
        { name: "timeout", type: "i64" },
      ],
    },
    {
      name: "release",
      accounts: [
        { name: "escrow", isMut: true, isSigner: false },
        { name: "taker", isMut: true, isSigner: true },
        { name: "takerToken", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "mint", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "refund",
      accounts: [
        { name: "escrow", isMut: true, isSigner: false },
        { name: "maker", isMut: true, isSigner: true },
        { name: "makerToken", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "mint", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Escrow",
      type: {
        kind: "struct" as const,
        fields: [
          { name: "maker", type: "publicKey" },
          { name: "taker", type: "publicKey" },
          { name: "amount", type: "u64" },
          { name: "timeout", type: "i64" },
          { name: "isReleased", type: "bool" },
          { name: "bump", type: "u8" },
        ],
      },
    },
  ],
  errors: [
    { code: 6000, name: "ZeroAmount", msg: "Amount must be greater than zero" },
    { code: 6001, name: "TimeoutNotReached", msg: "Timeout not reached yet" },
    { code: 6002, name: "AlreadyReleased", msg: "Escrow already released" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Escrow client class
// ---------------------------------------------------------------------------

export interface EscrowStateAccount {
  maker: PublicKey;
  taker: PublicKey;
  amount: anchor.BN;
  timeout: anchor.BN;
  isReleased: boolean;
  bump: number;
}

export class EscrowClient {
  private program: anchor.Program;
  private connection: Connection;

  constructor(connection: Connection, wallet: anchor.Wallet) {
    this.connection = connection;
    const provider = new anchor.AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.program = new anchor.Program(ESCROW_IDL as any, provider);
  }

  /**
   * Initialize an escrow: deposit `amount` (in token base units) into a PDA
   * vault. The escrow can be released to `taker` or refunded after `timeout`.
   */
  async initializeEscrow(params: {
    taker: PublicKey;
    mint: PublicKey;
    amount: anchor.BN;
    /** Unix timestamp (seconds) after which the maker can refund. */
    timeout: anchor.BN;
  }): Promise<string> {
    const maker = this.program.provider.publicKey!;
    const [escrowState] = deriveEscrowStatePDA(maker, params.taker);
    const vault = await deriveVaultATA(escrowState, params.mint);
    const makerToken = await getAssociatedTokenAddress(
      params.mint,
      maker,
    );

    return this.program.methods
      .initializeEscrow(params.amount, params.timeout)
      .accounts({
        escrow: escrowState,
        maker,
        taker: params.taker,
        makerToken,
        vault,
        mint: params.mint,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }

  /**
   * Release the escrow — transfer vault funds to the taker.
   * Must be called by the taker.
   */
  async release(params: {
    maker: PublicKey;
    mint: PublicKey;
  }): Promise<string> {
    const taker = this.program.provider.publicKey!;
    const [escrowState] = deriveEscrowStatePDA(params.maker, taker);
    const vault = await deriveVaultATA(escrowState, params.mint);
    const takerToken = await getAssociatedTokenAddress(
      params.mint,
      taker,
    );

    return this.program.methods
      .release()
      .accounts({
        escrow: escrowState,
        taker,
        takerToken,
        vault,
        mint: params.mint,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
  }

  /**
   * Refund the escrow — return vault funds to the maker after timeout.
   * Must be called by the original maker.
   */
  async refund(params: {
    taker: PublicKey;
    mint: PublicKey;
  }): Promise<string> {
    const maker = this.program.provider.publicKey!;
    const [escrowState] = deriveEscrowStatePDA(maker, params.taker);
    const vault = await deriveVaultATA(escrowState, params.mint);
    const makerToken = await getAssociatedTokenAddress(
      params.mint,
      maker,
    );

    return this.program.methods
      .refund()
      .accounts({
        escrow: escrowState,
        maker,
        makerToken,
        vault,
        mint: params.mint,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
  }

  /**
   * Fetch the on-chain state for a given maker/taker escrow.
   * Returns `null` if the account does not exist.
   */
  async fetchEscrowState(
    maker: PublicKey,
    taker: PublicKey,
  ): Promise<EscrowStateAccount | null> {
    const [escrowState] = deriveEscrowStatePDA(maker, taker);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const account = await (this.program.account as any).escrow.fetch(escrowState);
      return account as unknown as EscrowStateAccount;
    } catch {
      return null;
    }
  }
}
