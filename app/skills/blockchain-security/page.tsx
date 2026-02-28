import Link from "next/link";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

export default function BlockchainSecuritySkill() {
  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay"></div>

      <article className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="win95-shadow bg-retro-gray rounded-sm">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
              <span className="material-symbols-outlined">shield</span>
              Blockchain Security Best Practices
            </h1>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-gray-600 mb-6 font-mono text-sm">
                <span>👤 By Alex Johnson</span>
                <span>•</span>
                <span>📅 January 25, 2024</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-6">
                <p className="text-lg text-gray-700 font-mono">
                  Essential security patterns for smart contract development
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Security First Approach
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Learn industry-standard security practices to protect your smart contracts and users. 
                Understand common vulnerabilities and how to prevent them.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Common Vulnerabilities
              </h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Reentrancy attacks and prevention</li>
                <li>Integer overflow/underflow protection</li>
                <li>Access control vulnerabilities</li>
                <li>Front-running and MEV attacks</li>
                <li>Oracle manipulation risks</li>
              </ul>

              <div className="win95-recessed bg-black p-4 mb-6">
                <pre className="text-neon-green font-mono text-xs terminal-glow overflow-x-auto">
{`// Reentrancy Guard Pattern
contract SecureContract {
    bool private locked;
    
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    
    function withdraw() public noReentrant {
        // Safe withdrawal logic
    }
}`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-mono">
                Security Tools & Testing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">🔍 Analysis</h3>
                  <p className="text-sm text-gray-700">Static analysis with Slither and MythX</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">✅ Testing</h3>
                  <p className="text-sm text-gray-700">Comprehensive test suite patterns</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">📊 Audits</h3>
                  <p className="text-sm text-gray-700">Audit preparation checklists</p>
                </div>
                <div className="win95-shadow bg-retro-gray p-4">
                  <h3 className="font-bold text-black mb-2 font-mono">🛡️ Monitoring</h3>
                  <p className="text-sm text-gray-700">Runtime security monitoring</p>
                </div>
              </div>

              <div className="win95-shadow bg-neon-green/20 border-2 border-neon-green p-6 mt-8">
                <p className="text-gray-800 font-bold mb-2 font-mono">⚠️ Critical Reminder</p>
                <p className="text-gray-700 font-mono text-sm">
                  Always get professional security audits before deploying to mainnet. No amount of 
                  testing can replace expert review.
                </p>
              </div>

              {/* Solana Escrow Integration */}
              <SolanaEscrowInfo contentType="Skill" price="$0.08" />
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
