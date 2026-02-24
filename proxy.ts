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
 * the x402 facilitator routes.  This is the "hybrid" model described in the
 * PRD: x402 for fast UX, Anchor escrow for maximum trustlessness.
 */
export const useEscrow = process.env.USE_ESCROW === "true";
export const escrowProgramId =
  process.env.ESCROW_PROGRAM_ID ??
  "6a3tn1sZrWVRn2r3F8AkERmtQsVmBNDwTwJMmArDgMk4";

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
    appName: process.env.APP_NAME || "Next x402 Demo",
    appLogo: process.env.APP_LOGO || "/x402-icon-blue.png",
    testnet: true,
  })
  .build();

// Define route configurations for export and validation
export const routeConfigurations = {
  "/articles/web3-future": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Article: The Future of Web3 Payments",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  "/articles/creator-economy": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.02",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.02",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Article: Building in the Creator Economy",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  "/articles/decentralized-content": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.015",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.015",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Article: Decentralized Content Distribution",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  "/podcasts/web3-insights": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.02",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.02",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Podcast: Web3 Insights Episode 1",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  "/videos/blockchain-basics": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.05",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.05",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Video: Blockchain Basics - A Complete Guide",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  "/skills/ai-prompt-mastery": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.05",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.05",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Skill: AI Prompt Engineering Mastery",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  "/skills/web3-development": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.10",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.10",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Skill: Web3 Development Starter Kit",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  "/skills/blockchain-security": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.08",
        network: "eip155:84532" as const,
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.08",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
        payTo: svmAddress,
      },
    ],
    description: "Premium Skill: Blockchain Security Best Practices",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
};

// Build proxy
export const proxy = paymentProxy(
  routeConfigurations,
  server,
  undefined, // paywallConfig (using custom paywall instead)
  paywall, // custom paywall provider
);

// Configure which paths the proxy should run on
export const config = {
  matcher: [
    "/articles/web3-future/:path*",
    "/articles/creator-economy/:path*",
    "/articles/decentralized-content/:path*",
    "/podcasts/web3-insights/:path*",
    "/videos/blockchain-basics/:path*",
    "/skills/ai-prompt-mastery/:path*",
    "/skills/web3-development/:path*",
    "/skills/blockchain-security/:path*",
  ],
};

// ---------------------------------------------------------------------------
// Escrow + x402 Hybrid Notes
// ---------------------------------------------------------------------------
// When USE_ESCROW=true the frontend can offer two payment paths per route:
//   1. x402 facilitator (fast, custodial UX) — handled by the proxy above.
//   2. Anchor escrow (trustless PDA vault)  — handled client-side via
//      lib/escrow.ts calling the on-chain program directly.
//
// The BUY button in the Skills / Articles / Podcasts / Videos pages should:
//   - Default to x402 facilitator for one-click payments.
//   - Offer an "Escrow (Trustless)" option that calls EscrowClient from
//     lib/escrow.ts when the user prefers on-chain settlement.
//   - On escrow success callback, unlock the protected content the same way
//     a successful x402 payment does.
//
// See lib/escrow.ts for the client API and programs/escrow/src/lib.rs for
// the on-chain program.
// ---------------------------------------------------------------------------
