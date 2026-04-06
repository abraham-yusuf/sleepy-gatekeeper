import { attachRealPayment } from "../lib/x402-real";
import { createWallet } from "../lib/solana";

const walletA = createWallet();
const walletB = createWallet();

/**
 * Run the multi-agent demo where Agent A pays Agent B and calls protected local API.
 *
 * @returns Payment proof, task result, and verification metadata.
 */
export async function runMultiAgent() {
  const localEndpoint = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/os/agent-task`;

  console.log("🤖 Agent A requesting protected local service from Agent B...");

  // payment from A → B with real recipient public key
  const paymentProof = await attachRealPayment(
    walletA,
    walletB.publicKey.toBase58(),
    localEndpoint,
  );

  console.log("💸 Agent A paid Agent B and is calling protected endpoint");

  // Agent A calls protected local OS endpoint
  const response = await fetch(localEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...paymentProof,
    },
    body: JSON.stringify({
      agentId: walletA.publicKey.toBase58(),
      task: "analyze market spread and return execution plan",
    }),
  });

  const taskResult = await response.json();

  return {
    step: "Agent A → paid local protected endpoint",
    paymentProof,
    taskResult,
    verification: {
      endpoint: localEndpoint,
      httpStatus: response.status,
      paymentReceiptId: response.headers.get("x-payment-receipt-id"),
      paymentReceiptMode: response.headers.get("x-payment-receipt-mode"),
      verified: response.ok,
    },
  };
}
