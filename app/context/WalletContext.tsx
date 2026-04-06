"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useWalletConnection } from "@solana/react-hooks";

type WalletNetwork = "solana" | "evm" | null;
type ThemeMode = "dark" | "light" | "sleepy";

interface SessionProof {
  token: string;
  proof: {
    network: Exclude<WalletNetwork, null>;
    address: string;
    challengeId: string;
    message: string;
    issuedAt: number;
    expiresAt: number;
  };
}

interface WalletState {
  isConnected: boolean;
  walletNetwork: WalletNetwork;
  address: string | null;
  username: string | null;
  chainLabel: string;
  authToken: string | null;
  isAuthenticating: boolean;
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

function saveSession(session: SessionProof | null) {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function loadSession(): SessionProof | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as SessionProof;
    if (!parsed.token || !parsed.proof) return null;
    if (Date.now() > parsed.proof.expiresAt) return null;

    return parsed;
  } catch {
    return null;
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

async function createChallenge(network: Exclude<WalletNetwork, null>, address: string) {
  const res = await fetch("/api/auth/challenge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ network, address }),
  });

  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? "Failed to request challenge");
  }

  return (await res.json()) as {
    challengeId: string;
    message: string;
    expiresAt: number;
  };
}

async function verifyChallenge(params: {
  challengeId: string;
  network: Exclude<WalletNetwork, null>;
  address: string;
  signature: string;
}) {
  const res = await fetch("/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? "Failed to verify challenge");
  }

  return (await res.json()) as SessionProof;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // EVM state
  const { address: evmAddress, isConnected: evmConnected, chain } = useAccount();
  const { disconnect: evmDisconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  // Solana state
  const solanaWallet = useWalletConnection();

  // Derived state
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [sessionProof, setSessionProof] = useState<SessionProof | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setThemeState(loadTheme());
    setOpenWindows(loadWindows());
    setSessionProof(loadSession());
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
    ? (chain?.name ?? "EVM")
    : solanaConnected
      ? "Solana Devnet"
      : "Not Connected";

  // Session/challenge authentication after connect.
  useEffect(() => {
    if (!hydrated) return;

    if (!walletNetwork || !address) {
      setSessionProof(null);
      saveSession(null);
      return;
    }

    const proof = sessionProof?.proof;
    const normalizedAddress = walletNetwork === "evm" ? address.toLowerCase() : address;
    const currentProofAddress =
      proof && proof.network === "evm" ? proof.address.toLowerCase() : proof?.address;

    const matchesCurrentWallet =
      proof?.network === walletNetwork &&
      currentProofAddress === normalizedAddress &&
      Date.now() < proof.expiresAt;

    if (matchesCurrentWallet || isAuthenticating) {
      return;
    }

    const authenticate = async () => {
      try {
        setIsAuthenticating(true);

        const challenge = await createChallenge(walletNetwork, address);

        let signature: string;
        if (walletNetwork === "evm") {
          if (!evmAddress) throw new Error("Missing EVM address for signature");
          signature = await signMessageAsync({
            account: evmAddress as `0x${string}`,
            message: challenge.message,
          });
        } else {
          const signMessage = solanaWallet.wallet?.signMessage;

          if (!signMessage) {
            throw new Error("Connected Solana wallet does not support message signing");
          }

          const payload = await signMessage(new TextEncoder().encode(challenge.message));
          signature = btoa(String.fromCharCode(...payload));
        }

        const verified = await verifyChallenge({
          challengeId: challenge.challengeId,
          network: walletNetwork,
          address,
          signature,
        });

        setSessionProof(verified);
        saveSession(verified);
      } catch (error) {
        console.error("Wallet auth verification failed:", error);
        setSessionProof(null);
        saveSession(null);
      } finally {
        setIsAuthenticating(false);
      }
    };

    void authenticate();
  }, [
    hydrated,
    walletNetwork,
    address,
    sessionProof,
    isAuthenticating,
    signMessageAsync,
    solanaWallet.wallet,
    evmAddress,
  ]);

  // Disconnect handler
  const disconnect = useCallback(() => {
    if (evmConnected) evmDisconnect();
    if (solanaConnected) solanaWallet.disconnect();
    setSessionProof(null);
    saveSession(null);
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
    setOpenWindows(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      if (typeof window !== "undefined") localStorage.setItem(WINDOWS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows(prev => {
      const next = prev.filter(w => w !== id);
      if (typeof window !== "undefined") localStorage.setItem(WINDOWS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isWindowOpen = useCallback((id: string) => openWindows.includes(id), [openWindows]);

  const value: WalletContextType = {
    wallet: {
      isConnected,
      walletNetwork,
      address,
      username,
      chainLabel,
      authToken: sessionProof?.token ?? null,
      isAuthenticating,
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
