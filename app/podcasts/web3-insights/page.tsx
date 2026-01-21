import Link from "next/link";
import { MicrophoneIcon } from "@heroicons/react/24/outline";

export default function Web3InsightsPodcast() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 rounded-full p-4">
              <MicrophoneIcon className="h-12 w-12 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-semibold">Episode 1</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Web3 Insights: The Future is Here
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <span>By Sarah Williams</span>
              <span>•</span>
              <span>January 12, 2024</span>
              <span>•</span>
              <span>45 minutes</span>
            </div>
            <p className="text-lg text-gray-700">
              Deep dive into Web3 technologies and their impact on society
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Now Playing: Premium Audio Content
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <audio
                controls
                className="w-full"
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              >
                Your browser does not support the audio element.
              </audio>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Thank you for your payment! Enjoy the episode. 🎧
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Episode Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this groundbreaking episode, we explore the fundamental concepts of Web3
              and how they're reshaping our digital interactions. From decentralized
              finance to NFTs and beyond, we cover it all.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Topics Covered:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Introduction to Web3 and blockchain technology</li>
              <li>The evolution from Web2 to Web3</li>
              <li>Decentralized applications (dApps) and their use cases</li>
              <li>Smart contracts and their real-world applications</li>
              <li>The future of digital ownership and identity</li>
              <li>How X402 protocol enables new monetization models</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key Insights:</h3>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <p className="text-gray-700">
                "Web3 isn't just about technology—it's about empowering individuals to
                own their digital lives. The shift from centralized platforms to
                decentralized networks represents a fundamental change in how we
                interact online."
              </p>
              <p className="text-sm text-gray-600 mt-2">— Sarah Williams, Host</p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Timestamps:</h3>
            <ul className="list-none text-gray-700 space-y-2 mb-6">
              <li><strong>00:00</strong> - Introduction and overview</li>
              <li><strong>05:30</strong> - What is Web3?</li>
              <li><strong>12:15</strong> - Blockchain basics explained</li>
              <li><strong>20:45</strong> - Real-world applications of Web3</li>
              <li><strong>30:00</strong> - The creator economy in Web3</li>
              <li><strong>38:20</strong> - X402 protocol and micropayments</li>
              <li><strong>42:00</strong> - Closing thoughts and next episode preview</li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href="/podcasts"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Podcasts
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
