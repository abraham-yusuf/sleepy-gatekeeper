"use client";

import { Win95Window } from "./Win95Window";

export function HelpDocs() {
  const topics = [
    { icon: "help", title: "Getting Started", id: "getting-started" },
    { icon: "info", title: "What is x402?", id: "what-is-x402" },
    { icon: "account_balance_wallet", title: "Wallet Setup", id: "wallet" },
    { icon: "payments", title: "Making Payments", id: "payments" },
    { icon: "swap_horiz", title: "Token Swaps", id: "swaps" },
    { icon: "security", title: "Security", id: "security" },
  ];

  return (
    <Win95Window
      title="Help Documentation - Sleepy Gatekeeper"
      icon={<span className="material-symbols-outlined text-sm">help_center</span>}
      className="w-full max-w-4xl h-[80vh]"
    >
      <div className="flex h-full bg-white">
        {/* Sidebar */}
        <div className="w-64 bg-retro-gray border-r-2 border-gray-700 p-2">
          <div className="text-xs font-bold text-black mb-3 uppercase px-2">
            Contents
          </div>
          <div className="space-y-1">
            {topics.map((topic) => (
              <button
                key={topic.id}
                className="w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-primary hover:text-white transition-colors text-black text-sm"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {topic.icon}
                </span>
                <span>{topic.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <h1 className="text-2xl font-bold text-black mb-4">
              Welcome to Sleepy Gatekeeper ($402)
            </h1>

            <div className="bg-[#ffff00] border-2 border-black p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-black text-2xl">
                  lightbulb
                </span>
                <div>
                  <h3 className="font-bold text-black text-sm mb-1">
                    Quick Start Guide
                  </h3>
                  <p className="text-xs text-black">
                    The Sleepy Gatekeeper is a retro-themed payment protocol on
                    Solana. Follow the steps below to get started.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-black mb-3">What is x402?</h2>
            <p className="text-sm text-black mb-4">
              The x402 protocol implements HTTP 402 Payment Required status code
              for decentralized micropayments. It enables content creators to
              monetize their work by requiring small payments before access.
            </p>

            <h2 className="text-xl font-bold text-black mb-3">Key Features</h2>
            <ul className="list-disc list-inside text-sm text-black mb-4 space-y-2">
              <li>
                <strong>Micropayments:</strong> Pay-per-view content with minimal
                fees
              </li>
              <li>
                <strong>Solana Speed:</strong> Fast transactions with low costs
              </li>
              <li>
                <strong>Retro UI:</strong> Windows 95-inspired interface
              </li>
              <li>
                <strong>Token Gate:</strong> $402 token for premium features
              </li>
            </ul>

            <h2 className="text-xl font-bold text-black mb-3">How to Use</h2>
            <div className="win95-recessed bg-white p-4 mb-4">
              <ol className="list-decimal list-inside text-sm text-black space-y-2">
                <li>Connect your Solana wallet using the button in the header</li>
                <li>Browse content protected by the x402 paywall</li>
                <li>When prompted, pay the small fee (typically 0.0001 USDC)</li>
                <li>Access is granted immediately after payment confirmation</li>
              </ol>
            </div>

            <h2 className="text-xl font-bold text-black mb-3">Need More Help?</h2>
            <p className="text-sm text-black mb-2">
              Visit our community channels:
            </p>
            <div className="flex gap-3">
              <button className="win95-shadow bg-retro-gray px-4 py-2 text-xs font-bold text-black hover:bg-white transition-colors">
                Twitter / X
              </button>
              <button className="win95-shadow bg-retro-gray px-4 py-2 text-xs font-bold text-black hover:bg-white transition-colors">
                Telegram
              </button>
              <button className="win95-shadow bg-retro-gray px-4 py-2 text-xs font-bold text-black hover:bg-white transition-colors">
                Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </Win95Window>
  );
}
