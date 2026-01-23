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
    <div className="min-h-screen" style={{ backgroundColor: "#008080" }}>
      {/* Win95-style Desktop Background Pattern */}
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"4\" height=\"4\" viewBox=\"0 0 4 4\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h2v2H0V0zm2 2h2v2H2V2z\" fill=\"%23006060\" fill-opacity=\"0.4\"/%3E%3C/svg%3E')",
          backgroundSize: "4px 4px"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Title Bar - Win95 Window Style */}
          <div className="mb-8 win95-shadow" style={{ backgroundColor: "#c0c0c0" }}>
            <div 
              className="px-2 py-1 flex items-center justify-between"
              style={{
                background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)"
              }}
            >
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-4 w-4 text-white" />
                <span className="text-white font-bold text-sm">Premium Articles - X402</span>
              </div>
              <div className="flex gap-1">
                <div className="w-4 h-4 win95-shadow" style={{ backgroundColor: "#c0c0c0", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>_</div>
                <div className="w-4 h-4 win95-shadow" style={{ backgroundColor: "#c0c0c0", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>□</div>
                <div className="w-4 h-4 win95-shadow" style={{ backgroundColor: "#c0c0c0", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-pixel mb-2" style={{ color: "#000080" }}>
                Premium Articles
              </h1>
              <p className="text-sm" style={{ color: "#000000" }}>
                Pay-per-view articles powered by X402 Protocol
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="win95-shadow"
                style={{ backgroundColor: "#c0c0c0" }}
              >
                {/* Article Title Bar */}
                <div 
                  className="px-2 py-1 flex items-center justify-between"
                  style={{
                    background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)"
                  }}
                >
                  <div className="flex items-center gap-1">
                    <DocumentTextIcon className="h-3 w-3 text-white" />
                    <span className="text-white text-xs font-bold">Article.txt</span>
                  </div>
                </div>
                
                {/* Article Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="win95-recessed px-2 py-1" style={{ backgroundColor: "#ffffff" }}>
                      <DocumentTextIcon className="h-6 w-6" style={{ color: "#000080" }} />
                    </div>
                    <span 
                      className="win95-shadow text-xs font-bold px-2 py-1"
                      style={{ 
                        backgroundColor: "#ffff00",
                        color: "#000000"
                      }}
                    >
                      {article.price}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-sm font-bold mb-2 font-pixel"
                    style={{ color: "#000000", lineHeight: "1.4" }}
                  >
                    {article.title}
                  </h3>
                  
                  <p className="text-xs mb-3" style={{ color: "#000000" }}>
                    {article.description}
                  </p>
                  
                  <div 
                    className="win95-recessed p-2 mb-3 text-xs"
                    style={{ 
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      minHeight: "60px"
                    }}
                  >
                    {article.preview}
                  </div>
                  
                  <div 
                    className="flex items-center justify-between text-xs mb-3"
                    style={{ color: "#000000" }}
                  >
                    <span>👤 {article.author}</span>
                    <span>⏱️ {article.readTime}</span>
                  </div>
                  
                  <Link
                    href={`/articles/${article.id}`}
                    className="block w-full text-center win95-shadow font-bold py-2 px-4 text-sm hover:win95-button-active"
                    style={{ 
                      backgroundColor: "#c0c0c0",
                      color: "#000000",
                      border: "2px outset #ffffff"
                    }}
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-12 flex justify-center">
            <Link 
              href="/" 
              className="win95-shadow font-bold py-2 px-6 text-sm hover:win95-button-active"
              style={{ 
                backgroundColor: "#c0c0c0",
                color: "#000000",
                border: "2px outset #ffffff"
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
