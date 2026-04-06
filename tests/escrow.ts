import assert from "node:assert/strict";
import { Keypair } from "@solana/web3.js";
import {
  ESCROW_IDL,
  USDC_DEVNET_MINT,
  deriveEscrowStatePDA,
  deriveVaultATA,
} from "../lib/escrow";

type TestCase = {
  name: string;
  run: () => Promise<void> | void;
};

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }
  return String(error);
}

const tests: TestCase[] = [
  {
    name: "initialize_escrow path: deriveEscrowStatePDA is deterministic",
    run: () => {
      const maker = Keypair.generate().publicKey;
      const taker = Keypair.generate().publicKey;

      const [pdaA, bumpA] = deriveEscrowStatePDA(maker, taker);
      const [pdaB, bumpB] = deriveEscrowStatePDA(maker, taker);

      assert.equal(pdaA.toBase58(), pdaB.toBase58());
      assert.equal(bumpA, bumpB);
    },
  },
  {
    name: "initialize_escrow path: deriveVaultATA returns stable associated token account",
    run: async () => {
      const maker = Keypair.generate().publicKey;
      const taker = Keypair.generate().publicKey;
      const [escrowPda] = deriveEscrowStatePDA(maker, taker);

      const vaultA = await deriveVaultATA(escrowPda, USDC_DEVNET_MINT);
      const vaultB = await deriveVaultATA(escrowPda, USDC_DEVNET_MINT);

      assert.equal(vaultA.toBase58(), vaultB.toBase58());
    },
  },
  {
    name: "release path: IDL exposes release instruction",
    run: () => {
      const instructionNames = ESCROW_IDL.instructions.map((ix) => ix.name);
      assert.ok(instructionNames.includes("release"));
    },
  },
  {
    name: "refund path: IDL exposes refund instruction",
    run: () => {
      const instructionNames = ESCROW_IDL.instructions.map((ix) => ix.name);
      assert.ok(instructionNames.includes("refund"));
    },
  },
];

async function runEscrowTests(): Promise<void> {
  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      await t.run();
      console.log(`✅ ${t.name}`);
      passed += 1;
    } catch (error) {
      console.error(`❌ ${t.name}`);
      console.error(formatError(error));
      failed += 1;
    }
  }

  console.log(`\nEscrow tests passed: ${passed}/${tests.length}`);
  if (failed > 0) {
    console.error(`Escrow tests failed: ${failed}/${tests.length}`);
    process.exitCode = 1;
  }
}

await runEscrowTests();
