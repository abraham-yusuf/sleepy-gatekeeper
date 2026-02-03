import Link from "next/link";
import { VideoCameraIcon, ClockIcon, CalendarIcon } from "@heroicons/react/24/outline";

// Sample videos data
const videos = [
  {
    id: "blockchain-basics",
    title: "Blockchain Basics: A Complete Guide",
    description: "Everything you need to know about blockchain technology",
    price: "$0.05",
    author: "Tom Anderson",
    date: "2024-01-14",
    duration: "28 min",
    views: "1.2K",
    preview: "This comprehensive video guide breaks down blockchain technology in an easy-to-understand way...",
    thumbnail: "/x402-logo-dark.png",
  },
  {
    id: "smart-contracts-tutorial",
    title: "Smart Contracts Tutorial for Beginners",
    description: "Learn how to write and deploy your first smart contract",
    price: "$0.08",
    author: "Rachel Green",
    date: "2024-01-11",
    duration: "42 min",
    views: "2.3K",
    preview: "Step-by-step tutorial covering Solidity basics and smart contract deployment...",
    thumbnail: "/x402-logo-dark.png",
  },
  {
    id: "defi-explained",
    title: "DeFi Explained: The Future of Finance",
    description: "Understanding decentralized finance and its applications",
    price: "$0.06",
    author: "David Kim",
    date: "2024-01-07",
    duration: "35 min",
    views: "3.1K",
    preview: "Explore the world of decentralized finance, from lending protocols to yield farming...",
    thumbnail: "/x402-logo-dark.png",
  },
];

export default function VideosPage() {
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
                <span className="material-symbols-outlined">videocam</span>
                Premium Videos
              </h1>
            </div>
            <div className="p-4 bg-retro-gray">
              <p className="text-black font-mono text-sm">
                🎬 Exclusive video content powered by X402 Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Videos Grid with Win95 Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="win95-shadow bg-retro-gray rounded-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
            >
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <VideoCameraIcon className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold text-white font-mono">
                    Video
                  </span>
                </div>
                <span className="bg-neon-green text-black text-xs font-bold px-2 py-0.5 rounded-sm font-mono">
                  {video.price}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative bg-black aspect-video win95-recessed">
                <div className="absolute inset-0 flex items-center justify-center">
                  <VideoCameraIcon className="h-16 w-16 text-gray-400" />
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="bg-black bg-opacity-75 text-neon-green text-xs px-2 py-1 font-mono">
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-black mb-2 font-mono">
                  {video.title}
                </h3>
                <p className="text-gray-700 mb-3 text-sm">{video.description}</p>
                <p className="text-gray-600 text-xs mb-4 line-clamp-2 font-mono">
                  {video.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2 font-mono">
                  <span>👤 {video.author}</span>
                  <span>👁️ {video.views}</span>
                </div>
                <div className="text-xs text-gray-600 mb-4 font-mono">
                  <span>📅 {video.date}</span>
                </div>
                <Link
                  href={`/videos/${video.id}`}
                  className="block w-full text-center bg-retro-gray hover:bg-white text-black font-bold py-2 px-4 win95-shadow font-mono text-sm transition-colors"
                >
                  Watch Now →
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
              About Premium Videos
            </h2>
          </div>
          <div className="p-6 bg-white">
            <p className="text-black mb-4 font-mono text-sm">
              📺 Videos are premium video content that you can access using the X402 payment protocol.
            </p>
            <p className="text-black mb-4 font-mono text-sm">
              💰 Each video can be purchased with instant micropayments on Solana or Base networks.
            </p>
            <p className="text-black font-mono text-sm">
              🚀 Browse, purchase, and instantly watch high-quality video content.
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
