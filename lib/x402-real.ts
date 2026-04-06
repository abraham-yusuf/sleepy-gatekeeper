import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { connection } from "./solana";

/**
 * Execute a Solana transfer used as x402-style payment proof for demo flows.
 *
 * @param payer - Wallet paying the request.
 * @param recipient - Recipient wallet public key (base58).
 * @param amountLamports - Amount to transfer in lamports.
 * @returns Payment transfer metadata.
 */
export async function payForRequest(payer: Keypair, recipient: string, amountLamports: number) {
  const recipientPubkey = new PublicKey(recipient);
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: recipientPubkey,
      lamports: amountLamports,
    }),
  );

  const signature = await connection.sendTransaction(tx, [payer]);
  await connection.confirmTransaction(signature);

  return {
    signature,
    amountLamports,
    recipient: recipientPubkey.toBase58(),
  };
}

/**
 * Build x402-like payment headers after paying a recipient on Solana.
 *
 * @param payer - Wallet paying for the protected endpoint.
 * @param recipient - Recipient wallet public key (base58).
 * @param apiUrl - Target API URL that requires payment.
 * @returns Headers carrying payment proof.
 */
export async function attachRealPayment(payer: Keypair, recipient: string, apiUrl: string) {
  console.log("💸 Paying (Solana) for:", apiUrl, "->", recipient);

  const payment = await payForRequest(payer, recipient, 1000);

  return {
    "x-payment-mode": "x402",
    "x-payment-signature": payment.signature,
    "x-payment-amount": payment.amountLamports.toString(),
    "x-payment-recipient": payment.recipient,
  };
}
