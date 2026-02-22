"use client";

import React from "react";
import { SolanaProvider } from "@solana/react-hooks";
import { autoDiscover, createClient } from "@solana/client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  injected,
  walletConnect,
  coinbaseWallet,
  metaMask,
} from "wagmi/connectors";
import { WalletProvider } from "./context/WalletContext";

// Solana client configuration
const solanaEndpoint =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com";

const solanaWebsocketEndpoint =
  process.env.NEXT_PUBLIC_SOLANA_WS_URL ??
  solanaEndpoint.replace("https://", "wss://").replace("http://", "ws://");

export const solanaClient = createClient({
  endpoint: solanaEndpoint,
  websocketEndpoint: solanaWebsocketEndpoint,
  walletConnectors: autoDiscover(),
});

// EVM/Wagmi configuration for Base
const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "Sleepy Gatekeeper OS",
      },
    }),
    coinbaseWallet({
      appName: "Sleepy Gatekeeper OS",
    }),
    injected({ target: "rainbow" }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "demo",
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SolanaProvider client={solanaClient}>
          <WalletProvider>{children}</WalletProvider>
        </SolanaProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
