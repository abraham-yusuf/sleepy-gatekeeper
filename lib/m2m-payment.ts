/**
 * lib/m2m-payment.ts — Machine-to-Machine (M2M) payment client.
 *
 * Supports multiple payment proof strategies:
 * - mpp
 * - x402
 * - escrow
 */

import {
  type AgentSpendRecord,
  type PaymentMode,
  getAgentSpendRecord,
  getAllAgentSpendRecords,
  resetAgentSpendRecord,
  saveAgentSpendRecord,
} from "./payment-ledger";
import { buildProgramOwnedSignerProof } from "./agent-signer";

// ── Types ──────────────────────────────────────────────────────────────────

export interface M2MClientOptions {
  /** Unique agent identifier (used for spend tracking). */
  agentId: string;
  /** Max USDC budget this agent is allowed to spend per session. */
  budget?: number;
  /** Max USDC to spend on a single request. */
  maxPerRequest?: number;
  /** Base URL for the OS API. Defaults to process.env.NEXT_PUBLIC_APP_URL. */
  baseUrl?: string;
  /** Payment network preference. */
  network?: "evm" | "solana";
  /** Protocol payment mode for proof headers. */
  paymentMode?: PaymentMode;
}

export interface PaymentProofInput {
  // MPP
  receiptId?: string;
  txSignature?: string;

  // x402
  paymentSignature?: string;
  paymentAmount?: string;
  programSigner?: string;
  programSignerTimestamp?: string;
  programSignerNonce?: string;
  programSignerProof?: string;

  // Escrow
  escrowTxSignature?: string;
  escrowState?: string;
}

export interface M2MRequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  /** Override price for this specific request. */
  priceOverride?: number;
  /** Payment proof used to build protocol headers. */
  paymentProof?: PaymentProofInput;
}

export interface M2MPaymentResult {
  success: boolean;
  data?: unknown;
  error?: string;
  amountPaid: number;
  paymentReceipt?: string;
  budgetRemaining: number;
  note?: string;
}

interface PaymentStrategy {
  mode: PaymentMode;
  buildHeaders: (proof?: PaymentProofInput) => Record<string, string>;
  toReceiptRef: (proof?: PaymentProofInput) => string | undefined;
}

const STRATEGIES: Record<PaymentMode, PaymentStrategy> = {
  mpp: {
    mode: "mpp",
    buildHeaders: proof => {
      const headers: Record<string, string> = { "x-payment-mode": "mpp" };
      if (proof?.receiptId) headers["x-mpp-receipt-id"] = proof.receiptId;
      if (proof?.txSignature) headers["x-mpp-tx-signature"] = proof.txSignature;
      return headers;
    },
    toReceiptRef: proof => proof?.receiptId ?? proof?.txSignature,
  },
  x402: {
    mode: "x402",
    buildHeaders: proof => {
      const headers: Record<string, string> = { "x-payment-mode": "x402" };
      if (proof?.paymentSignature) headers["x-payment-signature"] = proof.paymentSignature;
      if (proof?.paymentAmount) headers["x-payment-amount"] = proof.paymentAmount;
      if (proof?.programSigner) headers["x-program-signer"] = proof.programSigner;
      if (proof?.programSignerTimestamp)
        headers["x-program-signer-timestamp"] = proof.programSignerTimestamp;
      if (proof?.programSignerNonce) headers["x-program-signer-nonce"] = proof.programSignerNonce;
      if (proof?.programSignerProof) headers["x-program-signer-proof"] = proof.programSignerProof;
      return headers;
    },
    toReceiptRef: proof => proof?.paymentSignature,
  },
  escrow: {
    mode: "escrow",
    buildHeaders: proof => {
      const headers: Record<string, string> = { "x-payment-mode": "escrow" };
      if (proof?.escrowTxSignature) headers["x-escrow-tx-signature"] = proof.escrowTxSignature;
      if (proof?.escrowState) headers["x-escrow-state"] = proof.escrowState;
      return headers;
    },
    toReceiptRef: proof => proof?.escrowTxSignature,
  },
};

// ── M2M Payment Client ────────────────────────────────────────────────────

/**
 * Client for machine-to-machine protected API calls with protocol proof headers.
 */
export class M2MPaymentClient {
  private agentId: string;
  private budget: number;
  private maxPerRequest: number;
  private baseUrl: string;
  private network: "evm" | "solana";
  private paymentMode: PaymentMode;

  /**
   * Build an M2M payment client with selected payment proof mode.
   *
   * @param options - Runtime client options.
   */
  constructor(options: M2MClientOptions) {
    this.agentId = options.agentId;
    this.budget = options.budget ?? 1.0;
    this.maxPerRequest = options.maxPerRequest ?? 0.1;
    this.baseUrl =
      options.baseUrl ??
      (typeof process !== "undefined"
        ? (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
        : "http://localhost:3000");
    this.network = options.network ?? "solana";
    this.paymentMode = options.paymentMode ?? "mpp";
  }

  /**
   * Call a payment-protected endpoint with protocol payment headers.
   *
   * @param endpoint - API endpoint path.
   * @param options - Request payload and proof metadata.
   * @returns Structured result with spend accounting.
   */
  async callProtectedEndpoint(
    endpoint: string,
    options: M2MRequestOptions = {},
  ): Promise<M2MPaymentResult> {
    const record = await getAgentSpendRecord(this.agentId, this.budget);
    const price = options.priceOverride ?? this.estimatePrice(endpoint);

    if (record.totalSpent + price > record.budget) {
      return {
        success: false,
        error: `Budget exceeded. Spent: $${record.totalSpent.toFixed(3)}, Budget: $${record.budget.toFixed(2)}, Required: $${price.toFixed(3)}`,
        amountPaid: 0,
        budgetRemaining: record.budget - record.totalSpent,
      };
    }

    if (price > this.maxPerRequest) {
      return {
        success: false,
        error: `Request price $${price.toFixed(3)} exceeds max-per-request limit $${this.maxPerRequest.toFixed(2)}`,
        amountPaid: 0,
        budgetRemaining: record.budget - record.totalSpent,
      };
    }

    const strategy = STRATEGIES[this.paymentMode];
    const proofHeaders = strategy.buildHeaders(options.paymentProof);
    const receiptRef = strategy.toReceiptRef(options.paymentProof);

    record.totalSpent += price;
    record.transactions.push({
      endpoint,
      amount: price,
      timestamp: Date.now(),
      receipt: receiptRef,
      mode: strategy.mode,
    });
    await saveAgentSpendRecord(record);

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const fetchOptions: RequestInit = {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          "x-agent-id": this.agentId,
          "x-agent-network": this.network,
          ...proofHeaders,
        },
      };

      if (options.body && options.method === "POST") {
        fetchOptions.body = JSON.stringify(options.body);
      }

      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      return {
        success: response.ok,
        data,
        amountPaid: price,
        paymentReceipt: receiptRef,
        budgetRemaining: record.budget - record.totalSpent,
        note: `Payment mode '${strategy.mode}' with protocol proof headers.`,
      };
    } catch (err) {
      record.totalSpent -= price;
      record.transactions.pop();
      await saveAgentSpendRecord(record);

      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        amountPaid: 0,
        budgetRemaining: record.budget - record.totalSpent,
      };
    }
  }

  /**
   * Return current persistent spend summary for this agent.
   *
   * @returns Stored spend record from ledger backend.
   */
  async getSpendSummary(): Promise<AgentSpendRecord> {
    return getAgentSpendRecord(this.agentId, this.budget);
  }

  /**
   * Estimate endpoint price in USDC.
   *
   * @param endpoint - Target API endpoint.
   * @returns Estimated price.
   */
  private estimatePrice(endpoint: string): number {
    const PRICE_MAP: Record<string, number> = {
      "/api/os/agents-hub": 0.01,
      "/api/os/marketplace": 0.01,
      "/api/os/file-explorer": 0.005,
      "/api/os/terminal": 0.02,
      "/api/os/agent-task": 0.05,
    };
    const base = endpoint.split("?")[0];
    return PRICE_MAP[base] ?? 0.01;
  }
}

// ── Convenience helpers ───────────────────────────────────────────────────

/**
 * Create a pre-configured client for a single agent id.
 *
 * @param agentId - Agent identifier.
 * @param budget - Optional spend budget.
 * @returns Configured client.
 */
export function createAgentClient(agentId: string, budget = 1.0): M2MPaymentClient {
  return new M2MPaymentClient({ agentId, budget });
}

/**
 * Build x402 proof headers with a program-owned signer stub for agent release flows.
 *
 * @param params - Agent/app/amount context.
 * @param params.agentId - Agent identifier.
 * @param params.app - Target OS app.
 * @param params.amount - Settled payment amount string.
 * @param params.paymentSignature - x402 payment signature reference.
 * @returns Header-friendly payment proof input.
 */
export function buildProgramSignerPaymentProof(params: {
  agentId: string;
  app: string;
  amount: string;
  paymentSignature: string;
}): PaymentProofInput {
  const proof = buildProgramOwnedSignerProof({
    agentId: params.agentId,
    app: params.app,
    amount: params.amount,
  });

  return {
    paymentSignature: params.paymentSignature,
    paymentAmount: params.amount,
    programSigner: proof.signer,
    programSignerTimestamp: proof.timestamp,
    programSignerNonce: proof.nonce,
    programSignerProof: proof.signature,
  };
}

/**
 * Read all persistent spend records from ledger backend.
 *
 * @returns Mapping keyed by agent id.
 */
export async function getAllAgentSpends(): Promise<Record<string, AgentSpendRecord>> {
  return getAllAgentSpendRecords();
}

/**
 * Delete one agent spend record from the persistent ledger.
 *
 * @param agentId - Agent identifier to reset.
 */
export async function resetAgentBudget(agentId: string): Promise<void> {
  await resetAgentSpendRecord(agentId);
}
