"use client";

import { useState } from "react";
import { Win95Window } from "./Win95Window";

interface SwapAssetProps {
  onSwap?: (from: string, to: string, amount: number) => void;
}

export function SwapAsset({ onSwap }: SwapAssetProps) {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("$402");
  const [amount, setAmount] = useState("");

  const handleSwap = () => {
    if (amount && onSwap) {
      onSwap(fromToken, toToken, parseFloat(amount));
    }
  };

  const tokens = [
    { symbol: "SOL", name: "Solana" },
    { symbol: "$402", name: "Gatekeeper Token" },
    { symbol: "USDC", name: "USD Coin" },
    { symbol: "USDT", name: "Tether" },
  ];

  return (
    <Win95Window
      title="Token Swap - Jupiter Protocol"
      icon={<span className="material-symbols-outlined text-sm">swap_horiz</span>}
      className="w-full max-w-md"
    >
      <div className="bg-retro-gray p-6 space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-black uppercase">You Pay</label>
          <div className="win95-recessed bg-white p-3 flex items-center gap-3">
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-white border-none text-black font-bold flex-1 focus:outline-none"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-white border-none text-black text-right font-mono w-32 focus:outline-none"
            />
          </div>
          <div className="text-xs text-black/60 font-mono">
            Balance: 0.00 {fromToken}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
            }}
            className="win95-shadow bg-primary p-2 rounded-full hover:bg-primary/80 transition-colors"
          >
            <span className="material-symbols-outlined text-white text-xl">
              swap_vert
            </span>
          </button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-black uppercase">
            You Receive
          </label>
          <div className="win95-recessed bg-white p-3 flex items-center gap-3">
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-white border-none text-black font-bold flex-1 focus:outline-none"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <div className="text-black text-right font-mono w-32">
              {amount ? (parseFloat(amount) * 402).toFixed(2) : "0.00"}
            </div>
          </div>
          <div className="text-xs text-black/60 font-mono">
            Balance: 0.00 {toToken}
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="win95-bevel bg-white p-3 text-xs space-y-1 font-mono text-black">
          <div className="flex justify-between">
            <span>Rate:</span>
            <span className="font-bold">1 SOL = 402 $402</span>
          </div>
          <div className="flex justify-between">
            <span>Slippage:</span>
            <span>0.5%</span>
          </div>
          <div className="flex justify-between">
            <span>Fee:</span>
            <span>0.00025 SOL</span>
          </div>
        </div>

        {/* Swap Action Button */}
        <button
          onClick={handleSwap}
          disabled={!amount}
          className="w-full win95-shadow bg-primary text-white font-bold py-3 hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          SWAP TOKENS
        </button>

        {/* Warning */}
        <div className="flex items-start gap-2 bg-[#ffff00] border-2 border-black p-2">
          <span className="material-symbols-outlined text-black text-sm">
            warning
          </span>
          <p className="text-[10px] text-black">
            Always verify the token address before swapping. This is a demo interface.
          </p>
        </div>
      </div>
    </Win95Window>
  );
}
