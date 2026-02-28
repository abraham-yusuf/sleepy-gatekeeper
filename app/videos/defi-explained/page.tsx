import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

export default function DefiExplainedVideo() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <VideoCameraIcon className="h-6 w-6 text-white" />
              DeFi Explained: The Future of Finance
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4 font-mono text-sm">
                <span>👤 By David Kim</span>
                <span>•</span>
                <span>📅 January 7, 2024</span>
                <span>•</span>
                <span>🕒 35 minutes</span>
                <span>•</span>
                <span>👁️ 3.1K views</span>
              </div>
              <p className="text-lg text-gray-700 font-mono">
                Understanding decentralized finance and its applications on Solana
              </p>
            </div>

            <div className="win95-shadow bg-retro-gray rounded-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-black mb-4 font-mono">
                🎬 Now Playing: Premium Video Content
              </h2>
              <div className="win95-recessed bg-black rounded-sm overflow-hidden shadow-lg">
                <video
                  controls
                  className="w-full aspect-video"
                  poster="/x402-logo-dark.png"
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center font-mono">
                🎉 Thank you for your payment! Enjoy the video.
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-mono">Video Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Explore the world of decentralized finance on Solana, from escrow-based
                payments to lending protocols and yield farming. Learn how Solana&apos;s
                high throughput and low fees make it ideal for DeFi applications.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">What You&apos;ll Learn:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>DeFi fundamentals: lending, borrowing, and swapping</li>
                <li>Why Solana is ideal for DeFi (speed, cost, scalability)</li>
                <li>Escrow-based payment flows for trustless transactions</li>
                <li>PDA vaults as building blocks for DeFi protocols</li>
                <li>Token program integration and CPI patterns</li>
                <li>Real-world Solana DeFi protocols and how they work</li>
                <li>Security considerations for DeFi smart contracts</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Chapter Breakdown:</h3>
              <div className="win95-shadow bg-retro-gray rounded-sm p-6 mb-6">
                <ul className="list-none text-gray-700 space-y-3 font-mono text-sm">
                  <li className="flex justify-between">
                    <span><strong>Introduction</strong> - What is DeFi?</span>
                    <span className="text-gray-500">00:00 - 04:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 1</strong> - Solana DeFi Ecosystem</span>
                    <span className="text-gray-500">04:30 - 11:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 2</strong> - Escrow &amp; PDA Vaults in DeFi</span>
                    <span className="text-gray-500">11:00 - 19:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 3</strong> - Token Swaps &amp; AMMs</span>
                    <span className="text-gray-500">19:00 - 26:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 4</strong> - Yield &amp; Lending Protocols</span>
                    <span className="text-gray-500">26:00 - 31:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Conclusion</strong> - Building Secure DeFi Apps</span>
                    <span className="text-gray-500">31:00 - 35:00</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Key Takeaways:</h3>
              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4 mb-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2 font-mono text-sm">
                  <li>DeFi eliminates intermediaries using on-chain smart contracts</li>
                  <li>Solana&apos;s ~400ms block times enable near-instant DeFi transactions</li>
                  <li>Escrow patterns are the foundation of trustless exchanges</li>
                  <li>PDA-based vaults provide secure, program-controlled token custody</li>
                </ul>
              </div>

              {/* Solana Escrow Integration */}
              <SolanaEscrowInfo contentType="Video" price="$0.06" />

              <div className="win95-shadow bg-retro-gray rounded-sm p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-2 font-mono">📚 Additional Resources</h4>
                <p className="text-gray-700 text-sm font-mono">
                  Explore the Sleepy Gatekeeper escrow program at{" "}
                  <code className="bg-gray-200 px-1">programs/escrow/src/lib.rs</code> — a
                  working example of DeFi primitives on Solana.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <Link
                  href="/videos"
                  className="bg-retro-gray hover:bg-white text-black font-bold py-2 px-6 win95-shadow font-mono text-sm transition-colors"
                >
                  ← Back to Videos
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
