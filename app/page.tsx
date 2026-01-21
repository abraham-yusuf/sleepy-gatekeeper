"use client";

import { useState } from "react";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen w-full grid-background text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="font-pixel text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                $402
              </div>
            </div>
            
            {/* Connect Wallet Button */}
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all border-2 border-transparent hover:border-white/20">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glitchy Headline */}
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl mb-6 glitch-button">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              402: Payment Required
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
            The internet&apos;s toll booth is finally open on Solana.
          </p>
          
          {/* CTA Button - Retro Windows 95 Style */}
          <button className="px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded border-2 border-gray-700 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(153,69,255,0.5)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all glitch-button">
            WAKE UP THE GATEKEEPER
          </button>
        </div>
      </section>

      {/* The Lore Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pixel text-3xl md:text-4xl mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            THE LORE
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Placeholder Image */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square max-w-md bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg border-2 border-gray-700 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">💤</div>
                  <div className="font-pixel text-sm text-purple-400">Sleepy Robot</div>
                  <div className="font-pixel text-xs text-gray-500 mt-2">Coming Soon</div>
                </div>
              </div>
            </div>
            
            {/* Right: Terminal Window */}
            <div className="border-2 border-gray-700 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] rounded-lg overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b-2 border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs font-mono text-gray-400">System Terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="bg-black p-6 font-mono text-sm text-green-400 terminal-glow min-h-[300px]">
                <p className="mb-2">&gt; Loading gatekeeper_protocol.exe...</p>
                <p className="mb-2">&gt; Status: DORMANT</p>
                <p className="mb-2">&gt; Last Active: 1997-04-02</p>
                <p className="mb-4">&gt; ...</p>
                <p className="mb-2">&gt; Base Network detected...</p>
                <p className="mb-2">&gt; WAKE signal received!</p>
                <p className="mb-4">&gt; Initializing on Solana for maximum speed...</p>
                <p className="mb-2 text-purple-400">&gt; STATUS: ONLINE</p>
                <p className="mb-2">&gt; The Gatekeeper is awake.</p>
                <p className="mb-2">&gt; Ready to collect tolls.</p>
                <p className="animate-pulse">_</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive x402 Demo (The Toll Booth) */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-3xl md:text-4xl mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            THE TOLL BOOTH
          </h2>
          
          <div className="relative border-2 border-gray-700 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] rounded-lg overflow-hidden bg-gradient-to-br from-blue-600/5 to-purple-600/5">
            {/* Locked/Blurred Content */}
            <div className={`p-8 transition-all duration-500 ${isUnlocked ? 'blur-none' : 'blur-md select-none'}`}>
              <h3 className="text-2xl font-bold mb-4">🎉 Premium Content Unlocked!</h3>
              <p className="text-gray-300 mb-4">
                Welcome to the exclusive content zone! You&apos;ve successfully paid the toll and unlocked this premium section.
              </p>
              <p className="text-gray-300 mb-4">
                This is a simulation of the x402 protocol in action. In a real implementation, this content would be protected by the x402 payment protocol, bridging Base and Solana technologies.
              </p>
              <div className="bg-black/50 p-4 rounded font-mono text-xs text-green-400 terminal-glow">
                <p>&gt; Transaction verified ✓</p>
                <p>&gt; Payment received: 0.0001 USDC</p>
                <p>&gt; Access granted to premium content</p>
              </div>
            </div>
            
            {/* Overlay when locked */}
            {!isUnlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🔒</div>
                  <h3 className="font-pixel text-xl mb-4 text-yellow-400">
                    402: Payment Required
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-md">
                    This premium content is protected by the x402 protocol
                  </p>
                  <button
                    onClick={() => setIsUnlocked(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded border-2 border-gray-700 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(153,69,255,0.5)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Pay 0.0001 USDC to Unlock
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-3xl md:text-4xl mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            THE LEDGER
          </h2>
          
          {/* Retro Spreadsheet Style */}
          <div className="border-2 border-gray-700 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] rounded-lg overflow-hidden bg-gray-900">
            {/* Spreadsheet Header */}
            <div className="bg-gray-800 px-4 py-3 border-b-2 border-gray-700">
              <span className="font-pixel text-sm text-purple-400">TOKENOMICS.XLS</span>
            </div>
            
            {/* Spreadsheet Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 border-b-2 border-gray-700">
                    <th className="px-6 py-4 text-left font-mono text-xs text-gray-400 border-r-2 border-gray-700">PARAMETER</th>
                    <th className="px-6 py-4 text-left font-mono text-xs text-gray-400">VALUE</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 border-r-2 border-gray-700 text-gray-300">Ticker</td>
                    <td className="px-6 py-4 text-purple-400 font-bold">$402</td>
                  </tr>
                  <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 border-r-2 border-gray-700 text-gray-300">Total Supply</td>
                    <td className="px-6 py-4 text-green-400 font-bold">402,000,000</td>
                  </tr>
                  <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 border-r-2 border-gray-700 text-gray-300">Network</td>
                    <td className="px-6 py-4 text-blue-400 font-bold">Solana</td>
                  </tr>
                  <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 border-r-2 border-gray-700 text-gray-300">Protocol</td>
                    <td className="px-6 py-4 text-purple-400 font-bold">x402</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 border-r-2 border-gray-700 text-gray-300">Status</td>
                    <td className="px-6 py-4 text-green-400 font-bold flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                      </span>
                      LIVE
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="font-pixel text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              $402
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors font-medium"
              >
                Twitter
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-purple-400 transition-colors font-medium"
              >
                Telegram
              </a>
            </div>
            
            {/* Disclaimer */}
            <div className="text-gray-500 text-sm font-mono text-center md:text-right">
              Powered by x402 Protocol. No refunds.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
