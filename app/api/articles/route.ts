import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server, paywall, evmAddress, svmAddress } from "../../../proxy";

/**
 * Articles API endpoint handler
 *
 * This handler returns article data after payment verification.
 * Payment is only settled after a successful response (status < 400).
 *
 * @param _ - Incoming Next.js request
 * @returns JSON response with article data
 */
const handler = async (_: NextRequest) => {
  return NextResponse.json(
    {
      articles: [
        {
          id: 1,
          title: "The Future of Web3 Payments",
          excerpt: "Exploring the next generation of payment systems in Web3...",
          url: "/articles/web3-future",
          author: "Tech Writer",
        },
        {
          id: 2,
          title: "Building in the Creator Economy",
          excerpt: "How creators are leveraging blockchain technology...",
          url: "/articles/creator-economy",
          author: "Industry Expert",
        },
        {
          id: 3,
          title: "Decentralized Content Distribution",
          excerpt: "The impact of decentralization on content platforms...",
          url: "/articles/decentralized-content",
          author: "Content Analyst",
        },
      ],
    },
    { status: 200 },
  );
};

/**
 * Protected articles API endpoint using withX402 wrapper
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
    description: "Access to articles API",
    mimeType: "application/json",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            articles: [
              {
                id: 1,
                title: "The Future of Web3 Payments",
                excerpt: "Exploring the next generation of payment systems in Web3...",
                url: "/articles/web3-future",
                author: "Tech Writer",
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
