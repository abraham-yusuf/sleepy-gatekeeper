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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Premium Articles</h1>
          <p className="text-gray-600">
            Pay-per-view articles powered by X402 Protocol
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <DocumentTextIcon className="h-8 w-8 text-green-600" />
                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {article.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {article.preview}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{article.author}</span>
                  <span>{article.readTime}</span>
                </div>
                <Link
                  href={`/articles/${article.id}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Read Article
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
