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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Premium Videos</h1>
          <p className="text-gray-600">
            Exclusive video content powered by X402 Protocol
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative bg-gray-200 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <VideoCameraIcon className="h-16 w-16 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {video.price}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {video.preview}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{video.date}</span>
                    </div>
                    <span>{video.views} views</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    By {video.author}
                  </div>
                </div>
                <Link
                  href={`/videos/${video.id}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Watch Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
