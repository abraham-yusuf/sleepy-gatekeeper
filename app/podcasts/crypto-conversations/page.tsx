import Link from "next/link";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

export default function CryptoConversationsPodcast() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <MicrophoneIcon className="h-6 w-6 text-white" />
              Crypto Conversations: NFTs and Beyond
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4 font-mono text-sm">
                <span className="bg-neon-green text-black px-2 py-1 font-bold">Episode 5</span>
                <span>👤 By Mike Chen</span>
                <span>•</span>
                <span>📅 January 8, 2024</span>
                <span>•</span>
                <span>🕒 38 minutes</span>
              </div>
              <p className="text-lg text-gray-700 font-mono">
                Exploring the intersection of art, technology, and blockchain on Solana
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
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
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
                Join us as we discuss the evolution of NFTs and their role in the digital
                art world. We explore how Solana&apos;s escrow-based payment systems enable
                trustless NFT marketplaces and how creators can monetize their work using
                on-chain programs.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Topics Covered:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>NFT evolution: from digital art to programmable assets</li>
                <li>Solana NFT ecosystem (Metaplex, Magic Eden)</li>
                <li>Escrow-based marketplace transactions on Solana</li>
                <li>How PDA vaults enable trustless NFT trading</li>
                <li>Creator royalties and on-chain enforcement</li>
                <li>The future of digital ownership with Solana programs</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Key Insights:</h3>
              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4 mb-6">
                <p className="text-gray-700 font-mono text-sm">
                  &ldquo;Solana escrow programs are the backbone of trustless NFT trading.
                  When a buyer deposits tokens into a PDA vault, both parties get
                  cryptographic guarantees — the seller knows payment exists, and the
                  buyer knows they can refund if delivery fails.&rdquo;
                </p>
                <p className="text-sm text-gray-600 mt-2 font-mono">— Mike Chen, Host</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Timestamps:</h3>
              <div className="win95-recessed bg-black p-4 mb-6">
                <ul className="list-none text-neon-green space-y-2 font-mono text-xs terminal-glow">
                  <li><strong>00:00</strong> - Introduction: NFTs in 2024</li>
                  <li><strong>04:15</strong> - Solana NFT ecosystem overview</li>
                  <li><strong>10:30</strong> - How escrow programs power NFT trades</li>
                  <li><strong>18:00</strong> - PDA vaults and trustless custody</li>
                  <li><strong>24:45</strong> - Creator royalties on-chain</li>
                  <li><strong>31:00</strong> - Future of programmable digital assets</li>
                  <li><strong>35:30</strong> - Closing thoughts and next episode preview</li>
                </ul>
              </div>

              {/* Solana Escrow Integration */}
              <SolanaEscrowInfo contentType="Podcast" price="$0.015" />
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
