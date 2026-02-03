import Link from "next/link";
import { MicrophoneIcon, ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";

// Sample podcasts data
const podcasts = [
  {
    id: "web3-insights",
    title: "Web3 Insights: The Future is Here",
    description: "Deep dive into Web3 technologies and their impact on society",
    price: "$0.02",
    author: "Sarah Williams",
    date: "2024-01-12",
    duration: "45 min",
    episode: "Episode 1",
    preview: "In this episode, we explore the fundamental concepts of Web3 and how they're reshaping digital interactions...",
  },
  {
    id: "crypto-conversations",
    title: "Crypto Conversations: NFTs and Beyond",
    description: "Exploring the intersection of art, technology, and blockchain",
    price: "$0.015",
    author: "Mike Chen",
    date: "2024-01-08",
    duration: "38 min",
    episode: "Episode 5",
    preview: "Join us as we discuss the evolution of NFTs and their role in the digital art world...",
  },
  {
    id: "creator-spotlight",
    title: "Creator Spotlight: Building Your Brand",
    description: "Success stories and strategies from top Web3 creators",
    price: "$0.025",
    author: "Lisa Martinez",
    date: "2024-01-03",
    duration: "52 min",
    episode: "Episode 12",
    preview: "This week's guest shares their journey from traditional content creation to Web3 success...",
  },
];

export default function PodcastsPage() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      {/* CRT Overlay */}
      <div className="crt-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        {/* Win95 Window Header */}
        <div className="mb-8">
          <div className="win95-shadow bg-retro-gray rounded-sm inline-block">
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
              <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
                <span className="material-symbols-outlined">mic</span>
                Premium Podcasts
              </h1>
            </div>
            <div className="p-4 bg-retro-gray">
              <p className="text-black font-mono text-sm">
                🎙️ Exclusive audio content powered by X402 Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Podcasts Grid with Win95 Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="win95-shadow bg-retro-gray rounded-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
            >
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MicrophoneIcon className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold text-white font-mono">
                    {podcast.episode}
                  </span>
                </div>
                <span className="bg-neon-green text-black text-xs font-bold px-2 py-0.5 rounded-sm font-mono">
                  {podcast.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-black mb-2 font-mono">
                  {podcast.title}
                </h3>
                <p className="text-gray-700 mb-3 text-sm">{podcast.description}</p>
                <p className="text-gray-600 text-xs mb-4 line-clamp-2 font-mono">
                  {podcast.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2 font-mono">
                  <span>👤 {podcast.author}</span>
                  <span>🕒 {podcast.duration}</span>
                </div>
                <div className="text-xs text-gray-600 mb-4 font-mono">
                  <span>📅 {podcast.date}</span>
                </div>
                <Link
                  href={`/podcasts/${podcast.id}`}
                  className="block w-full text-center bg-retro-gray hover:bg-white text-black font-bold py-2 px-4 win95-shadow font-mono text-sm transition-colors"
                >
                  Listen Now →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 win95-shadow bg-retro-gray rounded-sm max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>
              About Premium Podcasts
            </h2>
          </div>
          <div className="p-6 bg-white">
            <p className="text-black mb-4 font-mono text-sm">
              🎧 Podcasts are exclusive audio episodes that you can access using the X402 payment protocol.
            </p>
            <p className="text-black mb-4 font-mono text-sm">
              💰 Each podcast can be purchased with instant micropayments on Solana or Base networks.
            </p>
            <p className="text-black font-mono text-sm">
              🚀 Browse, purchase, and instantly listen to premium audio content.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-retro-gray hover:bg-white text-black font-bold py-2 px-6 win95-shadow font-mono text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
