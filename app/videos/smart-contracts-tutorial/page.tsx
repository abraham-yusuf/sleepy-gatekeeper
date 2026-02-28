import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

export default function SmartContractsTutorialVideo() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <VideoCameraIcon className="h-6 w-6 text-white" />
              Smart Contracts Tutorial for Beginners
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4 font-mono text-sm">
                <span>👤 By Rachel Green</span>
                <span>•</span>
                <span>📅 January 11, 2024</span>
                <span>•</span>
                <span>🕒 42 minutes</span>
                <span>•</span>
                <span>👁️ 2.3K views</span>
              </div>
              <p className="text-lg text-gray-700 font-mono">
                Learn how to write and deploy your first smart contract on Solana
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
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
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
                Step-by-step tutorial covering Solana program development using Anchor framework.
                Learn how to build, test, and deploy smart contracts (programs) on the Solana
                blockchain with real-world examples including an escrow program.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">What You&apos;ll Learn:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Setting up Anchor development environment for Solana</li>
                <li>Understanding Program Derived Addresses (PDAs)</li>
                <li>Writing Anchor instructions with account constraints</li>
                <li>Token transfers via Cross-Program Invocation (CPI)</li>
                <li>Building an escrow program with PDA vaults</li>
                <li>Deploying to Solana Devnet and testing</li>
                <li>Integrating with frontend via @coral-xyz/anchor</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Chapter Breakdown:</h3>
              <div className="win95-shadow bg-retro-gray rounded-sm p-6 mb-6">
                <ul className="list-none text-gray-700 space-y-3 font-mono text-sm">
                  <li className="flex justify-between">
                    <span><strong>Introduction</strong> - Solana Program Architecture</span>
                    <span className="text-gray-500">00:00 - 05:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 1</strong> - Anchor Setup &amp; Project Scaffold</span>
                    <span className="text-gray-500">05:00 - 12:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 2</strong> - PDA &amp; Account Constraints</span>
                    <span className="text-gray-500">12:00 - 20:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 3</strong> - Building an Escrow Program</span>
                    <span className="text-gray-500">20:00 - 32:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 4</strong> - CPI Token Transfers</span>
                    <span className="text-gray-500">32:00 - 38:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Conclusion</strong> - Deploy &amp; Frontend Integration</span>
                    <span className="text-gray-500">38:00 - 42:00</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Key Takeaways:</h3>
              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4 mb-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2 font-mono text-sm">
                  <li>Anchor simplifies Solana program development with declarative account validation</li>
                  <li>PDAs enable deterministic, program-owned accounts without private keys</li>
                  <li>Escrow patterns use PDA vaults for trustless token custody</li>
                  <li>CPI allows programs to invoke other programs (e.g. SPL Token transfers)</li>
                </ul>
              </div>

              {/* Solana Escrow Integration */}
              <SolanaEscrowInfo contentType="Video" price="$0.08" />

              <div className="win95-shadow bg-retro-gray rounded-sm p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-2 font-mono">📚 Additional Resources</h4>
                <p className="text-gray-700 text-sm font-mono">
                  Check out the Sleepy Gatekeeper escrow program source at{" "}
                  <code className="bg-gray-200 px-1">programs/escrow/src/lib.rs</code> and
                  the TypeScript client at{" "}
                  <code className="bg-gray-200 px-1">lib/escrow.ts</code>.
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
