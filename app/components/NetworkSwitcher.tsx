"use client";

import { useState } from "react";
import { useSwitchChain } from "wagmi";
import { useWalletContext } from "../context/WalletContext";

const NETWORKS = [
  { id: "devnet", label: "Devnet", chain: "solana", icon: "science" },
  { id: "sepolia", label: "Sepolia", chain: "evm", chainId: 84532, icon: "science" },
  { id: "mainnet-sol", label: "Solana Mainnet", chain: "solana", icon: "public" },
  { id: "base", label: "Base", chain: "evm", chainId: 8453, icon: "public" },
];

export function NetworkSwitcher() {
  const { wallet } = useWalletContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const { switchChain } = useSwitchChain();

  if (!wallet.isConnected) return null;

  const handleNetworkSwitch = (network: (typeof NETWORKS)[number]) => {
    if (network.chain === "evm" && network.chainId) {
      switchChain({ chainId: network.chainId });
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="h-full px-2 flex items-center gap-1.5 bg-retro-gray win95-shadow hover:bg-white transition-colors"
      >
        <span className="material-symbols-outlined text-[14px] text-black">lan</span>
        <span className="text-[10px] text-black font-bold font-mono truncate max-w-[80px]">
          {wallet.chainLabel}
        </span>
        <span className="material-symbols-outlined text-[12px] text-black">expand_more</span>
      </button>

      {showDropdown && (
        <>
          <div className="fixed inset-0 z-[999]" onClick={() => setShowDropdown(false)} />
          <div className="absolute bottom-full left-0 mb-1 w-48 win95-shadow bg-retro-gray border-2 border-gray-700 z-[1000]">
            <div className="px-3 py-1.5 border-b border-gray-600 bg-primary text-white">
              <div className="text-[10px] font-bold uppercase tracking-wider">Switch Network</div>
            </div>
            {NETWORKS.filter((n) => n.chain === wallet.walletNetwork || wallet.walletNetwork === null).map(
              (network) => (
                <button
                  key={network.id}
                  onClick={() => handleNetworkSwitch(network)}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[14px]">{network.icon}</span>
                  {network.label}
                </button>
              ),
            )}
          </div>
        </>
      )}
    </div>
  );
}
