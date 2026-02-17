import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

// IDL will be generated after `anchor build` — import it then:
// import type { Escrow } from "../target/types/escrow";

describe("escrow", () => {
  // Configure the client to use the local cluster (or devnet).
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // After `anchor build`, uncomment:
  // const program = anchor.workspace.Escrow as Program<Escrow>;

  it("placeholder — run after anchor build generates IDL", async () => {
    console.log("Escrow program test placeholder — implement in Step 2");
    // TODO: Step 2 — add initialize_escrow, release, refund tests
  });
});
