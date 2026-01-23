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
    <div className="min-h-screen bg-[#008080] font-pixel">
      {/* Win95 Desktop Pattern */}
      <div className="min-h-screen p-8">
        {/* Main Window Container */}
        <div className="max-w-7xl mx-auto">
          {/* Win95 Window Title Bar */}
          <div className="retro-title-gradient win95-shadow flex items-center justify-between px-2 py-1 mb-0">
            <div className="flex items-center gap-2">
              <VideoCameraIcon className="h-4 w-4 text-white" />
              <span className="text-white text-xs">Premium Videos - X402 Protocol</span>
            </div>
            <div className="flex gap-1">
              <button className="bg-[#c0c0c0] win95-shadow px-2 text-xs hover:win95-button-active">_</button>
              <button className="bg-[#c0c0c0] win95-shadow px-2 text-xs hover:win95-button-active">□</button>
              <button className="bg-[#c0c0c0] win95-shadow px-2 text-xs hover:win95-button-active">✕</button>
            </div>
          </div>

          {/* Win95 Window Content */}
          <div className="bg-[#c0c0c0] win95-shadow p-4">
            {/* Header Section */}
            <div className="mb-6 p-4 win95-recessed bg-white">
              <h1 className="text-xl text-black mb-2">Premium Videos</h1>
              <p className="text-sm text-black">
                Exclusive video content powered by X402 Protocol
              </p>
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-[#c0c0c0] win95-bevel p-3"
                >
                  {/* Video Thumbnail */}
                  <div className="relative bg-black aspect-video mb-3 win95-recessed">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <VideoCameraIcon className="h-12 w-12 text-[#00ff00]" />
                    </div>
                    <div className="absolute top-1 right-1">
                      <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 win95-shadow">
                        {video.price}
                      </span>
                    </div>
                    <div className="absolute bottom-1 right-1">
                      <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 win95-shadow">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-black leading-relaxed">
                      {video.title}
                    </h3>
                    <p className="text-[10px] text-black leading-relaxed">
                      {video.description}
                    </p>
                    
                    {/* Metadata */}
                    <div className="win95-recessed bg-white p-2 space-y-1">
                      <div className="flex items-center justify-between text-[9px] text-black">
                        <span>📅 {video.date}</span>
                        <span>👁 {video.views}</span>
                      </div>
                      <div className="text-[9px] text-black">
                        By: {video.author}
                      </div>
                    </div>

                    {/* Watch Button */}
                    <Link
                      href={`/videos/${video.id}`}
                      className="block w-full text-center bg-[#c0c0c0] win95-shadow hover:win95-button-active text-black text-xs py-2 active:translate-x-[1px] active:translate-y-[1px]"
                    >
                      ▶ Watch Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Back Button */}
            <div className="mt-6 flex justify-center">
              <Link 
                href="/" 
                className="bg-[#c0c0c0] win95-shadow hover:win95-button-active text-black text-xs px-6 py-2 active:translate-x-[1px] active:translate-y-[1px]"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
