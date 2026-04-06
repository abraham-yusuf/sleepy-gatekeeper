"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DesktopIcon,
  Taskbar,
  StartMenu,
  TerminalScreen,
  Settings,
  HelpDocs,
  WalletConnectModal,
  NetworkSwitcher,
  DraggableWindow,
  ThemeToggle,
  LiveClock,
  ConnectWallet,
  SandboxManager,
} from "./components";
import { useWalletContext } from "./context/WalletContext";

// Desktop icon definitions
const DESKTOP_ICONS = [
  { id: "agents-hub", icon: "smart_toy", label: "Agents Hub", color: "text-neon-green" },
  { id: "marketplace", icon: "storefront", label: "Marketplace", color: "text-primary" },
  { id: "file-explorer", icon: "folder_open", label: "File Explorer", color: "text-[#ffcc00]" },
  { id: "terminal", icon: "terminal", label: "Terminal", color: "text-neon-green" },
  { id: "settings", icon: "settings", label: "Settings", color: "text-retro-gray" },
  { id: "articles", icon: "article", label: "Articles", color: "text-[#1084d0]" },
  { id: "podcasts", icon: "podcasts", label: "Podcasts", color: "text-[#ff6b6b]" },
  { id: "videos", icon: "videocam", label: "Videos", color: "text-[#ff9f43]" },
  { id: "skills", icon: "school", label: "Skills", color: "text-primary" },
  { id: "help", icon: "help_center", label: "Help Docs", color: "text-[#1084d0]" },
  { id: "sandbox", icon: "deployed_code", label: "Sandbox Manager", color: "text-neon-green" },
] as const;

type AgentTaskStatus = "created" | "running" | "settled" | "completed" | "failed";

interface AgentTaskLog {
  at: string;
  status: AgentTaskStatus;
  message: string;
}

interface AgentTaskView {
  taskId: string;
  agentId: string;
  task: string;
  status: AgentTaskStatus;
  createdAt: string;
  updatedAt: string;
  payment: {
    amount: string;
    network: "x402";
    settled: boolean;
  };
  result?: Record<string, unknown>;
  error?: string;
  logs: AgentTaskLog[];
}

export default function Home() {
  const { wallet, desktop } = useWalletContext();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [taskPrompt, setTaskPrompt] = useState("Run status diagnostics");
  const [activeTask, setActiveTask] = useState<AgentTaskView | null>(null);
  const [agentRuntimeError, setAgentRuntimeError] = useState<string | null>(null);
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const router = useRouter();

  const pollTaskStatus = useCallback(async (taskId: string) => {
    const res = await fetch(`/api/agent-task/${taskId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Polling failed (${res.status})`);
    }

    const data = (await res.json()) as AgentTaskView;
    setActiveTask(data);
    return data;
  }, []);

  const handleSpawnAgentTask = useCallback(async () => {
    setIsSubmittingTask(true);
    setAgentRuntimeError(null);

    try {
      const response = await fetch("/api/os/agent-task", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-payment-mode": "x402",
          "x-payment-signature": `ui-sig-${Date.now()}`,
          "x-payment-amount": "$0.05",
        },
        body: JSON.stringify({
          agentId: "agents-hub-ui",
          task: taskPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task (${response.status})`);
      }

      const data = (await response.json()) as AgentTaskView;
      setActiveTask(data);
    } catch (error) {
      setAgentRuntimeError(error instanceof Error ? error.message : "Unknown task error");
    } finally {
      setIsSubmittingTask(false);
    }
  }, [taskPrompt]);

  useEffect(() => {
    if (!activeTask?.taskId) return;
    if (activeTask.status === "completed" || activeTask.status === "failed") return;

    const intervalId = setInterval(() => {
      void pollTaskStatus(activeTask.taskId).catch(error => {
        setAgentRuntimeError(error instanceof Error ? error.message : "Polling error");
      });
    }, 1200);

    return () => clearInterval(intervalId);
  }, [activeTask?.status, activeTask?.taskId, pollTaskStatus]);

  // Start menu items
  const startMenuItems = [
    {
      icon: <span className="material-symbols-outlined text-[18px]">smart_toy</span>,
      label: "Agents Hub",
      onClick: () => {
        desktop.openWindow("agents-hub");
        setShowStartMenu(false);
      },
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">storefront</span>,
      label: "Marketplace",
      onClick: () => {
        desktop.openWindow("marketplace");
        setShowStartMenu(false);
      },
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">group</span>,
      label: "separator",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">article</span>,
      label: "Articles",
      href: "/articles",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">podcasts</span>,
      label: "Podcasts",
      href: "/podcasts",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">videocam</span>,
      label: "Videos",
      href: "/videos",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">school</span>,
      label: "Skills",
      href: "/skills",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">group</span>,
      label: "separator",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">terminal</span>,
      label: "Terminal",
      onClick: () => {
        desktop.openWindow("terminal");
        setShowStartMenu(false);
      },
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">settings</span>,
      label: "Settings",
      onClick: () => {
        desktop.openWindow("settings");
        setShowStartMenu(false);
      },
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">help_center</span>,
      label: "Help Docs",
      onClick: () => {
        desktop.openWindow("help");
        setShowStartMenu(false);
      },
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">deployed_code</span>,
      label: "Sandbox Manager",
      onClick: () => {
        desktop.openWindow("sandbox");
        setShowStartMenu(false);
      },
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">group</span>,
      label: "separator",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">monitoring</span>,
      label: "Trade on Pump.fun",
      href: "https://pump.fun/coin/AbhQN2jaGj3n5aoATZvmfSXv9w1N7wMSQxESNu5D3ySD",
    },
    {
      icon: <span className="material-symbols-outlined text-[18px]">bolt</span>,
      label: "Buy on Clanker",
      href: "https://www.clanker.world/clanker/0x9a60AcE96a5D7223B423D460aBcb5cA49Ee80b07",
    },
  ];

  // Taskbar buttons - reflect open windows
  const taskbarButtons = desktop.openWindows.map(winId => {
    const iconDef = DESKTOP_ICONS.find(i => i.id === winId);
    return {
      icon: (
        <span className="material-symbols-outlined text-[16px] text-black">
          {iconDef?.icon ?? "window"}
        </span>
      ),
      label: iconDef?.label ?? winId,
      active: true,
      onClick: () => desktop.closeWindow(winId),
    };
  });

  // Handle desktop icon click
  const handleIconClick = (id: string) => {
    // Navigation icons go to routes
    const routeMap: Record<string, string> = {
      articles: "/articles",
      podcasts: "/podcasts",
      videos: "/videos",
      skills: "/skills",
    };
    if (routeMap[id]) {
      router.push(routeMap[id]);
      return;
    }
    desktop.openWindow(id);
  };

  // Theme classes
  const themeClass =
    desktop.theme === "light"
      ? "bg-[#008080]"
      : desktop.theme === "sleepy"
        ? "sleepy-desktop"
        : "grid-bg";

  return (
    <div className={`relative min-h-screen w-full text-white pb-10 ${themeClass}`}>
      {/* CRT Overlay */}
      <div className="crt-overlay"></div>

      {/* Sleepy-themed gradient background animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {desktop.theme === "sleepy" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0520] via-[#0f0a2a] to-[#050215] opacity-90" />
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse" />
            <div
              className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-[120px] animate-pulse"
              style={{ animationDelay: "2s", animationDuration: "4s" }}
            />
          </>
        )}
        {desktop.theme === "dark" && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[200px]" />
        )}
      </div>

      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-6 pt-8">
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 max-w-5xl">
          {DESKTOP_ICONS.map(icon => (
            <DesktopIcon
              key={icon.id}
              icon={
                <span
                  className={`material-symbols-outlined text-4xl ${icon.color} group-hover:scale-110 transition-transform`}
                >
                  {icon.icon}
                </span>
              }
              label={icon.label}
              onClick={() => handleIconClick(icon.id)}
              selected={desktop.isWindowOpen(icon.id)}
            />
          ))}
        </div>
      </div>

      {/* Window Manager Area */}
      <div className="relative z-20" style={{ minHeight: "calc(100vh - 200px)" }}>
        {/* Agents Hub Window */}
        {desktop.isWindowOpen("agents-hub") && (
          <DraggableWindow
            id="agents-hub"
            title="Agents Hub"
            icon={<span className="material-symbols-outlined text-sm">smart_toy</span>}
            onClose={() => desktop.closeWindow("agents-hub")}
            defaultSize={{ width: 600, height: 450 }}
          >
            <div className="bg-retro-gray p-4">
              <div className="bg-white win95-recessed p-4 min-h-[300px]">
                <h3 className="text-lg font-bold text-black mb-4">🤖 Agents Hub</h3>
                <p className="text-sm text-black/70 mb-4">
                  Spawn agent → execute task → settle payment → show result.
                </p>

                <div className="space-y-3">
                  <div className="p-3 border border-gray-300 bg-gray-50 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-primary">
                        add_circle
                      </span>
                      <div>
                        <div className="text-sm font-bold text-black">Spawn New Agent Task</div>
                        <div className="text-xs text-black/60">
                          Creates task and starts realtime status polling
                        </div>
                      </div>
                    </div>

                    <input
                      value={taskPrompt}
                      onChange={e => setTaskPrompt(e.target.value)}
                      className="w-full border border-gray-400 px-2 py-1 text-xs text-black font-mono bg-white"
                      placeholder="Describe task for the agent..."
                    />

                    <button
                      onClick={() => void handleSpawnAgentTask()}
                      disabled={isSubmittingTask}
                      className="px-3 py-1 text-xs font-bold bg-primary text-white border border-black disabled:opacity-50"
                    >
                      {isSubmittingTask ? "SPAWNING..." : "SPAWN + EXECUTE"}
                    </button>
                  </div>

                  {agentRuntimeError && (
                    <div className="text-xs text-red-700 bg-red-100 border border-red-300 px-2 py-2 font-mono">
                      Runtime error: {agentRuntimeError}
                    </div>
                  )}

                  {!activeTask && (
                    <div className="text-xs text-black/40 text-center py-6 font-mono">
                      No task yet. Spawn one to view created → running → settled → completed flow.
                    </div>
                  )}

                  {activeTask && (
                    <div className="p-3 border border-gray-400 bg-white text-black space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-mono">Task: {activeTask.taskId}</div>
                        <div className="text-xs font-bold uppercase">
                          Status: {activeTask.status}
                        </div>
                      </div>
                      <div className="text-xs font-mono">Agent: {activeTask.agentId}</div>
                      <div className="text-xs font-mono">
                        Prompt: {activeTask.task || "(empty task)"}
                      </div>
                      <div className="text-xs font-mono">
                        Payment: {activeTask.payment.amount} via {activeTask.payment.network} ·{" "}
                        {activeTask.payment.settled ? "settled" : "pending"}
                      </div>

                      {activeTask.result && (
                        <pre className="text-[10px] bg-gray-100 border border-gray-300 p-2 overflow-x-auto">
                          {JSON.stringify(activeTask.result, null, 2)}
                        </pre>
                      )}

                      {activeTask.error && (
                        <div className="text-xs text-red-700 bg-red-100 border border-red-300 p-2">
                          Error: {activeTask.error}
                        </div>
                      )}

                      <div className="text-[10px] font-mono max-h-28 overflow-y-auto border border-gray-300 bg-gray-50 p-2 space-y-1">
                        {activeTask.logs.map(log => (
                          <div key={`${log.at}-${log.message}`}>
                            [{new Date(log.at).toLocaleTimeString()}] {log.status}: {log.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DraggableWindow>
        )}

        {/* Marketplace Window */}
        {desktop.isWindowOpen("marketplace") && (
          <DraggableWindow
            id="marketplace"
            title="Skills Marketplace"
            icon={<span className="material-symbols-outlined text-sm">storefront</span>}
            onClose={() => desktop.closeWindow("marketplace")}
            defaultSize={{ width: 650, height: 500 }}
          >
            <div className="bg-retro-gray p-4">
              <div className="bg-white win95-recessed p-4 min-h-[350px]">
                <h3 className="text-lg font-bold text-black mb-4">🛒 Skills Marketplace</h3>
                <p className="text-sm text-black/70 mb-4">
                  Browse, buy and sell AI skills with escrow-backed payments.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "AI Prompt Mastery", price: "$0.05", icon: "psychology" },
                    { name: "Web3 Dev Kit", price: "$0.10", icon: "code" },
                    { name: "Blockchain Security", price: "$0.08", icon: "security" },
                  ].map(skill => (
                    <div key={skill.name} className="p-3 border border-gray-300 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">{skill.icon}</span>
                        <span className="text-sm font-bold text-black">{skill.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-black/60 font-mono">{skill.price} USDC</span>
                        <button className="px-2 py-1 text-[10px] font-bold bg-primary text-white win95-shadow hover:bg-primary/80">
                          BUY
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DraggableWindow>
        )}

        {/* File Explorer Window */}
        {desktop.isWindowOpen("file-explorer") && (
          <DraggableWindow
            id="file-explorer"
            title="File Explorer - On-Chain Assets"
            icon={<span className="material-symbols-outlined text-sm">folder_open</span>}
            onClose={() => desktop.closeWindow("file-explorer")}
            defaultSize={{ width: 550, height: 400 }}
          >
            <div className="bg-retro-gray p-1">
              {/* Menu bar */}
              <div className="flex gap-4 px-2 py-1 bg-retro-gray border-b border-gray-400 text-xs text-black">
                <span className="hover:bg-primary hover:text-white px-1 cursor-pointer">File</span>
                <span className="hover:bg-primary hover:text-white px-1 cursor-pointer">Edit</span>
                <span className="hover:bg-primary hover:text-white px-1 cursor-pointer">View</span>
              </div>
              {/* Address bar */}
              <div className="flex items-center gap-2 px-2 py-1 bg-retro-gray border-b border-gray-400">
                <span className="text-xs text-black font-bold">Address:</span>
                <div className="flex-1 win95-recessed bg-white px-2 py-0.5 text-xs text-black font-mono">
                  {wallet.isConnected
                    ? `/${wallet.walletNetwork}/${wallet.address?.slice(0, 12)}...`
                    : "/guest"}
                </div>
              </div>
              {/* File list */}
              <div className="bg-white win95-recessed p-2 min-h-[280px]">
                {wallet.isConnected ? (
                  <div className="space-y-1">
                    {[
                      { icon: "folder", name: "My Assets", type: "Folder" },
                      { icon: "folder", name: "Agent Configs", type: "Folder" },
                      { icon: "description", name: "wallet_backup.json", type: "JSON" },
                      { icon: "image", name: "avatar.png", type: "Image" },
                    ].map(file => (
                      <div
                        key={file.name}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-primary hover:text-white text-black cursor-pointer text-xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">{file.icon}</span>
                        <span className="flex-1 font-mono">{file.name}</span>
                        <span className="text-black/40">{file.type}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-xs text-black/40 font-mono">
                    Connect wallet to browse on-chain assets
                  </div>
                )}
              </div>
            </div>
          </DraggableWindow>
        )}

        {/* Terminal Window */}
        {desktop.isWindowOpen("terminal") && (
          <DraggableWindow
            id="terminal"
            title="Terminal - Sleepy Gatekeeper"
            icon={<span className="material-symbols-outlined text-sm">terminal</span>}
            onClose={() => desktop.closeWindow("terminal")}
            defaultSize={{ width: 650, height: 420 }}
          >
            <TerminalScreen />
          </DraggableWindow>
        )}

        {/* Settings Window */}
        {desktop.isWindowOpen("settings") && (
          <DraggableWindow
            id="settings"
            title="Settings"
            icon={<span className="material-symbols-outlined text-sm">settings</span>}
            onClose={() => desktop.closeWindow("settings")}
            defaultSize={{ width: 700, height: 500 }}
          >
            <Settings />
          </DraggableWindow>
        )}

        {/* Help Docs Window */}
        {desktop.isWindowOpen("help") && (
          <DraggableWindow
            id="help"
            title="Help Docs"
            icon={<span className="material-symbols-outlined text-sm">help_center</span>}
            onClose={() => desktop.closeWindow("help")}
            defaultSize={{ width: 600, height: 450 }}
          >
            <HelpDocs />
          </DraggableWindow>
        )}

        {/* Sandbox Manager Window */}
        {desktop.isWindowOpen("sandbox") && (
          <DraggableWindow
            id="sandbox"
            title="Sandbox Manager"
            icon={<span className="material-symbols-outlined text-sm">deployed_code</span>}
            onClose={() => desktop.closeWindow("sandbox")}
            defaultSize={{ width: 720, height: 520 }}
          >
            <SandboxManager />
          </DraggableWindow>
        )}
      </div>

      {/* Mandatory Wallet Connect Modal */}
      <WalletConnectModal />

      {/* Start Menu */}
      <StartMenu items={startMenuItems} show={showStartMenu} />

      {/* Enhanced Taskbar */}
      <Taskbar
        buttons={taskbarButtons}
        showStartMenu={showStartMenu}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
      >
        <div className="h-full flex items-center gap-1 py-0.5">
          {/* Username Display */}
          {wallet.isConnected && wallet.username && (
            <div className="h-full px-2 win95-recessed flex items-center gap-1.5 bg-retro-gray/30">
              <span className="material-symbols-outlined text-[12px] text-black">person</span>
              <span className="text-[10px] text-black font-bold font-mono truncate max-w-[120px]">
                {wallet.username}
              </span>
            </div>
          )}

          {/* Network Switcher */}
          <NetworkSwitcher />

          {/* Quick Agent Spawn Button */}
          {wallet.isConnected && (
            <button
              onClick={() => desktop.openWindow("agents-hub")}
              className="h-full px-2 flex items-center gap-1 bg-retro-gray win95-shadow hover:bg-white transition-colors"
              title="Spawn Agent"
            >
              <span className="material-symbols-outlined text-[14px] text-neon-green">
                smart_toy
              </span>
            </button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Connect Wallet (in taskbar) */}
          <ConnectWallet />

          {/* System Tray */}
          <div className="h-full px-2 win95-recessed flex items-center gap-2 bg-retro-gray/30">
            <div className="flex items-center gap-1.5">
              <div
                className={`size-1.5 rounded-full ${wallet.isConnected ? "bg-neon-green shadow-[0_0_4px_#39ff14]" : "bg-red-500"}`}
              />
              <LiveClock />
            </div>
          </div>
        </div>
      </Taskbar>
    </div>
  );
}
