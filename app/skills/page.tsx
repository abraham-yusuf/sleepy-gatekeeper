import Link from "next/link";
import { LightBulbIcon } from "@heroicons/react/24/outline";

// Sample skills data (in a real app, this would come from a database)
const skills = [
  {
    id: "ai-prompt-mastery",
    title: "AI Prompt Engineering Mastery",
    description: "Advanced techniques for crafting effective AI prompts",
    price: "$0.05",
    author: "Jane Smith",
    date: "2024-02-01",
    category: "AI Skills",
    preview: "Learn professional prompt engineering techniques used by AI experts...",
  },
  {
    id: "web3-development",
    title: "Web3 Development Starter Kit",
    description: "Complete guide to building decentralized applications",
    price: "$0.10",
    author: "John Doe",
    date: "2024-01-28",
    category: "Development",
    preview: "Start building Web3 apps with this comprehensive skill package...",
  },
  {
    id: "blockchain-security",
    title: "Blockchain Security Best Practices",
    description: "Essential security patterns for smart contract development",
    price: "$0.08",
    author: "Alex Johnson",
    date: "2024-01-25",
    category: "Security",
    preview: "Protect your smart contracts with industry-standard security practices...",
  },
];

export default function SkillsPage() {
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
                <span className="material-symbols-outlined">school</span>
                Skills Marketplace
              </h1>
            </div>
            <div className="p-4 bg-retro-gray">
              <p className="text-black font-mono text-sm">
                💡 Pay-per-access AI skills, templates, and tools powered by X402 Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid with Win95 Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="win95-shadow bg-retro-gray rounded-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
            >
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LightBulbIcon className="h-4 w-4 text-white" />
                  <span className="text-xs font-bold text-white font-mono">
                    {skill.category}
                  </span>
                </div>
                <span className="bg-neon-green text-black text-xs font-bold px-2 py-0.5 rounded-sm font-mono">
                  {skill.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-black mb-2 font-mono">
                  {skill.title}
                </h3>
                <p className="text-gray-700 mb-3 text-sm">{skill.description}</p>
                <p className="text-gray-600 text-xs mb-4 line-clamp-2 font-mono">
                  {skill.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-4 font-mono">
                  <span>👤 {skill.author}</span>
                  <span>📅 {skill.date}</span>
                </div>
                <Link
                  href={`/skills/${skill.id}`}
                  className="block w-full text-center bg-retro-gray hover:bg-white text-black font-bold py-2 px-4 win95-shadow font-mono text-sm transition-colors"
                >
                  Access Skill →
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
              About Skills Marketplace
            </h2>
          </div>
          <div className="p-6 bg-white">
            <p className="text-black mb-4 font-mono text-sm">
              📚 Skills are premium knowledge packages that creators sell using the X402 payment protocol.
            </p>
            <p className="text-black mb-4 font-mono text-sm">
              💰 Each skill can be purchased with instant micropayments on Solana or Base networks.
            </p>
            <p className="text-black font-mono text-sm">
              🚀 Browse, purchase, and instantly access professional skills and tools.
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
