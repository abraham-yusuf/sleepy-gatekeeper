import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server, paywall, evmAddress, svmAddress } from "../../../proxy";

/**
 * Videos API endpoint handler
 *
 * This handler returns video data after payment verification.
 * Payment is only settled after a successful response (status < 400).
 *
 * @param _ - Incoming Next.js request
 * @returns JSON response with video data
 */
const handler = async (_: NextRequest) => {
  return NextResponse.json(
    {
      videos: [
        {
          id: 1,
          title: "Blockchain Basics - A Complete Guide",
          duration: "15:30",
          url: "/videos/blockchain-basics",
          thumbnail: "/thumbnails/blockchain.jpg",
        },
        {
          id: 2,
          title: "Introduction to Web3",
          duration: "12:45",
          url: "/videos/web3-intro",
          thumbnail: "/thumbnails/web3.jpg",
        },
      ],
    },
    { status: 200 },
  );
};

/**
 * Protected videos API endpoint using withX402 wrapper
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
    description: "Access to videos API",
    mimeType: "application/json",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            videos: [
              {
                id: 1,
                title: "Blockchain Basics - A Complete Guide",
                duration: "15:30",
                url: "/videos/blockchain-basics",
                thumbnail: "/thumbnails/blockchain.jpg",
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
