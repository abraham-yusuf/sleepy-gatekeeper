import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

/**
 *
 */
export function createWallet() {
  const keypair = Keypair.generate();
  return keypair;
}

/**
 *
 * @param publicKey
 */
export async function airdropSOL(publicKey: PublicKey) {
  const sig = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(sig);
  return sig;
}

export { connection };
