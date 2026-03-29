"use client";

/**
 * Demo: How to use EscrowPayButton in a skill detail page.
 *
 * Drop <EscrowPayButton> in any protected content page and
 * wrap premium content in an {isUnlocked && <PremiumContent />} gate.
 *
 * This file is an example — not the actual page.tsx.
 */

import { useState } from "react";
import Link from "next/link";
import EscrowPayButton from "@/app/components/EscrowPayButton";
import SolanaEscrowInfo from "@/app/components/SolanaEscrowInfo";

const SKILL = {
  id: "ai-prompt-mastery",
  title: "AI Prompt Engineering Mastery",
  price: "$0.05",
  priceUsdc: 0.05,
  author: "Jane Smith",
  category: "AI Skills",
  creatorAddress: process.env.NEXT_PUBLIC_SVM_ADDRESS ?? "",
};

export default function SkillDetailDemo() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="min-h-screen grid-bg pb-12">
      <div className="crt-overlay" />
      <div className="max-w-3xl mx-auto px-4 py-12 relative">

        {/* Header */}
        <div className="win95-shadow bg-retro-gray rounded-sm mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 px-4 py-2">
            <h1 className="text-xl font-bold text-white font-mono">
              {SKILL.title}
            </h1>
          </div>
          <div className="p-4 bg-white flex items-center justify-between">
            <span className="font-mono text-sm text-gray-700">
              👤 {SKILL.author} · 📁 {SKILL.category}
            </span>
            <span className="bg-neon-green text-black font-bold px-3 py-1 font-mono text-sm">
              {SKILL.price}
            </span>
          </div>
        </div>

        {/* ── Escrow pay button ── */}
        {!isUnlocked && (
          <EscrowPayButton
            creatorAddress={SKILL.creatorAddress}
            priceUsdc={SKILL.priceUsdc}
            contentLabel={SKILL.title}
            onUnlock={() => setIsUnlocked(true)}
            className="mb-8"
          />
        )}

        {/* ── Premium content gate ── */}
        {isUnlocked ? (
          <div className="win95-shadow bg-retro-gray rounded-sm mb-8">
            <div className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-2">
              <h2 className="text-lg font-bold text-white font-mono">
                ✅ Premium Content — Unlocked
              </h2>
            </div>
            <div className="p-6 bg-white">
              <p className="text-black font-mono text-sm mb-4">
                🎉 Welcome! Here is your full AI Prompt Engineering course.
              </p>
              {/* === Actual premium content goes here === */}
              <div className="win95-recessed bg-black p-4">
                <pre className="text-neon-green font-mono text-xs terminal-glow whitespace-pre-wrap">
{`# Module 1: Prompt Fundamentals
# Module 2: Chain-of-Thought Techniques
# Module 3: Few-Shot & Zero-Shot Prompting
# Module 4: Agent Prompting Patterns
# ... (full content here)`}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="win95-shadow bg-retro-gray rounded-sm mb-8">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-4 py-2">
              <h2 className="text-lg font-bold text-white font-mono">
                🔒 Premium Content — Locked
              </h2>
            </div>
            <div className="p-6 bg-white">
              <p className="text-gray-600 font-mono text-sm">
                Purchase access above to unlock the full content.
              </p>
            </div>
          </div>
        )}

        {/* Escrow info */}
        <SolanaEscrowInfo contentType="Skill" price={SKILL.price} />

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            href="/skills"
            className="inline-block bg-retro-gray hover:bg-white text-black font-bold py-2 px-6 win95-shadow font-mono text-sm transition-colors"
          >
            ← Back to Skills
          </Link>
        </div>
      </div>
    </div>
  );
}
