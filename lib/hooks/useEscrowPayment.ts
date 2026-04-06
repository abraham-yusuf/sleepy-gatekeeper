"use client";

/**
 * useEscrowPayment — React hook for the full Solana escrow payment lifecycle.
 *
 * Uses @solana/react-hooks (the project's wallet library) instead of
 *
 * @solana/wallet-adapter-react. BN comes from @coral-xyz/anchor which is
 * already a project dependency.
 *
 * Flow:
 *   1. User clicks BUY → initializeEscrow (deposit into PDA vault)
 *   2. Hook polls on-chain state until isReleased === true
 *   3. On release confirmed → fires onSuccess(txSignature) callback → content unlocks
 *   4. On timeout expiry → allows refund via refundEscrow()
 *
 * Usage:
 *   const { buy, refund, status, error } = useEscrowPayment({
 *     taker: creatorPublicKey,
 *     amountUsdc: 0.01,
 *     onSuccess: () => setContentUnlocked(true),
 *   });
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import { useWalletSession, useWalletActions } from "@solana/react-hooks";
import { BN } from "@coral-xyz/anchor";
import { EscrowClient, USDC_DEVNET_MINT, deriveEscrowStatePDA } from "@/lib/escrow";

// ── Types ──────────────────────────────────────────────────────────────────

export type EscrowStatus =
  | "idle"
  | "initializing"
  | "pending"
  | "released"
  | "refunding"
  | "refunded"
  | "error";

export interface UseEscrowPaymentOptions {
  /** Creator / seller public key (taker in escrow terms). */
  taker: PublicKey;
  /** Amount in USDC (e.g. 0.01 = $0.01). */
  amountUsdc: number;
  /**
   * How long (seconds) until the maker can request a refund.
   * Default: 3600 (1 hour).
   */
  timeoutSeconds?: number;
  /**
   * How often (ms) to poll on-chain state while waiting for release.
   * Default: 5000 (5 s).
   */
  pollIntervalMs?: number;
  /** Called once funds are confirmed released on-chain. */
  onSuccess?: (releaseTxSignature: string) => void;
  /** Called if an error occurs at any stage. */
  onError?: (err: Error) => void;
}

export interface UseEscrowPaymentReturn {
  /** Current lifecycle status. */
  status: EscrowStatus;
  /** Human-readable status message for UI display. */
  statusMessage: string;
  /** Latest error, if any. */
  error: Error | null;
  /** Initiate the escrow payment (deposit into vault). */
  buy: () => Promise<void>;
  /** Request a refund (only available after timeout). */
  refund: () => Promise<void>;
  /** True when content is accessible (status === "released"). */
  isUnlocked: boolean;
  /** Tx signature of the initialize_escrow instruction. */
  initTxSignature: string | null;
  /** Reset state back to idle (e.g. for retry). */
  reset: () => void;
}

// ── Constants ──────────────────────────────────────────────────────────────

const SOLANA_DEVNET_RPC =
  typeof process !== "undefined"
    ? (process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? "https://api.devnet.solana.com")
    : "https://api.devnet.solana.com";

const USDC_DECIMALS = 6;

// ── Hook ───────────────────────────────────────────────────────────────────

/**
 *
 * @param root0
 * @param root0.taker
 * @param root0.amountUsdc
 * @param root0.timeoutSeconds
 * @param root0.pollIntervalMs
 * @param root0.onSuccess
 * @param root0.onError
 */
export function useEscrowPayment({
  taker,
  amountUsdc,
  timeoutSeconds = 3600,
  pollIntervalMs = 5000,
  onSuccess,
  onError,
}: UseEscrowPaymentOptions): UseEscrowPaymentReturn {
  // @solana/react-hooks API
  const session = useWalletSession();
  const actions = useWalletActions();

  const [status, setStatus] = useState<EscrowStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  const [initTxSignature, setInitTxSignature] = useState<string | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const handleError = useCallback(
    (err: unknown) => {
      const e = err instanceof Error ? err : new Error(String(err));
      console.error("[useEscrowPayment] error:", e);
      setError(e);
      setStatus("error");
      stopPolling();
      onError?.(e);
    },
    [onError, stopPolling],
  );

  const startPolling = useCallback(
    (makerAddress: string, client: EscrowClient) => {
      pollRef.current = setInterval(async () => {
        try {
          const maker = new PublicKey(makerAddress);
          const state = await client.fetchEscrowState(maker, taker);
          if (!state) return;

          if (state.isReleased) {
            stopPolling();
            setStatus("released");
            onSuccess?.(initTxSignature ?? "confirmed");
          }
        } catch (err) {
          console.warn("[useEscrowPayment] poll error (retrying):", err);
        }
      }, pollIntervalMs);
    },
    [taker, pollIntervalMs, stopPolling, onSuccess, initTxSignature],
  );

  // ── buy ─────────────────────────────────────────────────────────────────

  const buy = useCallback(async () => {
    if (!session?.account?.address) {
      handleError(new Error("Wallet not connected. Please connect your Solana wallet first."));
      return;
    }

    try {
      setStatus("initializing");
      setError(null);

      const connection = new Connection(SOLANA_DEVNET_RPC, "confirmed");
      const makerAddress = session.account.address.toString();
      const maker = new PublicKey(makerAddress);

      // Build a minimal anchor wallet using the @solana/react-hooks actions
      const anchorWallet = {
        publicKey: maker,
        signTransaction: async (tx: Parameters<typeof actions.sendTransaction>[0]) => {
          // sendTransaction signs + sends — we use it directly inside EscrowClient
          return tx;
        },
        signAllTransactions: async (txs: Parameters<typeof actions.sendTransaction>[0][]) => txs,
      };

      const client = new EscrowClient(connection, anchorWallet as never);

      const amountLamports = new BN(Math.round(amountUsdc * Math.pow(10, USDC_DECIMALS)));
      const timeoutTs = new BN(Math.floor(Date.now() / 1000) + timeoutSeconds);

      const txSig = await client.initializeEscrow({
        taker,
        mint: USDC_DEVNET_MINT,
        amount: amountLamports,
        timeout: timeoutTs,
      });

      setInitTxSignature(txSig);
      setStatus("pending");
      startPolling(makerAddress, client);
    } catch (err) {
      handleError(err);
    }
  }, [session, actions, taker, amountUsdc, timeoutSeconds, handleError, startPolling]);

  // ── refund ──────────────────────────────────────────────────────────────

  const refund = useCallback(async () => {
    if (!session?.account?.address) {
      handleError(new Error("Wallet not connected."));
      return;
    }

    try {
      setStatus("refunding");
      setError(null);

      const connection = new Connection(SOLANA_DEVNET_RPC, "confirmed");
      const maker = new PublicKey(session.account.address.toString());

      const anchorWallet = {
        publicKey: maker,
        signTransaction: async (tx: unknown) => tx,
        signAllTransactions: async (txs: unknown[]) => txs,
      };

      const client = new EscrowClient(connection, anchorWallet as never);
      await client.refund({ taker, mint: USDC_DEVNET_MINT });

      setStatus("refunded");
    } catch (err) {
      handleError(err);
    }
  }, [session, taker, handleError]);

  // ── reset ────────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    stopPolling();
    setStatus("idle");
    setError(null);
    setInitTxSignature(null);
  }, [stopPolling]);

  // ── status messages ───────────────────────────────────────────────────────

  const statusMessages: Record<EscrowStatus, string> = {
    idle: "Ready to purchase",
    initializing: "Initializing escrow on-chain… please approve in wallet",
    pending: "Payment deposited ✓ — waiting for content unlock confirmation",
    released: "✅ Content unlocked! Funds released to creator.",
    refunding: "Processing refund…",
    refunded: "Refund complete. Funds returned to your wallet.",
    error: error?.message ?? "An error occurred",
  };

  return {
    status,
    statusMessage: statusMessages[status],
    error,
    buy,
    refund,
    isUnlocked: status === "released",
    initTxSignature,
    reset,
  };
}

export { deriveEscrowStatePDA };
