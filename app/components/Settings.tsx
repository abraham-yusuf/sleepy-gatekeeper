"use client";

import { useState } from "react";
import { Win95Window } from "./Win95Window";

interface SettingsProps {
  onSave?: (settings: Record<string, any>) => void;
}

export function Settings({ onSave }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    theme: "retro",
    notifications: true,
    sound: true,
    autoConnect: false,
    slippage: "0.5",
    rpcEndpoint: "https://api.mainnet-beta.solana.com",
  });

  const tabs = [
    { id: "general", icon: "settings", label: "General" },
    { id: "wallet", icon: "account_balance_wallet", label: "Wallet" },
    { id: "trading", icon: "trending_up", label: "Trading" },
    { id: "appearance", icon: "palette", label: "Appearance" },
  ];

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
  };

  return (
    <Win95Window
      title="Settings - Sleepy Gatekeeper"
      icon={<span className="material-symbols-outlined text-sm">settings</span>}
      className="w-full max-w-3xl"
    >
      <div className="bg-retro-gray">
        {/* Tabs */}
        <div className="flex border-b-2 border-gray-700 bg-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-retro-gray text-black border-t-2 border-l-2 border-r-2 border-gray-700"
                  : "text-black/60 hover:bg-gray-200"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 min-h-[400px]">
          {activeTab === "general" && (
            <>
              <h3 className="text-lg font-bold text-black mb-4">
                General Settings
              </h3>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-black">
                    Enable Notifications
                  </div>
                  <div className="text-xs text-black/60">
                    Receive alerts for transactions and updates
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    setSettings({ ...settings, notifications: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-black">Sound Effects</div>
                  <div className="text-xs text-black/60">
                    Play sounds for interactions
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.sound}
                  onChange={(e) =>
                    setSettings({ ...settings, sound: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </div>
            </>
          )}

          {activeTab === "wallet" && (
            <>
              <h3 className="text-lg font-bold text-black mb-4">
                Wallet Settings
              </h3>

              {/* Auto Connect */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-black">
                    Auto-Connect Wallet
                  </div>
                  <div className="text-xs text-black/60">
                    Automatically connect wallet on page load
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoConnect}
                  onChange={(e) =>
                    setSettings({ ...settings, autoConnect: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </div>

              {/* RPC Endpoint */}
              <div>
                <label className="text-sm font-bold text-black block mb-2">
                  RPC Endpoint
                </label>
                <input
                  type="text"
                  value={settings.rpcEndpoint}
                  onChange={(e) =>
                    setSettings({ ...settings, rpcEndpoint: e.target.value })
                  }
                  className="w-full win95-recessed bg-white p-2 text-black text-sm font-mono"
                />
              </div>
            </>
          )}

          {activeTab === "trading" && (
            <>
              <h3 className="text-lg font-bold text-black mb-4">
                Trading Settings
              </h3>

              {/* Slippage Tolerance */}
              <div>
                <label className="text-sm font-bold text-black block mb-2">
                  Slippage Tolerance (%)
                </label>
                <div className="flex gap-2">
                  {["0.1", "0.5", "1.0", "2.0"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSettings({ ...settings, slippage: value })}
                      className={`win95-shadow px-4 py-2 text-xs font-bold transition-colors ${
                        settings.slippage === value
                          ? "bg-primary text-white"
                          : "bg-retro-gray text-black hover:bg-white"
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    value={settings.slippage}
                    onChange={(e) =>
                      setSettings({ ...settings, slippage: e.target.value })
                    }
                    className="win95-recessed bg-white p-2 text-black text-xs font-mono w-20"
                    step="0.1"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "appearance" && (
            <>
              <h3 className="text-lg font-bold text-black mb-4">
                Appearance Settings
              </h3>

              {/* Theme */}
              <div>
                <label className="text-sm font-bold text-black block mb-2">
                  Theme
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSettings({ ...settings, theme: "retro" })}
                    className={`win95-shadow px-4 py-2 text-xs font-bold transition-colors ${
                      settings.theme === "retro"
                        ? "bg-primary text-white"
                        : "bg-retro-gray text-black hover:bg-white"
                    }`}
                  >
                    Retro (Win95)
                  </button>
                  <button
                    onClick={() => setSettings({ ...settings, theme: "modern" })}
                    className={`win95-shadow px-4 py-2 text-xs font-bold transition-colors ${
                      settings.theme === "modern"
                        ? "bg-primary text-white"
                        : "bg-retro-gray text-black hover:bg-white"
                    }`}
                  >
                    Modern
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-4 border-t-2 border-gray-700">
          <button className="win95-shadow bg-retro-gray px-6 py-2 text-xs font-bold text-black hover:bg-white transition-colors">
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="win95-shadow bg-primary px-6 py-2 text-xs font-bold text-white hover:bg-primary/80 transition-colors neon-glow-green"
          >
            SAVE SETTINGS
          </button>
        </div>
      </div>
    </Win95Window>
  );
}
