import Link from "next/link";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

export default function CreatorSpotlightPodcast() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <MicrophoneIcon className="h-6 w-6 text-white" />
              Creator Spotlight: Building Your Brand
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4 font-mono text-sm">
                <span className="bg-neon-green text-black px-2 py-1 font-bold">Episode 12</span>
                <span>👤 By Lisa Martinez</span>
                <span>•</span>
                <span>📅 January 3, 2024</span>
                <span>•</span>
                <span>🕒 52 minutes</span>
              </div>
              <p className="text-lg text-gray-700 font-mono">
                Success stories and strategies from top Web3 creators using Solana escrow payments
              </p>
            </div>

            <div className="win95-shadow bg-retro-gray rounded-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-black mb-4 font-mono">
                🎧 Now Playing: Premium Audio Content
              </h2>
              <div className="win95-recessed bg-white rounded-sm p-4 shadow-md">
                <audio
                  controls
                  className="w-full"
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center font-mono">
                🎉 Thank you for your payment! Enjoy the episode.
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-mono">Episode Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This week&apos;s guest shares their journey from traditional content creation
                to Web3 success. Learn how Solana&apos;s escrow-based payment infrastructure
                enables creators to sell content with trustless guarantees — no middleman,
                no chargebacks, just code.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Topics Covered:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Creator monetization strategies with x402 + Solana escrow</li>
                <li>Setting up pay-per-view content with PDA vaults</li>
                <li>Building recurring revenue via escrow-backed subscriptions</li>
                <li>How the hybrid model (x402 fast-path + escrow trustless) works</li>
                <li>Real creator earnings data from Solana-based content platforms</li>
                <li>Tips for growing your audience in the Web3 creator economy</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Key Insights:</h3>
              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4 mb-6">
                <p className="text-gray-700 font-mono text-sm">
                  &ldquo;With Solana escrow, my content sales are completely trustless.
                  Buyers deposit into a PDA vault, I deliver content, and funds release
                  automatically. No platform taking 30% — just me and my audience
                  connected through code.&rdquo;
                </p>
                <p className="text-sm text-gray-600 mt-2 font-mono">— Guest Creator</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Timestamps:</h3>
              <div className="win95-recessed bg-black p-4 mb-6">
                <ul className="list-none text-neon-green space-y-2 font-mono text-xs terminal-glow">
                  <li><strong>00:00</strong> - Introduction: Meet our featured creator</li>
                  <li><strong>06:00</strong> - From Web2 to Web3: the transition story</li>
                  <li><strong>14:30</strong> - Setting up x402 + Solana escrow payments</li>
                  <li><strong>22:00</strong> - Building a content business with PDA vaults</li>
                  <li><strong>30:15</strong> - Revenue breakdown: escrow vs traditional</li>
                  <li><strong>38:00</strong> - Audience growth strategies in Web3</li>
                  <li><strong>45:30</strong> - Creator tools and workflow tips</li>
                  <li><strong>49:00</strong> - Closing thoughts and resources</li>
                </ul>
              </div>

              {/* Solana Escrow Integration */}
              <SolanaEscrowInfo contentType="Podcast" price="$0.025" />
            </div>

            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <Link
                  href="/podcasts"
                  className="bg-retro-gray hover:bg-white text-black font-bold py-2 px-6 win95-shadow font-mono text-sm transition-colors"
                >
                  ← Back to Podcasts
                </Link>
                <div className="text-sm text-gray-500 font-mono">
                  Powered by X402 Protocol + Solana Escrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
