import Link from "next/link";
import { MicrophoneIcon } from "@heroicons/react/24/outline";

export default function Web3InsightsPodcast() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <MicrophoneIcon className="h-6 w-6 text-white" />
              Web3 Insights: The Future is Here
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4 font-mono text-sm">
                <span className="bg-neon-green text-black px-2 py-1 font-bold">Episode 1</span>
                <span>👤 By Sarah Williams</span>
                <span>•</span>
                <span>📅 January 12, 2024</span>
                <span>•</span>
                <span>🕒 45 minutes</span>
              </div>
              <p className="text-lg text-gray-700 font-mono">
                Deep dive into Web3 technologies and their impact on society
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
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
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
                In this groundbreaking episode, we explore the fundamental concepts of Web3
                and how they're reshaping our digital interactions. From decentralized
                finance to NFTs and beyond, we cover it all.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Topics Covered:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Introduction to Web3 and blockchain technology</li>
                <li>The evolution from Web2 to Web3</li>
                <li>Decentralized applications (dApps) and their use cases</li>
                <li>Smart contracts and their real-world applications</li>
                <li>The future of digital ownership and identity</li>
                <li>How X402 protocol enables new monetization models</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Key Insights:</h3>
              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-4 mb-6">
                <p className="text-gray-700 font-mono text-sm">
                  "Web3 isn't just about technology—it's about empowering individuals to
                  own their digital lives. The shift from centralized platforms to
                  decentralized networks represents a fundamental change in how we
                  interact online."
                </p>
                <p className="text-sm text-gray-600 mt-2 font-mono">— Sarah Williams, Host</p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-mono">Timestamps:</h3>
              <div className="win95-recessed bg-black p-4 mb-6">
                <ul className="list-none text-neon-green space-y-2 font-mono text-xs terminal-glow">
                  <li><strong>00:00</strong> - Introduction and overview</li>
                  <li><strong>05:30</strong> - What is Web3?</li>
                  <li><strong>12:15</strong> - Blockchain basics explained</li>
                  <li><strong>20:45</strong> - Real-world applications of Web3</li>
                  <li><strong>30:00</strong> - The creator economy in Web3</li>
                  <li><strong>38:20</strong> - X402 protocol and micropayments</li>
                  <li><strong>42:00</strong> - Closing thoughts and next episode preview</li>
                </ul>
              </div>
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
