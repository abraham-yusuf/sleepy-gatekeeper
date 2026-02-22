"use client";

import { useState } from "react";
import { useWalletConnection } from "@solana/react-hooks";
import { useConnect } from "wagmi";
import { useWalletContext } from "../context/WalletContext";

type WalletType = "solana" | "evm" | null;

export function WalletConnectModal() {
  const { wallet } = useWalletContext();
  const [step, setStep] = useState<"intro" | "select" | "wallets">("intro");
  const [selectedType, setSelectedType] = useState<WalletType>(null);

  // Solana wallet state
  const solanaWallet = useWalletConnection();

  // EVM wallet state
  const { connect, connectors } = useConnect();

  // Don't show if already connected
  if (wallet.isConnected) return null;

  const solanaWallets = solanaWallet.connectors.filter((c) => {
    const name = c.name.toLowerCase();
    return name.includes("phantom") || name.includes("solflare") || name;
  });

  const evmWallets = connectors.filter((c) => {
    const name = c.name.toLowerCase();
    const id = c.id.toLowerCase();
    return (
      name.includes("metamask") ||
      name.includes("coinbase") ||
      name.includes("rainbow") ||
      id.includes("metamask") ||
      id.includes("coinbase") ||
      id.includes("rainbow")
    );
  });

  const handleConnectSolana = async (connectorId: string) => {
    try {
      await solanaWallet.connect(connectorId);
    } catch (error) {
      console.error("Solana connection error:", error);
    }
  };

  const handleConnectEVM = (connectorId: string) => {
    const connector = connectors.find((c) => c.id === connectorId);
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Sleepy background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative w-[480px] max-w-[90vw]">
        {/* Win95-style modal */}
        <div className="win95-shadow bg-retro-gray rounded-sm">
          {/* Title bar */}
          <div className="retro-title-gradient px-3 py-1.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-white text-sm">lock</span>
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Sleepy Gatekeeper - Authentication Required
            </span>
          </div>

          <div className="p-6">
            {step === "intro" && (
              <div className="text-center space-y-6">
                {/* Sleepy gatekeeper icon */}
                <div className="relative mx-auto w-24 h-24">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                  <div className="relative flex items-center justify-center w-full h-full">
                    <span className="material-symbols-outlined text-6xl text-primary sleepy-icon">
                      bedtime
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-black mb-2">
                    Connect Wallet to Wake the Gatekeeper
                  </h2>
                  <p className="text-sm text-black/60 font-mono">
                    The Gatekeeper has been dormant since &apos;97...
                    <br />
                    Connect your wallet to access the decentralized desktop.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-black/40 uppercase tracking-wider">
                    Supported Networks
                  </p>
                  <div className="flex justify-center gap-4">
                    <span className="px-3 py-1 bg-blue-600/10 border border-blue-600/30 text-blue-700 text-xs font-bold rounded-sm">
                      Base / EVM
                    </span>
                    <span className="px-3 py-1 bg-purple-600/10 border border-purple-600/30 text-purple-700 text-xs font-bold rounded-sm">
                      Solana / SVM
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("select")}
                  className="w-full px-6 py-3 bg-retro-gray text-black text-sm font-bold win95-shadow hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
                  Wake Up &amp; Connect
                </button>
              </div>
            )}

            {step === "select" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-black text-center mb-4">
                  Select Wallet Type
                </h3>

                <button
                  onClick={() => {
                    setSelectedType("solana");
                    setStep("wallets");
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-300 hover:border-primary transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">account_balance_wallet</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-black">Solana Wallet (SVM)</div>
                    <div className="text-xs text-black/60">Phantom, Solflare, etc.</div>
                  </div>
                  <span className="material-symbols-outlined text-black/40 ml-auto">chevron_right</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedType("evm");
                    setStep("wallets");
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-300 hover:border-primary transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">currency_exchange</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-black">EVM / Base Wallet</div>
                    <div className="text-xs text-black/60">MetaMask, Coinbase, Rainbow</div>
                  </div>
                  <span className="material-symbols-outlined text-black/40 ml-auto">chevron_right</span>
                </button>

                <button
                  onClick={() => setStep("intro")}
                  className="w-full text-center text-xs text-black/50 hover:text-black transition-colors py-2"
                >
                  ← Back
                </button>
              </div>
            )}

            {step === "wallets" && selectedType === "solana" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">account_balance_wallet</span>
                  </div>
                  <h3 className="text-sm font-bold text-black">Select Solana Wallet</h3>
                </div>

                {solanaWallets.length > 0 ? (
                  solanaWallets.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => handleConnectSolana(connector.id)}
                      className="w-full flex items-center gap-3 p-3 bg-white border border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-purple-600">wallet</span>
                      <span className="text-sm font-bold text-black">{connector.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                    <p className="font-bold mb-1">No Solana wallets detected</p>
                    <p className="text-xs">Please install Phantom or Solflare wallet extension.</p>
                  </div>
                )}

                <button
                  onClick={() => setStep("select")}
                  className="w-full text-center text-xs text-black/50 hover:text-black transition-colors py-2"
                >
                  ← Back
                </button>
              </div>
            )}

            {step === "wallets" && selectedType === "evm" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">currency_exchange</span>
                  </div>
                  <h3 className="text-sm font-bold text-black">Select EVM Wallet</h3>
                </div>

                {evmWallets.length > 0 ? (
                  evmWallets.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => handleConnectEVM(connector.id)}
                      className="w-full flex items-center gap-3 p-3 bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-blue-600">account_balance_wallet</span>
                      <span className="text-sm font-bold text-black">{connector.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                    <p className="font-bold mb-1">No EVM wallets detected</p>
                    <p className="text-xs">Please install MetaMask, Coinbase, or Rainbow wallet extension.</p>
                  </div>
                )}

                <button
                  onClick={() => setStep("select")}
                  className="w-full text-center text-xs text-black/50 hover:text-black transition-colors py-2"
                >
                  ← Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
