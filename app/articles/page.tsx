import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

// Sample articles data (in a real app, this would come from a database)
const articles = [
  {
    id: "web3-future",
    title: "The Future of Web3 Payments",
    description: "Exploring how X402 protocol is revolutionizing content monetization",
    price: "$0.01",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "5 min read",
    preview: "Discover how the X402 protocol is changing the landscape of digital payments...",
  },
  {
    id: "creator-economy",
    title: "Building in the Creator Economy",
    description: "A comprehensive guide to monetizing your content with blockchain",
    price: "$0.02",
    author: "Jane Smith",
    date: "2024-01-10",
    readTime: "8 min read",
    preview: "The creator economy is booming, and Web3 technology provides new opportunities...",
  },
  {
    id: "decentralized-content",
    title: "Decentralized Content Distribution",
    description: "How blockchain enables true ownership of digital content",
    price: "$0.015",
    author: "Alex Johnson",
    date: "2024-01-05",
    readTime: "6 min read",
    preview: "Learn about the benefits of decentralized content distribution systems...",
  },
];

export default function ArticlesPage() {
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
                <span className="material-symbols-outlined">article</span>
                Premium Articles
              </h1>
            </div>
            <div className="p-4 bg-retro-gray">
              <p className="text-black font-mono text-sm">
                📰 Pay-per-view articles powered by X402 Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid with Win95 Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="win95-shadow bg-retro-gray rounded-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
            >
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold text-white font-mono">
                    Article
                  </span>
                </div>
                <span className="bg-neon-green text-black text-xs font-bold px-2 py-0.5 rounded-sm font-mono">
                  {article.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-black mb-2 font-mono">
                  {article.title}
                </h3>
                <p className="text-gray-700 mb-3 text-sm">{article.description}</p>
                <p className="text-gray-600 text-xs mb-4 line-clamp-2 font-mono">
                  {article.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-4 font-mono">
                  <span>👤 {article.author}</span>
                  <span>📖 {article.readTime}</span>
                </div>
                <Link
                  href={`/articles/${article.id}`}
                  className="block w-full text-center bg-retro-gray hover:bg-white text-black font-bold py-2 px-4 win95-shadow font-mono text-sm transition-colors"
                >
                  Read Article →
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
              About Premium Articles
            </h2>
          </div>
          <div className="p-6 bg-white">
            <p className="text-black mb-4 font-mono text-sm">
              📚 Articles are premium content pieces that you can access using the X402 payment protocol.
            </p>
            <p className="text-black mb-4 font-mono text-sm">
              💰 Each article can be purchased with instant micropayments on Solana or Base networks.
            </p>
            <p className="text-black font-mono text-sm">
              🚀 Browse, purchase, and instantly access high-quality written content.
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
