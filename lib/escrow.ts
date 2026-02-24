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
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
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
    "6a3tn1sZrWVRn2r3F8AkERmtQsVmBNDwTwJMmArDgMk4",
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
 * Derive the vault token-account PDA for a given escrow state.
 */
export function deriveVaultPDA(
  escrowState: PublicKey,
  programId: PublicKey = ESCROW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), escrowState.toBuffer()],
    programId,
  );
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
        { name: "maker", isMut: true, isSigner: true },
        { name: "taker", isMut: false, isSigner: false },
        { name: "mint", isMut: false, isSigner: false },
        { name: "escrowState", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "makerTokenAccount", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "rent", isMut: false, isSigner: false },
      ],
      args: [
        { name: "amount", type: "u64" },
        { name: "timeout", type: "i64" },
      ],
    },
    {
      name: "release",
      accounts: [
        { name: "maker", isMut: true, isSigner: true },
        { name: "escrowState", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "takerTokenAccount", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "refund",
      accounts: [
        { name: "maker", isMut: true, isSigner: true },
        { name: "escrowState", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "makerTokenAccount", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "EscrowState",
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
    { code: 6001, name: "AlreadyReleased", msg: "Escrow has already been released" },
    { code: 6002, name: "TimeoutNotReached", msg: "Timeout has not been reached yet" },
    { code: 6003, name: "TimeoutInPast", msg: "Timeout must be in the future" },
    { code: 6004, name: "Unauthorized", msg: "Unauthorized: signer does not match expected authority" },
    { code: 6005, name: "InvalidTokenOwner", msg: "Token account owner mismatch" },
    { code: 6006, name: "InvalidMint", msg: "Token mint mismatch" },
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
    const [vault] = deriveVaultPDA(escrowState);
    const makerTokenAccount = await getAssociatedTokenAddress(
      params.mint,
      maker,
    );

    return this.program.methods
      .initializeEscrow(params.amount, params.timeout)
      .accounts({
        maker,
        taker: params.taker,
        mint: params.mint,
        escrowState,
        vault,
        makerTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();
  }

  /**
   * Release the escrow — transfer vault funds to the taker.
   * Must be called by the original maker.
   */
  async release(params: {
    taker: PublicKey;
    mint: PublicKey;
  }): Promise<string> {
    const maker = this.program.provider.publicKey!;
    const [escrowState] = deriveEscrowStatePDA(maker, params.taker);
    const [vault] = deriveVaultPDA(escrowState);
    const takerTokenAccount = await getAssociatedTokenAddress(
      params.mint,
      params.taker,
    );

    return this.program.methods
      .release()
      .accounts({
        maker,
        escrowState,
        vault,
        takerTokenAccount,
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
    const [vault] = deriveVaultPDA(escrowState);
    const makerTokenAccount = await getAssociatedTokenAddress(
      params.mint,
      maker,
    );

    return this.program.methods
      .refund()
      .accounts({
        maker,
        escrowState,
        vault,
        makerTokenAccount,
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
      const account = await (this.program.account as any).escrowState.fetch(escrowState);
      return account as unknown as EscrowStateAccount;
    } catch {
      return null;
    }
  }
}
