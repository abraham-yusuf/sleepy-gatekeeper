/**
 * lib/mpp.ts — Machine Payment Protocol (MPP) challenge-response flow.
 *
 * This module provides an executable hackathon-grade flow:
 * 1) request challenge
 * 2) sign/submit payment settlement
 * 3) verify receipt for protected endpoints
 */

export interface MPPChallenge {
  id: string;
  app: string;
  message: string;
  mint: string;
  amount: string;
  payer: string;
  payee: string;
  createdAt: number;
  expiresAt: number;
}

export interface MPPReceipt {
  /** Transaction signature/hash from settlement tx. */
  txSignature: string;
  /** Token mint address/symbol used for settlement. */
  mint: string;
  /** Human-readable amount for hackathon demo (e.g. "0.05"). */
  amount: string;
  /** Public key / account that paid the transaction. */
  payer: string;
  /** Public key / account that received the transaction. */
  payee: string;
  /** Settlement timestamp in epoch milliseconds. */
  timestamp: number;
}

export interface MPPReceiptRecord {
  receiptId: string;
  challengeId: string;
  app: string;
  receipt: MPPReceipt;
}

interface ChallengeRequestInput {
  app: string;
  payer: string;
  payee: string;
  mint: string;
  amount: string;
  ttlMs?: number;
}

interface SettleChallengeInput {
  challengeId: string;
  txSignature: string;
  payer: string;
}

interface VerifyReceiptInput {
  receiptId?: string | null;
  txSignature?: string | null;
  app?: string;
}

const DEFAULT_TTL_MS = 5 * 60 * 1000;

const challenges = new Map<string, MPPChallenge>();
const receiptsById = new Map<string, MPPReceiptRecord>();
const receiptIdByTxSignature = new Map<string, string>();

const id = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

/**
 * Create an expiring payment challenge for a specific app call.
 *
 * @param input - Challenge metadata and participant fields.
 * @returns Generated challenge object for signing/payment intent.
 */
export function createChallenge(input: ChallengeRequestInput): MPPChallenge {
  const now = Date.now();
  const challenge: MPPChallenge = {
    id: id("mppc"),
    app: input.app,
    payer: input.payer,
    payee: input.payee,
    mint: input.mint,
    amount: input.amount,
    createdAt: now,
    expiresAt: now + (input.ttlMs ?? DEFAULT_TTL_MS),
    message: [
      "MPP CHALLENGE",
      `app=${input.app}`,
      `payer=${input.payer}`,
      `payee=${input.payee}`,
      `mint=${input.mint}`,
      `amount=${input.amount}`,
      `ts=${now}`,
    ].join("|"),
  };

  challenges.set(challenge.id, challenge);
  return challenge;
}

/**
 * Settle a valid challenge and produce a structured payment receipt.
 *
 * @param input - Settlement payload including tx signature and payer.
 * @returns Persisted receipt record bound to challenge/app.
 */
export function settleChallenge(input: SettleChallengeInput): MPPReceiptRecord {
  const challenge = challenges.get(input.challengeId);

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  if (Date.now() > challenge.expiresAt) {
    challenges.delete(input.challengeId);
    throw new Error("Challenge expired");
  }

  if (challenge.payer !== input.payer) {
    throw new Error("Payer does not match challenge");
  }

  const receiptRecord: MPPReceiptRecord = {
    receiptId: id("mppr"),
    challengeId: challenge.id,
    app: challenge.app,
    receipt: {
      txSignature: input.txSignature,
      mint: challenge.mint,
      amount: challenge.amount,
      payer: challenge.payer,
      payee: challenge.payee,
      timestamp: Date.now(),
    },
  };

  receiptsById.set(receiptRecord.receiptId, receiptRecord);
  receiptIdByTxSignature.set(receiptRecord.receipt.txSignature, receiptRecord.receiptId);

  // One-time challenge.
  challenges.delete(input.challengeId);

  return receiptRecord;
}

/**
 * Verify a receipt by id or tx signature, optionally scoped to an app.
 *
 * @param input - Verification lookup parameters.
 * @returns Receipt record when valid; otherwise null.
 */
export function verifyReceipt(input: VerifyReceiptInput): MPPReceiptRecord | null {
  let receiptId = input.receiptId ?? null;

  if (!receiptId && input.txSignature) {
    receiptId = receiptIdByTxSignature.get(input.txSignature) ?? null;
  }

  if (!receiptId) {
    return null;
  }

  const record = receiptsById.get(receiptId) ?? null;

  if (!record) {
    return null;
  }

  if (input.app && record.app !== input.app) {
    return null;
  }

  return record;
}
