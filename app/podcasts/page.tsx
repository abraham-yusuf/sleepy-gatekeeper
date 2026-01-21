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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Premium Podcasts</h1>
          <p className="text-gray-600">
            Exclusive audio content powered by X402 Protocol
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <MicrophoneIcon className="h-8 w-8 text-purple-600" />
                  <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {podcast.price}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-purple-600 font-semibold">
                    {podcast.episode}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {podcast.title}
                </h3>
                <p className="text-gray-600 mb-4">{podcast.description}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {podcast.preview}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>{podcast.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>{podcast.duration}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    By {podcast.author}
                  </div>
                </div>
                <Link
                  href={`/podcasts/${podcast.id}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Listen Now
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
