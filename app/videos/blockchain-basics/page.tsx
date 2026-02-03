import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export default function BlockchainBasicsVideo() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <VideoCameraIcon className="h-6 w-6 text-white" />
              Blockchain Basics: A Complete Guide
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4 font-mono text-sm">
                <span>👤 By Tom Anderson</span>
                <span>•</span>
                <span>📅 January 14, 2024</span>
                <span>•</span>
                <span>🕒 28 minutes</span>
                <span>•</span>
                <span>👁️ 1.2K views</span>
              </div>
              <p className="text-lg text-gray-700 font-mono">
                Everything you need to know about blockchain technology
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
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
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
                This comprehensive video guide breaks down blockchain technology in an
                easy-to-understand way. Perfect for beginners and those looking to refresh
                their knowledge of this revolutionary technology.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">What You'll Learn:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>The fundamental concepts of blockchain technology</li>
                <li>How blocks are created and linked together</li>
                <li>Understanding consensus mechanisms (PoW, PoS)</li>
                <li>The difference between public and private blockchains</li>
                <li>Real-world applications across industries</li>
                <li>Security features and cryptographic principles</li>
                <li>The role of nodes and miners in the network</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Chapter Breakdown:</h3>
              <div className="win95-shadow bg-retro-gray rounded-sm p-6 mb-6">
                <ul className="list-none text-gray-700 space-y-3 font-mono text-sm">
                  <li className="flex justify-between">
                    <span><strong>Introduction</strong> - What is Blockchain?</span>
                    <span className="text-gray-500">00:00 - 03:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 1</strong> - Core Components</span>
                    <span className="text-gray-500">03:30 - 08:15</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 2</strong> - How Transactions Work</span>
                    <span className="text-gray-500">08:15 - 14:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 3</strong> - Consensus Mechanisms</span>
                    <span className="text-gray-500">14:00 - 19:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Chapter 4</strong> - Use Cases and Applications</span>
                    <span className="text-gray-500">19:30 - 24:45</span>
                  </li>
                  <li className="flex justify-between">
                    <span><strong>Conclusion</strong> - The Future of Blockchain</span>
                    <span className="text-gray-500">24:45 - 28:00</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Key Takeaways:</h3>
              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4 mb-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2 font-mono text-sm">
                  <li>Blockchain is a distributed ledger technology that ensures transparency and security</li>
                  <li>Each block contains a cryptographic hash of the previous block, creating an immutable chain</li>
                  <li>Decentralization eliminates the need for trusted intermediaries</li>
                  <li>Applications extend far beyond cryptocurrency to supply chain, healthcare, and more</li>
                </ul>
              </div>

              <div className="win95-shadow bg-retro-gray rounded-sm p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-2 font-mono">📚 Additional Resources</h4>
                <p className="text-gray-700 text-sm font-mono">
                  Subscribe to our channel for more blockchain and Web3 content. Check out
                  our article library for in-depth written guides to complement this video.
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
                  Powered by X402 Protocol
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
