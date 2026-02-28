/**
 * Solana Escrow Integration Info — Server Component
 *
 * Displays escrow program details and payment flow for each content page.
 * Integrated with the on-chain Anchor escrow program:
 *   62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU
 */

const ESCROW_PROGRAM_ID = "62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU";

interface SolanaEscrowInfoProps {
  /** Content type label, e.g. "Article", "Video", "Podcast", "Skill" */
  contentType: string;
  /** Price displayed next to the content */
  price: string;
}

export default function SolanaEscrowInfo({
  contentType,
  price,
}: SolanaEscrowInfoProps) {
  return (
    <div className="win95-shadow bg-retro-gray rounded-sm mt-8">
      <div className="bg-gradient-to-r from-[#000080] to-[#6a0dad] px-4 py-2">
        <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">token</span>
          Solana Escrow Integration (SVM)
        </h3>
      </div>
      <div className="p-6 bg-white">
        <p className="text-gray-700 mb-4 font-mono text-sm">
          🔐 This {contentType.toLowerCase()} is protected by the on-chain
          Anchor escrow program on Solana Devnet. Payments are held in a
          PDA-owned vault until content access is confirmed.
        </p>

        {/* Program ID */}
        <div className="win95-recessed bg-black p-4 mb-4">
          <pre className="text-neon-green font-mono text-xs terminal-glow overflow-x-auto whitespace-pre-wrap">
{`# Escrow Program (Solana Devnet)
Program ID: ${ESCROW_PROGRAM_ID}

# PDA Seeds
seeds = ["escrow", maker_pubkey, taker_pubkey]

# Vault (Associated Token Account)
vault = ATA(escrow_pda, USDC_mint)`}
          </pre>
        </div>

        {/* Payment flow */}
        <h4 className="font-bold text-black mb-2 font-mono text-sm">
          ⚡ Exact SVM Payment Flow
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="win95-shadow bg-retro-gray p-3 text-center">
            <p className="font-bold text-black font-mono text-xs">
              1️⃣ Initialize
            </p>
            <p className="text-gray-700 font-mono text-xs mt-1">
              Buyer deposits {price} USDC into escrow vault via{" "}
              <code className="bg-gray-200 px-1">initialize_escrow</code>
            </p>
          </div>
          <div className="win95-shadow bg-retro-gray p-3 text-center">
            <p className="font-bold text-black font-mono text-xs">
              2️⃣ Release
            </p>
            <p className="text-gray-700 font-mono text-xs mt-1">
              Content unlocked → creator calls{" "}
              <code className="bg-gray-200 px-1">release</code> to receive funds
            </p>
          </div>
          <div className="win95-shadow bg-retro-gray p-3 text-center">
            <p className="font-bold text-black font-mono text-xs">
              3️⃣ Refund
            </p>
            <p className="text-gray-700 font-mono text-xs mt-1">
              Timeout reached → buyer calls{" "}
              <code className="bg-gray-200 px-1">refund</code> to reclaim funds
            </p>
          </div>
        </div>

        {/* Code example */}
        <h4 className="font-bold text-black mb-2 font-mono text-sm">
          💻 Integration Example (TypeScript)
        </h4>
        <div className="win95-recessed bg-black p-4 mb-4">
          <pre className="text-neon-green font-mono text-xs terminal-glow overflow-x-auto whitespace-pre-wrap">
{`import { EscrowClient, USDC_DEVNET_MINT } from "@/lib/escrow";
import { BN } from "@coral-xyz/anchor";

// 1. Initialize escrow for this ${contentType.toLowerCase()}
const tx = await escrowClient.initializeEscrow({
  taker: creatorPublicKey,       // content creator
  mint:  USDC_DEVNET_MINT,       // USDC on devnet
  amount: new BN(${Math.round(parseFloat(price.replace("$", "")) * 1_000_000)}),  // ${price} USDC (6 decimals)
  timeout: new BN(Math.floor(Date.now() / 1000) + 3600),
});
console.log("Escrow initialized:", tx);

// 2. On content delivery, release funds to creator
const releaseTx = await escrowClient.release({
  maker: buyerPublicKey,
  mint:  USDC_DEVNET_MINT,
});
console.log("Funds released:", releaseTx);`}
          </pre>
        </div>

        {/* Network badge */}
        <div className="flex items-center gap-3 mt-4">
          <span className="bg-[#9945FF] text-white text-xs font-bold px-3 py-1 font-mono">
            Solana Devnet
          </span>
          <span className="bg-neon-green text-black text-xs font-bold px-3 py-1 font-mono">
            Exact SVM Scheme
          </span>
          <span className="bg-[#000080] text-white text-xs font-bold px-3 py-1 font-mono">
            x402 + Escrow Hybrid
          </span>
        </div>
      </div>
    </div>
  );
}
