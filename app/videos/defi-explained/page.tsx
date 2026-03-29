"use client";

import { useState } from "react";
import Link from "next/link";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";
import EscrowPayButton from "@/app/components/EscrowPayButton";

const CREATOR_ADDRESS = process.env.NEXT_PUBLIC_SVM_ADDRESS ?? "";

export default function Page() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay" />

      <article className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <span className="material-symbols-outlined">videocam</span>
              DeFi Explained: Decentralized Finance
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            {/* Meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6 font-mono text-sm">
                <span>👤 By Maria Lopez</span>
                <span>•</span>
                <span>📅 January 18, 2024</span>
                <span className="bg-neon-green text-black font-bold px-2 py-0.5 text-xs">$0.05</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-6">
                <p className="text-lg text-gray-700 font-mono">A deep dive into decentralized finance protocols</p>
              </div>
            </div>

            {/* ── Escrow Pay Button — shown when locked ── */}
            {!isUnlocked && (
              <div className="my-8">
                <div className="win95-shadow bg-retro-gray p-3 mb-4">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-3 py-1 -mx-3 -mt-3 mb-3">
                    <span className="text-white text-xs font-bold font-mono">🔒 Premium Video — Purchase to Unlock</span>
                  </div>
                  <p className="text-gray-600 font-mono text-xs">
                    Pay $0.05 USDC via trustless Solana escrow to access the full content.
                  </p>
                </div>
                <EscrowPayButton
                  creatorAddress={CREATOR_ADDRESS}
                  priceUsdc={0.05}
                  contentLabel="DeFi Explained: Decentralized Finance"
                  onUnlock={() => setIsUnlocked(true)}
                />
              </div>
            )}

            {/* ── Premium content — revealed after unlock ── */}
            {isUnlocked && (
              <div className="my-8">
                <div className="win95-shadow bg-retro-gray rounded-sm mb-6">
                  <div className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-2">
                    <span className="text-white text-sm font-bold font-mono">
                      ✅ Video Unlocked — Full Content Below
                    </span>
                  </div>
                </div>
                <div className="win95-recessed bg-black rounded-sm overflow-hidden p-1 mb-6">
                  <video controls className="w-full aspect-video"><source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" /></video>
                </div>
                <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4 mt-4">
                  <p className="text-gray-800 font-bold font-mono text-sm">
                    🎉 Thank you for your payment! Enjoy the full VideoL.
                  </p>
                </div>
              </div>
            )}

            {/* Escrow info */}
            <SolanaEscrowInfo contentType="Video" price="$0.05" />

            {/* Footer nav */}
            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <Link
                  href="/videos"
                  className="bg-retro-gray hover:bg-white text-black font-bold py-2 px-6 win95-shadow font-mono text-sm transition-colors"
                >
                  ← Back to Videos
                </Link>
                <div className="text-sm text-gray-500 font-mono">
                  Powered by X402 + Solana Escrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
