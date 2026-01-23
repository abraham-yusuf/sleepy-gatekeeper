"use client";

import Link from "next/link";
import { DocumentTextIcon, MicrophoneIcon, VideoCameraIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useWalletConnection } from "@solana/react-hooks";
import { useAccount } from "wagmi";
import { ConnectWallet } from "../components/ConnectWallet";

export default function CreatorDashboard() {
  // Check wallet connection status
  const solanaWallet = useWalletConnection();
  const { isConnected: evmConnected } = useAccount();
  const isWalletConnected = solanaWallet.connected || evmConnected;

  // If wallet is not connected, show connect wallet screen
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-retro-gray font-pixel flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Win95-style Window */}
          <div className="win95-shadow bg-retro-gray border-2 border-gray-300">
            {/* Title Bar */}
            <div className="retro-title-gradient px-2 py-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-xs font-bold">Creator Dashboard - Access Required</span>
              </div>
              <div className="flex gap-1">
                <button className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-[8px] font-bold">_</button>
                <button className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-[8px] font-bold">□</button>
                <button className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-[8px] font-bold">×</button>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h2 className="text-sm text-black mb-2">Wallet Connection Required</h2>
                  <p className="text-[10px] text-black/80 leading-relaxed">
                    To create and manage articles, podcasts, and videos, you need to connect your wallet.
                  </p>
                </div>
              </div>

              <div className="win95-recessed bg-white p-4 space-y-3">
                <p className="text-[10px] text-black leading-relaxed">
                  <strong>Why connect a wallet?</strong>
                </p>
                <ul className="text-[10px] text-black/80 space-y-2 pl-4">
                  <li>• Publish pay-per-view content</li>
                  <li>• Earn crypto from your creations</li>
                  <li>• Manage your content on-chain</li>
                  <li>• Track your earnings in real-time</li>
                </ul>
              </div>

              <div className="flex flex-col items-center gap-4 pt-4">
                <p className="text-[10px] text-black/80">
                  Connect with Solana or EVM/Base wallet:
                </p>
                <ConnectWallet />
              </div>

              <div className="flex justify-center pt-4 border-t-2 border-gray-400">
                <Link
                  href="/"
                  className="win95-shadow bg-retro-gray px-6 py-2 text-[10px] font-bold text-black hover:bg-white transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wallet connected - show dashboard with Win95 styling
  return (
    <div className="min-h-screen bg-retro-gray font-pixel p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Window */}
        <div className="win95-shadow bg-retro-gray border-2 border-gray-300 mb-4">
          {/* Title Bar */}
          <div className="retro-title-gradient px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white text-xs font-bold">Creator Dashboard - X402 Protocol</span>
            </div>
            <div className="flex gap-1">
              <button className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-[8px] font-bold">_</button>
              <button className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-[8px] font-bold">□</button>
              <button className="w-4 h-4 bg-retro-gray win95-shadow flex items-center justify-center text-[8px] font-bold">×</button>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-4">
            <div className="mb-6">
              <h1 className="text-sm text-black mb-1">Creator Dashboard</h1>
              <p className="text-[10px] text-black/70">Manage your content and earnings with X402 Protocol</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
              <div className="win95-recessed bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] text-black/60 uppercase">Total Earnings</p>
                    <p className="text-xs font-bold text-black">$0.00</p>
                  </div>
                  <ChartBarIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="win95-recessed bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] text-black/60 uppercase">Articles</p>
                    <p className="text-xs font-bold text-black">0</p>
                  </div>
                  <DocumentTextIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="win95-recessed bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] text-black/60 uppercase">Podcasts</p>
                    <p className="text-xs font-bold text-black">0</p>
                  </div>
                  <MicrophoneIcon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="win95-recessed bg-white p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] text-black/60 uppercase">Videos</p>
                    <p className="text-xs font-bold text-black">0</p>
                  </div>
                  <VideoCameraIcon className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <h2 className="text-xs text-black mb-3">Create Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link
                  href="/creator/articles/new"
                  className="win95-shadow bg-retro-gray hover:bg-white transition-colors p-3 group border-2 border-gray-300"
                >
                  <DocumentTextIcon className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[10px] font-bold text-black mb-1">New Article</h3>
                  <p className="text-[8px] text-black/70">Write and publish pay-per-view articles</p>
                </Link>
                <Link
                  href="/creator/podcasts/new"
                  className="win95-shadow bg-retro-gray hover:bg-white transition-colors p-3 group border-2 border-gray-300"
                >
                  <MicrophoneIcon className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[10px] font-bold text-black mb-1">New Podcast</h3>
                  <p className="text-[8px] text-black/70">Upload and share audio content</p>
                </Link>
                <Link
                  href="/creator/videos/new"
                  className="win95-shadow bg-retro-gray hover:bg-white transition-colors p-3 group border-2 border-gray-300"
                >
                  <VideoCameraIcon className="h-8 w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[10px] font-bold text-black mb-1">New Video</h3>
                  <p className="text-[8px] text-black/70">Upload and monetize video content</p>
                </Link>
              </div>
            </div>

            {/* Content Management */}
            <div className="mb-4">
              <h2 className="text-xs text-black mb-3">Manage Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link
                  href="/creator/articles"
                  className="win95-shadow bg-retro-gray hover:bg-white transition-colors p-3 border-2 border-gray-300"
                >
                  <h3 className="text-[10px] font-bold text-black mb-1">My Articles</h3>
                  <p className="text-[8px] text-black/70">View and edit your articles</p>
                </Link>
                <Link
                  href="/creator/podcasts"
                  className="win95-shadow bg-retro-gray hover:bg-white transition-colors p-3 border-2 border-gray-300"
                >
                  <h3 className="text-[10px] font-bold text-black mb-1">My Podcasts</h3>
                  <p className="text-[8px] text-black/70">Manage your podcast episodes</p>
                </Link>
                <Link
                  href="/creator/videos"
                  className="win95-shadow bg-retro-gray hover:bg-white transition-colors p-3 border-2 border-gray-300"
                >
                  <h3 className="text-[10px] font-bold text-black mb-1">My Videos</h3>
                  <p className="text-[8px] text-black/70">Manage your video library</p>
                </Link>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center pt-4 border-t-2 border-gray-400">
              <Link
                href="/"
                className="win95-shadow bg-retro-gray px-6 py-2 text-[10px] font-bold text-black hover:bg-white transition-colors inline-block"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
