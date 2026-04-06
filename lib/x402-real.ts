import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { connection } from "./solana";

// Simplified x402-style payment (hackathon demo)
/**
 *
 * @param payer
 * @param recipient
 * @param amountLamports
 */
export async function payForRequest(payer: Keypair, recipient: string, amountLamports: number) {
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: payer.publicKey, // mock recipient (replace later)
      lamports: amountLamports,
    }),
  );

  const signature = await connection.sendTransaction(tx, [payer]);
  await connection.confirmTransaction(signature);

  return {
    signature,
    amountLamports,
  };
}

/**
 *
 * @param payer
 * @param apiUrl
 */
export async function attachRealPayment(payer: Keypair, apiUrl: string) {
  console.log("💸 Paying (Solana) for:", apiUrl);

  const payment = await payForRequest(payer, "mock", 1000);

  return {
    "x-payment-signature": payment.signature,
    "x-payment-amount": payment.amountLamports.toString(),
  };
}
