import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export default function BlockchainBasicsVideo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blockchain Basics: A Complete Guide
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <span>By Tom Anderson</span>
              <span>•</span>
              <span>January 14, 2024</span>
              <span>•</span>
              <span>28 minutes</span>
              <span>•</span>
              <span>1.2K views</span>
            </div>
            <p className="text-lg text-gray-700">
              Everything you need to know about blockchain technology
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Now Playing: Premium Video Content
            </h2>
            <div className="bg-black rounded-lg overflow-hidden shadow-lg">
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
            <p className="text-sm text-gray-600 mt-4 text-center">
              Thank you for your payment! Enjoy the video. 🎬
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Video Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This comprehensive video guide breaks down blockchain technology in an
              easy-to-understand way. Perfect for beginners and those looking to refresh
              their knowledge of this revolutionary technology.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">What You'll Learn:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>The fundamental concepts of blockchain technology</li>
              <li>How blocks are created and linked together</li>
              <li>Understanding consensus mechanisms (PoW, PoS)</li>
              <li>The difference between public and private blockchains</li>
              <li>Real-world applications across industries</li>
              <li>Security features and cryptographic principles</li>
              <li>The role of nodes and miners in the network</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Chapter Breakdown:</h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="list-none text-gray-700 space-y-3">
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

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key Takeaways:</h3>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Blockchain is a distributed ledger technology that ensures transparency and security</li>
                <li>Each block contains a cryptographic hash of the previous block, creating an immutable chain</li>
                <li>Decentralization eliminates the need for trusted intermediaries</li>
                <li>Applications extend far beyond cryptocurrency to supply chain, healthcare, and more</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mt-6">
              <h4 className="font-bold text-gray-900 mb-2">Additional Resources</h4>
              <p className="text-gray-700 text-sm">
                Subscribe to our channel for more blockchain and Web3 content. Check out
                our article library for in-depth written guides to complement this video.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href="/videos"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Videos
              </Link>
              <div className="text-sm text-gray-500">
                Powered by X402 Protocol
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
