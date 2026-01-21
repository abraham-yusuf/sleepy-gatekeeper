"use client";

import { Win95Window, Terminal } from "./index";

export function TerminalScreen() {
  const terminalLines = [
    { prefix: "$", text: "cat /sys/gatekeeper/status.log" },
    { prefix: ">", text: "=== GATEKEEPER SYSTEM LOG ===" },
    { prefix: ">", text: "Initializing legacy protocol x402..." },
    { prefix: ">", text: "Status: DORMANT since 1997-04-02" },
    { prefix: ">", text: "Waking signal detected from Base Network..." },
    { prefix: ">", text: "Migrating to Solana for performance..." },
    { prefix: ">", text: "Chain sync: 100% complete" },
    { prefix: ">", text: "Payment channels: ACTIVE", color: "green" as const },
    { prefix: ">", text: "Toll collection: ENABLED", color: "green" as const },
    { text: "" },
    { prefix: "$", text: "ls -la /protocols/" },
    { prefix: ">", text: "drwxr-xr-x  x402_protocol/" },
    { prefix: ">", text: "-rw-r--r--  whitepaper.pdf" },
    { prefix: ">", text: "-rw-r--r--  tokenomics.xls" },
    { prefix: ">", text: "-rwxr-xr-x  payment_gateway.exe" },
    { text: "" },
    { prefix: "$", text: "node /scripts/get-token-price.js" },
    {
      prefix: ">",
      text: "$402 Price: $0.00402 | 24h Change: +402%",
      color: "primary" as const,
    },
    { text: "" },
    { prefix: "$", text: "_" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a150a] via-[#102210] to-[#1a0a1a] flex items-center justify-center p-4">
      {/* CRT Overlay */}
      <div className="crt-overlay"></div>

      <Win95Window
        title="System Terminal - [User@Solana]"
        icon={<span className="material-symbols-outlined text-sm">terminal</span>}
        className="w-full max-w-4xl h-[80vh] relative z-10"
      >
        <Terminal lines={terminalLines} showCursor={true} className="min-h-full" />
      </Win95Window>
    </div>
  );
}
