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
    <div className="min-h-screen bg-[#008080] font-pixel">
      {/* Win95 Desktop Pattern */}
      <div className="min-h-screen p-8">
        {/* Main Window Container */}
        <div className="max-w-7xl mx-auto">
          {/* Win95 Window Title Bar */}
          <div className="retro-title-gradient win95-shadow flex items-center justify-between px-2 py-1 mb-0">
            <div className="flex items-center gap-2">
              <MicrophoneIcon className="h-4 w-4 text-white" />
              <span className="text-white text-xs">Premium Podcasts - X402 Protocol</span>
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
              <h1 className="text-xl text-black mb-2">Premium Podcasts</h1>
              <p className="text-sm text-black">
                Exclusive audio content powered by X402 Protocol
              </p>
            </div>

            {/* Podcasts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="bg-[#c0c0c0] win95-bevel p-3"
                >
                  {/* Podcast Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="win95-recessed bg-purple-600 p-2">
                      <MicrophoneIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 win95-shadow">
                      {podcast.price}
                    </span>
                  </div>

                  {/* Episode Badge */}
                  <div className="mb-2">
                    <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 win95-shadow">
                      {podcast.episode}
                    </span>
                  </div>

                  {/* Podcast Info */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-black leading-relaxed">
                      {podcast.title}
                    </h3>
                    <p className="text-[10px] text-black leading-relaxed">
                      {podcast.description}
                    </p>
                    
                    {/* Metadata */}
                    <div className="win95-recessed bg-white p-2 space-y-1">
                      <div className="flex items-center text-[9px] text-black">
                        <span>📅 {podcast.date}</span>
                      </div>
                      <div className="flex items-center text-[9px] text-black">
                        <span>⏱ {podcast.duration}</span>
                      </div>
                      <div className="text-[9px] text-black">
                        By: {podcast.author}
                      </div>
                    </div>

                    {/* Listen Button */}
                    <Link
                      href={`/podcasts/${podcast.id}`}
                      className="block w-full text-center bg-[#c0c0c0] win95-shadow hover:win95-button-active text-black text-xs py-2 active:translate-x-[1px] active:translate-y-[1px]"
                    >
                      🎧 Listen Now
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
