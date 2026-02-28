import Link from "next/link";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

export default function Web3DevelopmentSkill() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <article className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <span className="material-symbols-outlined">code</span>
              Web3 Development Starter Kit
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-gray-600 mb-6 font-mono text-sm">
                <span>👤 By John Doe</span>
                <span>•</span>
                <span>📅 January 28, 2024</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-6">
                <p className="text-lg text-gray-700 font-mono">
                  Complete guide to building decentralized applications
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Getting Started with Web3
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                This comprehensive starter kit includes everything you need to begin developing 
                decentralized applications on blockchain networks. Learn the fundamentals and 
                build production-ready dApps.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Core Technologies
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Solidity smart contract development</li>
                <li>ethers.js and web3.js libraries</li>
                <li>React/Next.js for frontend integration</li>
                <li>IPFS for decentralized storage</li>
                <li>The Graph for blockchain data indexing</li>
              </ul>

              <div className="win95-recessed bg-black p-4 mb-6">
                <pre className="text-neon-green font-mono text-xs terminal-glow overflow-x-auto">
{`// Sample Smart Contract
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    function set(uint256 x) public {
        storedData = x;
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">📝 Templates</h3>
                  <p className="text-sm text-gray-700">Ready-to-use smart contract templates</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">🛠️ Tools</h3>
                  <p className="text-sm text-gray-700">Development environment setup guides</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">📚 Documentation</h3>
                  <p className="text-sm text-gray-700">Comprehensive guides and best practices</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">💡 Examples</h3>
                  <p className="text-sm text-gray-700">Real-world dApp examples</p>
                </div>
              </div>

              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-6 mt-8">
                <p className="text-gray-800 font-bold mb-2 font-mono">✅ Pro Tip</p>
                <p className="text-gray-700 font-mono text-sm">
                  Start with testnet deployment before going to mainnet. Save gas fees and learn safely!
                </p>
              </div>

              {/* Solana Escrow Integration */}
              <SolanaEscrowInfo contentType="Skill" price="$0.10" />
            </div>

            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <Link
                  href="/skills"
                  className="bg-retro-gray hover:bg-white text-black font-bold py-2 px-6 win95-shadow font-mono text-sm transition-colors"
                >
                  ← Back to Skills
                </Link>
                <div className="text-sm text-gray-500 font-mono">
                  Powered by X402 Protocol + Solana Escrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
