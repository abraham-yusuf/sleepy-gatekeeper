"use client";

/**
 * EscrowPayButton — Drop-in BUY button with full escrow lifecycle UI.
 *
 * Replaces static "BUY" links on content pages with an interactive button
 * that drives the complete init → pending → unlock flow and renders
 * appropriate feedback at each stage.
 *
 * Usage:
 *   <EscrowPayButton
 *     creatorAddress="YOUR_CREATOR_PUBKEY"
 *     priceUsdc={0.01}
 *     contentLabel="Web3 Future Article"
 *     onUnlock={() => setShowContent(true)}
 *   />
 */

import { useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEscrowPayment, EscrowStatus } from "@/lib/hooks/useEscrowPayment";

// ── Types ──────────────────────────────────────────────────────────────────

interface EscrowPayButtonProps {
  /**
   * Base-58 Solana public key of the content creator (escrow taker).
   * Falls back to NEXT_PUBLIC_SVM_ADDRESS env var if omitted.
   */
  creatorAddress?: string;
  /** Price in USDC (e.g. 0.01 = $0.01). */
  priceUsdc: number;
  /** Human-readable label shown in confirmation dialogs. */
  contentLabel: string;
  /**
   * Called once the escrow is confirmed released on-chain.
   * Use this to reveal protected content / unlock UI.
   */
  onUnlock?: () => void;
  /** Optional extra CSS classes for the button wrapper. */
  className?: string;
  /**
   * Timeout in seconds before the maker can request a refund.
   * Default: 3600 (1 h).
   */
  timeoutSeconds?: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function statusBadgeColor(status: EscrowStatus): string {
  switch (status) {
    case "released":
      return "bg-neon-green text-black";
    case "error":
    case "refunded":
      return "bg-red-500 text-white";
    case "pending":
      return "bg-yellow-400 text-black";
    default:
      return "bg-[#000080] text-white";
  }
}

function explorerUrl(txSig: string): string {
  return `https://explorer.solana.com/tx/${txSig}?cluster=devnet`;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function EscrowPayButton({
  creatorAddress,
  priceUsdc,
  contentLabel,
  onUnlock,
  className = "",
  timeoutSeconds = 3600,
}: EscrowPayButtonProps) {
  const { publicKey: walletPublicKey } = useWallet();
  const [showDetails, setShowDetails] = useState(false);

  // Resolve taker public key
  const takerPubkey = useMemo(() => {
    const addr =
      creatorAddress ?? process.env.NEXT_PUBLIC_SVM_ADDRESS ?? "";
    try {
      return new PublicKey(addr);
    } catch {
      console.error("[EscrowPayButton] invalid creator address:", addr);
      return null;
    }
  }, [creatorAddress]);

  const {
    status,
    statusMessage,
    error,
    buy,
    refund,
    isUnlocked,
    initTxSignature,
    reset,
  } = useEscrowPayment({
    taker: takerPubkey ?? PublicKey.default,
    amountUsdc: priceUsdc,
    timeoutSeconds,
    onSuccess: () => onUnlock?.(),
    onError: (e) => console.error("[EscrowPayButton] payment error:", e),
  });

  // ── Guard: wallet not connected ─────────────────────────────────────────
  if (!walletPublicKey) {
    return (
      <div className={`win95-shadow bg-retro-gray p-4 font-mono text-sm ${className}`}>
        <p className="text-black mb-2">
          🔒 Connect your Solana wallet to purchase &ldquo;{contentLabel}&rdquo;
        </p>
        <p className="text-gray-600 text-xs">
          ${priceUsdc.toFixed(2)} USDC via Anchor escrow
        </p>
      </div>
    );
  }

  // ── Guard: invalid creator address ──────────────────────────────────────
  if (!takerPubkey) {
    return (
      <div className="win95-shadow bg-red-100 p-4 font-mono text-sm text-red-700">
        ⚠️ Invalid creator address. Cannot process payment.
      </div>
    );
  }

  // ── Unlocked state ──────────────────────────────────────────────────────
  if (isUnlocked) {
    return (
      <div className={`win95-shadow bg-retro-gray p-4 font-mono ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✅</span>
          <span className="font-bold text-black">Content Unlocked!</span>
        </div>
        <p className="text-gray-700 text-xs mb-3">
          Payment confirmed on-chain. Enjoy &ldquo;{contentLabel}&rdquo;.
        </p>
        {initTxSignature && (
          <a
            href={explorerUrl(initTxSignature)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#000080] underline text-xs font-mono hover:text-blue-700"
          >
            View on Solana Explorer ↗
          </a>
        )}
      </div>
    );
  }

  // ── Pending state ───────────────────────────────────────────────────────
  if (status === "pending") {
    return (
      <div className={`win95-shadow bg-retro-gray p-4 font-mono ${className}`}>
        {/* Title bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#6a0dad] px-3 py-1 mb-3 -mx-4 -mt-4">
          <span className="text-white text-xs font-bold">
            ⏳ Escrow Pending
          </span>
        </div>

        <div className="flex items-start gap-3">
          {/* Spinner */}
          <div className="mt-1 h-4 w-4 border-2 border-[#000080] border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <div>
            <p className="text-black text-sm font-bold mb-1">
              Waiting for content unlock…
            </p>
            <p className="text-gray-600 text-xs mb-3">
              Your ${priceUsdc.toFixed(2)} USDC is held in the PDA vault.
              The creator will release it once access is confirmed.
            </p>

            {initTxSignature && (
              <div className="win95-recessed bg-black p-2 mb-3">
                <p className="text-neon-green font-mono text-xs terminal-glow">
                  Init tx: {initTxSignature.slice(0, 20)}…
                </p>
                <a
                  href={explorerUrl(initTxSignature)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 underline text-xs hover:text-yellow-100"
                >
                  View on Explorer ↗
                </a>
              </div>
            )}

            <p className="text-gray-500 text-xs">
              ℹ️ Refund available after {Math.round(timeoutSeconds / 3600)} hour(s)
              if release is not confirmed.
            </p>
          </div>
        </div>

        {/* Refund button (always shown when pending so user knows it exists) */}
        <button
          onClick={refund}
          className="mt-4 text-xs text-gray-500 underline hover:text-gray-800 font-mono"
        >
          Request refund (available after timeout)
        </button>
      </div>
    );
  }

  // ── Refunded state ──────────────────────────────────────────────────────
  if (status === "refunded") {
    return (
      <div className={`win95-shadow bg-retro-gray p-4 font-mono ${className}`}>
        <p className="text-black font-bold mb-1">💸 Refund Complete</p>
        <p className="text-gray-700 text-xs mb-3">
          ${priceUsdc.toFixed(2)} USDC returned to your wallet.
        </p>
        <button
          onClick={reset}
          className="win95-shadow bg-retro-gray text-black text-xs px-3 py-1 font-mono hover:bg-white transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────
  if (status === "error") {
    return (
      <div className={`win95-shadow bg-retro-gray p-4 font-mono ${className}`}>
        <div className="bg-red-600 px-3 py-1 mb-3 -mx-4 -mt-4">
          <span className="text-white text-xs font-bold">❌ Payment Error</span>
        </div>
        <p className="text-red-700 text-sm font-bold mb-1">Payment failed</p>
        <p className="text-gray-700 text-xs mb-3 break-all">
          {error?.message}
        </p>
        <button
          onClick={reset}
          className="win95-shadow bg-retro-gray text-black text-xs px-3 py-1 font-mono hover:bg-white transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Idle / initializing state ───────────────────────────────────────────
  const isInitializing = status === "initializing";

  return (
    <div className={`win95-shadow bg-retro-gray font-mono ${className}`}>
      {/* Title bar */}
      <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-1 flex items-center justify-between">
        <span className="text-white text-xs font-bold">
          🔐 Escrow Payment
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 ${statusBadgeColor(status)}`}>
          {isInitializing ? "Processing…" : `$${priceUsdc.toFixed(2)} USDC`}
        </span>
      </div>

      <div className="p-4">
        <p className="text-black text-sm mb-1 font-bold">{contentLabel}</p>
        <p className="text-gray-600 text-xs mb-4">
          Trustless payment via Solana Anchor escrow. Funds held in PDA vault
          until content delivery is confirmed.
        </p>

        {/* Main BUY button */}
        <button
          onClick={buy}
          disabled={isInitializing}
          className="w-full bg-gradient-to-r from-[#000080] to-[#6a0dad] text-white font-bold py-2 px-4 
                     win95-shadow font-mono text-sm transition-all
                     hover:from-[#1084d0] hover:to-[#9b30d0]
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {isInitializing ? (
            <>
              <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Approving in wallet…
            </>
          ) : (
            <>
              🔓 BUY — ${priceUsdc.toFixed(2)} USDC
            </>
          )}
        </button>

        {/* Status message */}
        {isInitializing && (
          <p className="text-gray-600 text-xs mt-2 text-center animate-pulse">
            {statusMessage}
          </p>
        )}

        {/* Toggle details */}
        <button
          onClick={() => setShowDetails((v) => !v)}
          className="mt-3 text-xs text-gray-500 underline hover:text-gray-800 w-full text-center"
        >
          {showDetails ? "Hide" : "Show"} escrow details
        </button>

        {showDetails && (
          <div className="mt-3 win95-recessed bg-black p-3">
            <pre className="text-neon-green font-mono text-xs terminal-glow whitespace-pre-wrap overflow-x-auto">
{`Program: 62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU
Amount:  ${priceUsdc.toFixed(2)} USDC (${Math.round(priceUsdc * 1_000_000)} base units)
Timeout: ${Math.round(timeoutSeconds / 3600)}h from init
Network: Solana Devnet`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
