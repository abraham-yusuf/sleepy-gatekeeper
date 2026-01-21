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
  "/protected": {
    accepts: [
      {
        scheme: "exact",
        price: "$0.001",
        network: "eip155:84532" as const, // base-sepolia
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.001",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const, // solana devnet
        payTo: svmAddress,
      },
    ],
    description: "Premium music: x402 Remix",
    mimeType: "text/html",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
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
    "/protected/:path*",
    "/articles/web3-future/:path*",
    "/articles/creator-economy/:path*",
    "/articles/decentralized-content/:path*",
    "/podcasts/web3-insights/:path*",
    "/videos/blockchain-basics/:path*",
  ],
};
