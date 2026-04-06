/**
 * lib/m2m-payment.ts — Machine-to-Machine (M2M) x402 Payment Stub
 *
 * Enables autonomous AI agents to make x402 micropayments programmatically
 * without a human wallet interaction. This is the backbone of the agent
 * economy described in the Sleepy Gatekeeper PRD.
 *
 * Phase 1: Stub implementation with documented interfaces.
 * Phase 2: Full ElizaOS integration with on-chain signing.
 *
 * Usage (agent calling an OS app endpoint):
 *   const client = new M2MPaymentClient({ agentId: "my-agent", budget: 0.10 });
 *   const result = await client.callProtectedEndpoint("/api/os/agent-task", {
 *     method: "POST",
 *     body: { task: "analyze market data" },
 *   });
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface M2MClientOptions {
  /** Unique agent identifier (used for spend tracking). */
  agentId: string;
  /**
   * Max USDC budget this agent is allowed to spend per session.
   * Default: 1.00 USDC.
   */
  budget?: number;
  /**
   * Max USDC to spend on a single request.
   * Default: 0.10 USDC.
   */
  maxPerRequest?: number;
  /** Base URL for the OS API. Defaults to process.env.NEXT_PUBLIC_APP_URL. */
  baseUrl?: string;
  /**
   * Payment network preference.
   * Default: "solana" (faster, cheaper for micropayments).
   */
  network?: "evm" | "solana";
}

export interface M2MRequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  /** Override price for this specific request. */
  priceOverride?: number;
}

export interface M2MPaymentResult {
  success: boolean;
  data?: unknown;
  error?: string;
  /** Amount paid in USDC. */
  amountPaid: number;
  /** x402 payment receipt / tx signature. */
  paymentReceipt?: string;
  /** Remaining agent budget. */
  budgetRemaining: number;
  note?: string;
}

export interface AgentSpendRecord {
  agentId: string;
  totalSpent: number;
  budget: number;
  transactions: Array<{
    endpoint: string;
    amount: number;
    timestamp: number;
    receipt?: string;
  }>;
}

// ── In-memory spend tracker (replace with on-chain in Phase 2) ────────────

const spendRegistry = new Map<string, AgentSpendRecord>();

/**
 * Get or initialize spend record for an agent.
 *
 * @param agentId - Agent identifier
 * @param budget - Budget ceiling in USDC
 * @returns Agent spend record
 */
function getSpendRecord(agentId: string, budget: number): AgentSpendRecord {
  if (!spendRegistry.has(agentId)) {
    spendRegistry.set(agentId, {
      agentId,
      totalSpent: 0,
      budget,
      transactions: [],
    });
  }
  return spendRegistry.get(agentId)!;
}

// ── M2M Payment Client ────────────────────────────────────────────────────

/**
 * M2MPaymentClient — allows AI agents to call x402-protected OS endpoints.
 *
 * Phase 1 (current): Simulates payment flow with full audit trail.
 * Phase 2: Integrates with ElizaOS wallet for real on-chain signing.
 */
export class M2MPaymentClient {
  private agentId: string;
  private budget: number;
  private maxPerRequest: number;
  private baseUrl: string;
  private network: "evm" | "solana";

  /**
   * Create a new M2M payment client for an agent.
   *
   * @param options - Client configuration options
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
  }

  /**
   * Call a payment-protected OS endpoint.
   * Checks budget, simulates x402 payment, returns result.
   *
   * @param endpoint - API endpoint path, e.g. "/api/os/agent-task"
   * @param options - Request options
   * @returns Payment result with response data
   */
  async callProtectedEndpoint(
    endpoint: string,
    options: M2MRequestOptions = {},
  ): Promise<M2MPaymentResult> {
    const record = getSpendRecord(this.agentId, this.budget);
    const price = options.priceOverride ?? this.estimatePrice(endpoint);

    // Budget checks
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

    // Phase 1: Stub — in Phase 2 this attaches a real x402 Payment header
    const receipt = this.generateStubReceipt(endpoint, price);

    // Record the spend
    record.totalSpent += price;
    record.transactions.push({
      endpoint,
      amount: price,
      timestamp: Date.now(),
      receipt,
    });

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const fetchOptions: RequestInit = {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          // Phase 2: replace this with a real x402 Payment header signed by
          // the agent's wallet. Format: "X-PAYMENT: <base64-encoded-payment>"
          "X-M2M-Agent-Id": this.agentId,
          "X-M2M-Payment-Stub": receipt,
          "X-M2M-Network": this.network,
        },
      };

      if (options.body && options.method === "POST") {
        fetchOptions.body = JSON.stringify(options.body);
      }

      // In Phase 1 we call the endpoint directly (no real x402 payment)
      // In Phase 2: attach signed Payment header → facilitator verifies
      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      return {
        success: response.ok,
        data,
        amountPaid: price,
        paymentReceipt: receipt,
        budgetRemaining: record.budget - record.totalSpent,
        note: "Phase 1 stub: payment simulated. Phase 2 will sign via ElizaOS wallet.",
      };
    } catch (err) {
      // Refund on network error
      record.totalSpent -= price;
      record.transactions.pop();

      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
        amountPaid: 0,
        budgetRemaining: record.budget - record.totalSpent,
      };
    }
  }

  /**
   * Get current spend summary for this agent.
   *
   * @returns Agent spend record
   */
  getSpendSummary(): AgentSpendRecord {
    return getSpendRecord(this.agentId, this.budget);
  }

  /**
   * Estimate price for an endpoint based on osAppRoutes config.
   *
   * @param endpoint - API endpoint path
   * @returns Estimated price in USDC
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

  /**
   * Generate a deterministic stub receipt for audit trail.
   *
   * @param endpoint - Target endpoint
   * @param price - Payment amount
   * @returns Stub receipt string
   */
  private generateStubReceipt(endpoint: string, price: number): string {
    const ts = Date.now();
    return `m2m_stub_${this.agentId}_${endpoint.replace(/\//g, "-")}_${price}_${ts}`;
  }
}

// ── Convenience helpers ───────────────────────────────────────────────────

/**
 * Create a pre-configured M2M client for a specific agent.
 *
 * @param agentId - Agent identifier
 * @param budget - USDC budget for this session
 * @returns Configured M2M payment client
 */
export function createAgentClient(agentId: string, budget = 1.0): M2MPaymentClient {
  return new M2MPaymentClient({ agentId, budget });
}

/**
 * Get spend summary for all active agents.
 *
 * @returns Map of agent IDs to their spend records
 */
export function getAllAgentSpends(): Map<string, AgentSpendRecord> {
  return new Map(spendRegistry);
}

/**
 * Reset spend tracking for an agent (e.g. new session).
 *
 * @param agentId - Agent identifier to reset
 */
export function resetAgentBudget(agentId: string): void {
  spendRegistry.delete(agentId);
}
