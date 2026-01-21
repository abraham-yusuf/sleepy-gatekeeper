"use client";

import { useState } from "react";
import {
  MediaPlayer,
  SwapAsset,
  TerminalScreen,
  HelpDocs,
  Settings,
  Screensaver,
} from "../components";

export default function ComponentShowcase() {
  const [activeComponent, setActiveComponent] = useState<string>("media-player");
  const [showScreensaver, setShowScreensaver] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a150a] via-[#102210] to-[#1a0a1a] p-8">
      {/* Screensaver */}
      {showScreensaver && (
        <Screensaver onExit={() => setShowScreensaver(false)} />
      )}

      {/* Component Selector */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Component Showcase
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveComponent("media-player")}
            className={`px-4 py-2 text-sm font-bold ${
              activeComponent === "media-player"
                ? "bg-primary text-white"
                : "bg-retro-gray text-black"
            } win95-shadow hover:bg-white transition-colors`}
          >
            Media Player
          </button>
          <button
            onClick={() => setActiveComponent("swap")}
            className={`px-4 py-2 text-sm font-bold ${
              activeComponent === "swap"
                ? "bg-primary text-white"
                : "bg-retro-gray text-black"
            } win95-shadow hover:bg-white transition-colors`}
          >
            Swap Asset
          </button>
          <button
            onClick={() => setActiveComponent("terminal")}
            className={`px-4 py-2 text-sm font-bold ${
              activeComponent === "terminal"
                ? "bg-primary text-white"
                : "bg-retro-gray text-black"
            } win95-shadow hover:bg-white transition-colors`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveComponent("help")}
            className={`px-4 py-2 text-sm font-bold ${
              activeComponent === "help"
                ? "bg-primary text-white"
                : "bg-retro-gray text-black"
            } win95-shadow hover:bg-white transition-colors`}
          >
            Help Docs
          </button>
          <button
            onClick={() => setActiveComponent("settings")}
            className={`px-4 py-2 text-sm font-bold ${
              activeComponent === "settings"
                ? "bg-primary text-white"
                : "bg-retro-gray text-black"
            } win95-shadow hover:bg-white transition-colors`}
          >
            Settings
          </button>
          <button
            onClick={() => setShowScreensaver(true)}
            className="px-4 py-2 text-sm font-bold bg-retro-gray text-black win95-shadow hover:bg-white transition-colors"
          >
            Screensaver
          </button>
        </div>
      </div>

      {/* Component Display */}
      <div className="max-w-7xl mx-auto flex justify-center">
        {activeComponent === "media-player" && (
          <MediaPlayer title="Retro Media Player" />
        )}
        {activeComponent === "swap" && <SwapAsset />}
        {activeComponent === "terminal" && <TerminalScreen />}
        {activeComponent === "help" && <HelpDocs />}
        {activeComponent === "settings" && <Settings />}
      </div>
    </div>
  );
}
