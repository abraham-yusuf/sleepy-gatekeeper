import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { registerExactSvmScheme } from "@x402/svm/exact/server";
import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";
import { svmPaywall } from "@x402/paywall/svm";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";

const facilitatorUrl = process.env.FACILITATOR_URL;
export const evmAddress = process.env.EVM_ADDRESS as `0x${string}`;
export const svmAddress = process.env.SVM_ADDRESS;

/**
 * Escrow integration flag.
 * When USE_ESCROW=true, the OS exposes escrow-backed payment routes alongside
 * the x402 facilitator routes.
 */
export const useEscrow = process.env.USE_ESCROW === "true";
export const escrowProgramId =
  process.env.ESCROW_PROGRAM_ID ??
  "62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU";

if (!facilitatorUrl) {
  console.error("❌ FACILITATOR_URL environment variable is required");
  process.exit(1);
}

if (!evmAddress || !svmAddress) {
  console.error("❌ EVM_ADDRESS and SVM_ADDRESS environment variables are required");
  process.exit(1);
}

// Create HTTP facilitator client
const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });

// Create x402 resource server
export const server = new x402ResourceServer(facilitatorClient);

// Register schemes
registerExactEvmScheme(server);
registerExactSvmScheme(server);

// Build paywall
export const paywall = createPaywall()
  .withNetwork(evmPaywall)
  .withNetwork(svmPaywall)
  .withConfig({
    appName: process.env.APP_NAME || "Sleepy Gatekeeper OS",
    appLogo: process.env.APP_LOGO || "/x402-icon-blue.png",
    testnet: true,
  })
  .build();

// ---------------------------------------------------------------------------
// Route helper — builds a standard dual-network (EVM + SVM) payment config
// ---------------------------------------------------------------------------

/**
 * Build a standard dual-network payment route config.
 *
 * @param price - Price string, e.g. "$0.05"
 * @param description - Human-readable description for the paywall
 * @param mimeType - Response MIME type
 * @returns Route configuration object
 */
function makeRoute(
  price: string,
  description: string,
  mimeType = "text/html",
) {
  return {
    accepts: [
      {
        scheme: "exact" as const,
        price,
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact" as const,
        price,
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description,
    mimeType,
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  };
}

// ---------------------------------------------------------------------------
// Content routes (existing)
// ---------------------------------------------------------------------------

export const contentRoutes = {
  "/articles/web3-future":          makeRoute("$0.01",  "Premium Article: The Future of Web3 Payments"),
  "/articles/creator-economy":      makeRoute("$0.02",  "Premium Article: Building in the Creator Economy"),
  "/articles/decentralized-content":makeRoute("$0.015", "Premium Article: Decentralized Content Distribution"),
  "/podcasts/web3-insights":        makeRoute("$0.02",  "Premium Podcast: Web3 Insights Episode 1"),
  "/podcasts/crypto-conversations": makeRoute("$0.015", "Premium Podcast: Crypto Conversations - NFTs and Beyond"),
  "/podcasts/creator-spotlight":    makeRoute("$0.025", "Premium Podcast: Creator Spotlight - Building Your Brand"),
  "/videos/blockchain-basics":      makeRoute("$0.05",  "Premium Video: Blockchain Basics - A Complete Guide"),
  "/videos/smart-contracts-tutorial":makeRoute("$0.08", "Premium Video: Smart Contracts Tutorial for Beginners"),
  "/videos/defi-explained":         makeRoute("$0.06",  "Premium Video: DeFi Explained - The Future of Finance"),
  "/skills/ai-prompt-mastery":      makeRoute("$0.05",  "Premium Skill: AI Prompt Engineering Mastery"),
  "/skills/web3-development":       makeRoute("$0.10",  "Premium Skill: Web3 Development Starter Kit"),
  "/skills/blockchain-security":    makeRoute("$0.08",  "Premium Skill: Blockchain Security Best Practices"),
};

// ---------------------------------------------------------------------------
// OS App routes (NEW — Phase 1 Langkah 3)
// Protects OS-level apps via x402 micropayments. Each app session costs a
// small fee per access, enabling the agent-economy model described in PRD.
// ---------------------------------------------------------------------------

export const osAppRoutes = {
  // Agents Hub — access to spawn/manage AI agents
  "/api/os/agents-hub":   makeRoute("$0.01", "OS App: Agents Hub — spawn & manage AI agents", "application/json"),
  // Marketplace — browse & buy skills/services
  "/api/os/marketplace":  makeRoute("$0.01", "OS App: Marketplace — browse skills & services", "application/json"),
  // File Explorer — decentralized file system access
  "/api/os/file-explorer":makeRoute("$0.005","OS App: File Explorer — IPFS-backed file system", "application/json"),
  // Terminal — execute OS-level commands
  "/api/os/terminal":     makeRoute("$0.02", "OS App: Terminal — execute agent commands", "application/json"),
  // Agent task execution — machine-to-machine endpoint
  "/api/os/agent-task":   makeRoute("$0.05", "OS App: Agent Task — execute an autonomous task", "application/json"),
};

// ---------------------------------------------------------------------------
// Combined route configurations (exported for validation scripts)
// ---------------------------------------------------------------------------

export const routeConfigurations = {
  ...contentRoutes,
  ...osAppRoutes,
};

// ---------------------------------------------------------------------------
// Build proxy (content routes only — OS routes use withX402 per-handler)
// ---------------------------------------------------------------------------

export const proxy = paymentProxy(
  contentRoutes,
  server,
  undefined,
  paywall,
);

// Configure which paths the middleware/proxy runs on
export const config = {
  matcher: [
    // Content routes
    "/articles/web3-future/:path*",
    "/articles/creator-economy/:path*",
    "/articles/decentralized-content/:path*",
    "/podcasts/web3-insights/:path*",
    "/podcasts/crypto-conversations/:path*",
    "/podcasts/creator-spotlight/:path*",
    "/videos/blockchain-basics/:path*",
    "/videos/smart-contracts-tutorial/:path*",
    "/videos/defi-explained/:path*",
    "/skills/ai-prompt-mastery/:path*",
    "/skills/web3-development/:path*",
    "/skills/blockchain-security/:path*",
    // OS App API routes (withX402 per-handler, not middleware)
    "/api/os/:path*",
  ],
};

// ---------------------------------------------------------------------------
// Escrow + x402 Hybrid Notes
// ---------------------------------------------------------------------------
// When USE_ESCROW=true the frontend can offer two payment paths per route:
//   1. x402 facilitator (fast, custodial UX) — handled by the proxy above.
//   2. Anchor escrow (trustless PDA vault) — handled client-side via
//      lib/escrow.ts calling the on-chain program directly.
//
// OS App routes use withX402 per-handler (app/api/os/[app]/route.ts) so they
// participate in payment settlement only after a successful response.
//
// Machine-to-machine payments: agents call OS app routes directly by attaching
// a signed x402 Payment header in their HTTP requests. See lib/m2m-payment.ts.
// ---------------------------------------------------------------------------
