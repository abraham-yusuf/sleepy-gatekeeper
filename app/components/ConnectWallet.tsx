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

  const handleSelectChain = (type: WalletType) => {
    setSelectedType(type);
  };

  const handleConnectSolana = async (connectorId: string) => {
    try {
      await solanaWallet.connect(connectorId);
      setShowMenu(false);
      setSelectedType(null);
    } catch (error) {
      console.error("Solana connection error:", error);
    }
  };

  const handleConnectEvm = (connector: any) => {
    connect({ connector });
    setShowMenu(false);
    setSelectedType(null);
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (showMenu) {
      setSelectedType(null);
    }
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  return (
    <div className="relative">
      {!isConnected ? (
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="win95-shadow win95-button-active bg-gradient-to-r from-blue-600 to-primary px-4 py-1.5 text-xs font-bold uppercase tracking-tighter"
          >
            Connect Wallet
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 win95-shadow bg-retro-gray border-2 border-gray-700 z-50">
              <div className="p-1">
                {!selectedType ? (
                  <>
                    <button
                      onClick={() => handleSelectChain("solana")}
                      className="w-full text-left px-3 py-2 text-sm font-bold text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        account_balance_wallet
                      </span>
                      Solana Wallet
                    </button>
                    <button
                      onClick={() => handleSelectChain("evm")}
                      className="w-full text-left px-3 py-2 text-sm font-bold text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        currency_exchange
                      </span>
                      EVM/Base Wallet
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleBack}
                      className="w-full text-left px-3 py-1 text-xs font-bold text-black/70 hover:bg-black/10 transition-colors flex items-center gap-2 border-b border-gray-600 mb-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_back
                      </span>
                      Back
                    </button>

                    <div className="max-h-60 overflow-y-auto">
                      {selectedType === "solana" && (
                        <>
                          {solanaWallet.connectors.length === 0 ? (
                            <div className="px-3 py-2 text-xs text-black/60 italic">
                              No Solana wallets found.
                            </div>
                          ) : (
                            solanaWallet.connectors.map((connector) => (
                              <button
                                key={connector.id}
                                onClick={() =>
                                  handleConnectSolana(connector.id)
                                }
                                className="w-full text-left px-3 py-2 text-sm font-bold text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2 truncate"
                              >
                                {connector.icon && (
                                  <img
                                    src={connector.icon}
                                    alt=""
                                    className="w-4 h-4"
                                  />
                                )}
                                {connector.name}
                              </button>
                            ))
                          )}
                        </>
                      )}

                      {selectedType === "evm" && (
                        <>
                          {connectors.length === 0 ? (
                            <div className="px-3 py-2 text-xs text-black/60 italic">
                              No EVM wallets found.
                            </div>
                          ) : (
                            connectors.map((connector) => (
                              <button
                                key={connector.id}
                                onClick={() => handleConnectEvm(connector)}
                                className="w-full text-left px-3 py-2 text-sm font-bold text-black hover:bg-primary hover:text-white transition-colors flex items-center gap-2 truncate"
                              >
                                {connector.icon && (
                                  <img
                                    src={connector.icon}
                                    alt=""
                                    className="w-4 h-4"
                                  />
                                )}
                                {connector.name}
                              </button>
                            ))
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={toggleMenu}
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
