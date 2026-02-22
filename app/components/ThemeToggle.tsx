"use client";

import { useState } from "react";
import { useWalletContext } from "../context/WalletContext";

export function ThemeToggle() {
  const { desktop } = useWalletContext();
  const [showMenu, setShowMenu] = useState(false);

  const themes = [
    { id: "dark" as const, label: "Dark Mode", icon: "dark_mode" },
    { id: "light" as const, label: "Light Mode", icon: "light_mode" },
    { id: "sleepy" as const, label: "Sleepy Mode", icon: "bedtime" },
  ];

  const currentTheme = themes.find((t) => t.id === desktop.theme) ?? themes[0];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="h-full px-2 flex items-center gap-1 bg-retro-gray win95-shadow hover:bg-white transition-colors"
        title={`Theme: ${currentTheme.label}`}
      >
        <span className="material-symbols-outlined text-[14px] text-black">{currentTheme.icon}</span>
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-[999]" onClick={() => setShowMenu(false)} />
          <div className="absolute bottom-full right-0 mb-1 w-40 win95-shadow bg-retro-gray border-2 border-gray-700 z-[1000]">
            <div className="px-3 py-1.5 border-b border-gray-600 bg-primary text-white">
              <div className="text-[10px] font-bold uppercase tracking-wider">Theme</div>
            </div>
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  desktop.setTheme(theme.id);
                  setShowMenu(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-bold transition-colors flex items-center gap-2 ${
                  desktop.theme === theme.id
                    ? "bg-primary text-white"
                    : "text-black hover:bg-primary hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{theme.icon}</span>
                {theme.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
