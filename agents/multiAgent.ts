import { attachRealPayment } from "../lib/x402-real";
import { createWallet } from "../lib/solana";

const walletA = createWallet();
const walletB = createWallet();

// Agent A hires Agent B (pays for task)
export async function runMultiAgent() {
  console.log("🤖 Agent A requesting service from Agent B...");

  // simulate payment from A → B
  const paymentHeaders = await attachRealPayment(walletA, "agent-b-service");

  console.log("💸 Agent A paid Agent B");

  // Agent B performs task (calls API)
  const response = await fetch("https://api.coingecko.com/api/v3/price?ids=solana&vs_currencies=usd");
  const data = await response.json();

  return {
    step: "Agent A → Agent B",
    payment: paymentHeaders,
    result: data,
  };
}
