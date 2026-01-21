import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server, paywall, evmAddress, svmAddress } from "../../../proxy";

/**
 * Podcasts API endpoint handler
 *
 * This handler returns podcast data after payment verification.
 * Payment is only settled after a successful response (status < 400).
 *
 * @param _ - Incoming Next.js request
 * @returns JSON response with podcast data
 */
const handler = async (_: NextRequest) => {
  return NextResponse.json(
    {
      podcasts: [
        {
          id: 1,
          title: "Web3 Insights Episode 1",
          duration: "45:00",
          url: "/podcasts/web3-insights",
          description: "Deep dive into Web3 technologies",
        },
        {
          id: 2,
          title: "Creator Economy Trends",
          duration: "38:20",
          url: "/podcasts/creator-trends",
          description: "Exploring the modern creator economy",
        },
      ],
    },
    { status: 200 },
  );
};

/**
 * Protected podcasts API endpoint using withX402 wrapper
 *
 * This demonstrates the v2 withX402 wrapper for individual API routes.
 * Unlike middleware, withX402 guarantees payment settlement only after
 * the handler returns a successful response (status < 400).
 */
export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:84532", // base-sepolia
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", // solana devnet
        payTo: svmAddress,
      },
    ],
    description: "Access to podcasts API",
    mimeType: "application/json",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            podcasts: [
              {
                id: 1,
                title: "Web3 Insights Episode 1",
                duration: "45:00",
                url: "/podcasts/web3-insights",
                description: "Deep dive into Web3 technologies",
              },
            ],
          },
        },
      }),
    },
  },
  server,
  undefined, // paywallConfig (using custom paywall from proxy.ts)
  paywall,
);
