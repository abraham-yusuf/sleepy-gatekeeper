"use client";

import { useState } from "react";
import { useWalletConnection } from "@solana/react-hooks";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type WalletType = "solana" | "evm" | null;

export function ConnectWallet() {
  const [selectedType, setSelectedType] = useState<WalletType>(null);
  const [showMenu, setShowMenu] = useState(false);

  // Solana wallet state
  const solanaWallet = useWalletConnection();

  // EVM wallet state
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect: evmDisconnect } = useDisconnect();

  // Check if any wallet is connected
  const isConnected = solanaWallet.connected || evmConnected;

  // Get display address
  const getDisplayAddress = () => {
    if (solanaWallet.connected && solanaWallet.wallet?.account?.address) {
      const addr = solanaWallet.wallet.account.address;
      return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    }
    if (evmConnected && evmAddress) {
      return `${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}`;
    }
    return "";
  };

  const handleConnect = async (type: WalletType) => {
    setSelectedType(type);
    setShowMenu(false);

    if (type === "solana") {
      try {
        // Get the first available Solana connector
        const connector = solanaWallet.connectors[0];
        if (connector) {
          await solanaWallet.connect(connector.id);
        } else {
          console.error("No Solana wallet connectors available");
        }
      } catch (error) {
        console.error("Solana connection error:", error);
      }
    } else if (type === "evm") {
      // Connect with the first available connector (usually injected/MetaMask)
      const connector = connectors[0];
      if (connector) {
        connect({ connector });
      }
    }
  };

  const handleDisconnect = () => {
    if (solanaWallet.connected) {
      solanaWallet.disconnect();
    }
    if (evmConnected) {
      evmDisconnect();
    }
    setSelectedType(null);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      {!isConnected ? (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="win95-shadow win95-button-active bg-gradient-to-r from-blue-600 to-primary px-4 py-1.5 text-xs font-bold uppercase tracking-tighter"
          >
            Connect Wallet
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 win95-shadow bg-retro-gray border-2 border-gray-700 z-50">
              <div className="p-1">
                <button
                  onClick={() => handleConnect("solana")}
                  className="w-full text-left px-3 py-2 text-sm font-bold text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    account_balance_wallet
                  </span>
                  Solana Wallet
                </button>
                <button
                  onClick={() => handleConnect("evm")}
                  className="w-full text-left px-3 py-2 text-sm font-bold text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    currency_exchange
                  </span>
                  EVM/Base Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="win95-shadow win95-button-active bg-gradient-to-r from-green-600 to-green-500 px-4 py-1.5 text-xs font-bold uppercase tracking-tighter flex items-center gap-2"
          >
            <span className="size-2 bg-green-300 rounded-full"></span>
            {getDisplayAddress()}
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 win95-shadow bg-retro-gray border-2 border-gray-700 z-50">
              <div className="p-1">
                <div className="px-3 py-2 border-b border-gray-600">
                  <div className="text-xs text-black/60 uppercase">
                    Connected
                  </div>
                  <div className="text-sm font-bold text-black font-mono">
                    {getDisplayAddress()}
                  </div>
                  <div className="text-xs text-black/60 mt-1">
                    {solanaWallet.connected ? "Solana" : "EVM/Base"}
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="w-full text-left px-3 py-2 text-sm font-bold text-black hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    logout
                  </span>
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
