"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWalletConnection } from "@solana/react-hooks";

type WalletNetwork = "solana" | "evm" | null;
type ThemeMode = "dark" | "light" | "sleepy";

interface WalletState {
  isConnected: boolean;
  walletNetwork: WalletNetwork;
  address: string | null;
  username: string | null;
  chainLabel: string;
  disconnect: () => void;
}

interface DesktopState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  openWindows: string[];
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  isWindowOpen: (id: string) => boolean;
}

interface WalletContextType {
  wallet: WalletState;
  desktop: DesktopState;
}

const WalletContext = createContext<WalletContextType | null>(null);

const SESSION_KEY = "sleepy-gatekeeper-session";
const THEME_KEY = "sleepy-gatekeeper-theme";
const WINDOWS_KEY = "sleepy-gatekeeper-windows";

function generateUsername(network: WalletNetwork, address: string): string {
  if (network === "evm") {
    return `evm@${address.slice(0, 6)}...${address.slice(-4)}`;
  }
  if (network === "solana") {
    return `svm@${address.slice(0, 4)}...${address.slice(-4)}`;
  }
  return "guest";
}

function saveSession(network: WalletNetwork, address: string | null) {
  if (typeof window === "undefined") return;
  if (network && address) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ network, address }));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function loadTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || "dark";
}

function loadWindows(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WINDOWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // EVM state
  const { address: evmAddress, isConnected: evmConnected, chain } = useAccount();
  const { disconnect: evmDisconnect } = useDisconnect();

  // Solana state
  const solanaWallet = useWalletConnection();

  // Derived state
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setThemeState(loadTheme());
    setOpenWindows(loadWindows());
    setHydrated(true);
  }, []);

  // Determine connected wallet
  const solanaConnected = solanaWallet.connected;
  const solanaAddress = solanaWallet.wallet?.account?.address ?? null;

  const isConnected = evmConnected || solanaConnected;
  const walletNetwork: WalletNetwork = evmConnected ? "evm" : solanaConnected ? "solana" : null;
  const address = evmConnected ? (evmAddress ?? null) : solanaAddress;
  const username = walletNetwork && address ? generateUsername(walletNetwork, address) : null;

  // Chain label
  const chainLabel = evmConnected
    ? chain?.name ?? "EVM"
    : solanaConnected
      ? "Solana Devnet"
      : "Not Connected";

  // Persist session when wallet connects/disconnects
  useEffect(() => {
    if (hydrated) {
      saveSession(walletNetwork, address);
    }
  }, [walletNetwork, address, hydrated]);

  // Disconnect handler
  const disconnect = useCallback(() => {
    if (evmConnected) evmDisconnect();
    if (solanaConnected) solanaWallet.disconnect();
    saveSession(null, null);
  }, [evmConnected, evmDisconnect, solanaConnected, solanaWallet]);

  // Theme
  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, t);
    }
  }, []);

  // Window management
  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      if (typeof window !== "undefined") localStorage.setItem(WINDOWS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      const next = prev.filter((w) => w !== id);
      if (typeof window !== "undefined") localStorage.setItem(WINDOWS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isWindowOpen = useCallback(
    (id: string) => openWindows.includes(id),
    [openWindows],
  );

  const value: WalletContextType = {
    wallet: {
      isConnected,
      walletNetwork,
      address,
      username,
      chainLabel,
      disconnect,
    },
    desktop: {
      theme,
      setTheme,
      openWindows,
      openWindow,
      closeWindow,
      isWindowOpen,
    },
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWalletContext must be used within WalletProvider");
  return ctx;
}
