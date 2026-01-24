"use client";

import { useState } from "react";
import {
  DesktopIcon,
  // Taskbar,
  StartMenu,
  PopupDialog,
  Win95Window,
  Terminal,
  ConnectWallet,
} from "./components";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [show402Popup, setShow402Popup] = useState(true);

  // Start menu items
  const startMenuItems = [
    {
      icon: <span className="material-symbols-outlined text-[18px]">description</span>,
      label: "Documentation",
      href: "#",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">monitoring</span>,
      label: "Trade on Dexscreener",
      href: "#",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">bolt</span>,
      label: "Buy on Jupiter",
      href: "#",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">group</span>,
      label: "separator",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">group</span>,
      label: "Socials",
      hasSubmenu: true,
    },
  ];

  // Taskbar buttons
  // const taskbarButtons = [
    {/*
      icon: <span className="material-symbols-outlined text-[16px] text-black">terminal</span>,
      label: "Terminal",
      active: true,
    }, 
    {
      icon: <span className="material-symbols-outlined text-[16px] text-black">toll</span>,
      label: "Toll_Booth",
      active: false,
    },
    {
      icon: <span className="material-symbols-outlined text-[16px] text-black">wallet</span>,
      label: "Wallet_Connect",
      active: false,
    */},
  ];

  return (
    <div className="relative flex flex-col min-h-screen w-full grid-bg text-white pb-12">
      {/* CRT Overlay */}
      <div className="crt-overlay"></div>

      {/* Desktop Icons */}
      {/* <div className="fixed top-20 left-6 z-40 flex flex-col gap-8"> */}
      {/* <DesktopIcon
          icon={<span className="material-symbols-outlined text-4xl text-retro-gray group-hover:text-white transition-colors">computer</span>}
          label="My Node"
        />
        <DesktopIcon
          icon={<span className="material-symbols-outlined text-4xl text-[#1084d0]">delete</span>}
          label="Burn Address"
          selected={true}
        />
        <DesktopIcon
          icon={<span className="material-symbols-outlined text-4xl text-neon-green group-hover:scale-110 transition-transform">table_chart</span>}
          label="Tokenomics.xls"
        />
        <DesktopIcon
          icon={<span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">help_center</span>}
          label="Whitepaper.hlp"
        />
      </div> */}

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 glass-panel px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1 rounded-sm win95-shadow">
              <svg
                className="size-6 text-white"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-mono italic">
              Gatekeeper v4.02
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-primary/80">
            <a className="hover:text-primary transition-colors" href="/articles">
              Blog
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terminal
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Vault
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ConnectWallet />
            <div
              className="size-8 rounded-full border border-primary/40 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjAaYGqI1a_g9Znfe8fiLE6ajN7-VD_XjFMcuuM8aAuIOL_0slkqvWspmzCdMaGO6wuILG6C8LjXEAN1pno6NsuzaWgh9TgO93ah8BulGos2HRGlI1GYlyuGHrgK0iwHQ7gxHWjRQMpKDJQ_1fnN8blxtBReVdzlIMKnBI1fm8AwyfsuHDEM0KKdwQ0M9yO0cTw6UBXgqLIqoC8-h1QFMOohm1S_NlMVZO83VdQidN-USyxPo4U0EBPzPapmad_xRyc6oAFqO-84M')",
              }}
            ></div>
          </div>
        </div>
      </header>

      {/* 402 Error Popup */}
      <PopupDialog
        show={show402Popup}
        title="Error 402"
        icon={<span className="material-symbols-outlined">warning</span>}
        onClose={() => setShow402Popup(false)}
        onRetry={() => {
          setShow402Popup(false);
          setIsUnlocked(true);
        }}
        onAbort={() => setShow402Popup(false)}
      >
        <div className="flex items-start gap-4">
          <div className="bg-[#ffff00] border-2 border-black rounded-sm p-1 flex items-center justify-center win95-shadow shrink-0">
            <span className="material-symbols-outlined text-black text-3xl font-bold">
              priority_high
            </span>
          </div>
          <div className="text-left space-y-1">
            <h4 className="font-bold text-black text-sm">
              System Error: Liquidity Overflow
            </h4>
            <p className="text-primary/70 text-xs font-mono">
              Error Code: 402 - Payment Required
            </p>
          </div>
        </div>
      </PopupDialog>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4 relative">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="relative space-y-8 max-w-3xl text-center">
          <div className="inline-block border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
            Status: Dormant _ Protocol: Active
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-none glitch-text tracking-tighter">
            402: PAYMENT REQUIRED
          </h1>
          <p className="text-lg md:text-xl text-primary/60 max-w-xl mx-auto font-mono">
            The internet&apos;s toll booth is finally open on Solana. Pay the
            Gatekeeper to proceed.
          </p>
          <div className="pt-6">
            <button className="bg-[#c0c0c0] text-black px-10 py-4 font-bold uppercase tracking-tighter win95-shadow win95-button-active flex items-center gap-3 mx-auto hover:bg-white transition-colors">
              <span className="material-symbols-outlined">power_settings_new</span>
              Wake Up the Gatekeeper
            </button>
          </div>
        </div>
      </section>

      {/* The Lore Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold uppercase italic tracking-tighter text-primary mb-12">
            The Lore
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Placeholder Image */}
            <div className="flex items-center justify-center">
              <div className="win95-shadow bg-retro-gray p-1 rounded-sm">
                <div className="bg-black aspect-video flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">💤</div>
                    <div className="font-pixel text-sm text-purple-400">
                      Sleepy Robot
                    </div>
                    <div className="font-pixel text-xs text-gray-500 mt-2">
                      Coming Soon
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] text-neon-green">
                    SYSTEM_MASCOT_01.EXE
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Terminal Window */}
            <Win95Window
              title="System Terminal - [User@Solana]"
              icon={<span className="material-symbols-outlined text-sm">terminal</span>}
            >
              <Terminal
                lines={[
                  {
                    prefix: ">",
                    text: "Initializing legacy protocol x402...",
                  },
                  {
                    prefix: ">",
                    text: "Dormant since 1997. Woken up by Base. Running on Solana for speed. The gatekeeper has seen the rise and fall of dial-up. Now it monitors the chain.",
                  },
                  {
                    prefix: ">",
                    text: "Warning: Payment required to access deep liquidity nodes.",
                  },
                ]}
              />
            </Win95Window>
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
          <h2 className="text-3xl font-bold uppercase italic tracking-tighter text-primary mb-12">
            Tokenomics.XLS
          </h2>

          {/* Retro Spreadsheet Style */}
          <div className="win95-shadow bg-retro-gray p-1 rounded-sm overflow-x-auto">
            <table className="w-full border-collapse bg-white text-black font-mono text-sm">
              <thead>
                <tr className="bg-retro-gray border-b border-black">
                  <th className="p-2 border-r border-black w-10"></th>
                  <th className="p-2 border-r border-black text-left">
                    PARAMETER
                  </th>
                  <th className="p-2 text-left">VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/10">
                  <td className="p-2 border-r border-black bg-retro-gray text-center font-bold">
                    1
                  </td>
                  <td className="p-2 border-r border-black">TOTAL_SUPPLY</td>
                  <td className="p-2 font-bold">402,000,000 $402</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="p-2 border-r border-black bg-retro-gray text-center font-bold">
                    2
                  </td>
                  <td className="p-2 border-r border-black">TICKER</td>
                  <td className="p-2 font-bold">$402</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="p-2 border-r border-black bg-retro-gray text-center font-bold">
                    3
                  </td>
                  <td className="p-2 border-r border-black">NETWORK</td>
                  <td className="p-2 font-bold text-primary">SOLANA</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="p-2 border-r border-black bg-retro-gray text-center font-bold">
                    4
                  </td>
                  <td className="p-2 border-r border-black">TAX_MODEL</td>
                  <td className="p-2 font-bold">0% / 0%</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="p-2 border-r border-black bg-retro-gray text-center font-bold">
                    5
                  </td>
                  <td className="p-2 border-r border-black">LP_STATUS</td>
                  <td className="p-2 font-bold text-neon-green">
                    BURNED_FOREVER
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-primary/20 py-12 px-6 glass-panel mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 text-primary font-mono text-sm">
              <a className="hover:underline" href="#">
                X.COM
              </a>
              <a className="hover:underline" href="#">
                TELEGRAM
              </a>
              <a className="hover:underline" href="#">
                DEXSCREENER
              </a>
            </div>
            <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em]">
              Powered by x402 Protocol. No refunds. v1.0.97
            </p>
          </div>
          <div className="bg-black/40 border border-primary/20 px-4 py-2 rounded font-mono text-[10px] text-primary/60">
            <div className="flex gap-4">
              <span>CPU: 402%</span>
              <span>MEM: 64MB</span>
              <span>LATENCY: 0.00ms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Start Menu */}
      <StartMenu items={startMenuItems} show={showStartMenu} />

      {/* Taskbar */}
      <Taskbar
        buttons={taskbarButtons}
        showStartMenu={showStartMenu}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
      >
        <div className="h-full px-2 win95-recessed flex items-center gap-3 bg-retro-gray/30">
          <div className="flex items-center gap-2">
            <a className="flex items-center justify-center" href="#">
              <svg
                className="size-4 text-[#000000]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a className="flex items-center justify-center" href="#">
              <svg
                className="size-4 text-[#000000]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"></path>
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 bg-neon-green rounded-full shadow-[0_0_4px_#39ff14]"></div>
            <span className="text-[10px] text-black font-bold font-mono">
              11:59 PM
            </span>
          </div>
        </div>
      </Taskbar>
    </div>
  );
}
