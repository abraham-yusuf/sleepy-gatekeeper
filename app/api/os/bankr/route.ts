import { NextRequest, NextResponse } from "next/server";

type BankrExecutionStatus = "queued" | "running" | "confirmed" | "failed";

interface BankrExecutionRecord {
  executionId: string;
  walletAddress: string;
  intentId: string;
  fromToken: string;
  toToken: string;
  amount: string;
  route: "bankr-router-v1";
  status: BankrExecutionStatus;
  txHash?: string;
  createdAt: string;
  updatedAt: string;
}

const executionStore = new Map<string, BankrExecutionRecord>();

/**
 * Build execution ids for launcher status polling.
 *
 * @returns Randomized mock execution id.
 */
function createExecutionId(): string {
  return `bnk_exec_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Read one execution status or list all mock executions.
 *
 * @param req - Incoming request.
 * @returns JSON response with execution records.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const executionId = searchParams.get("executionId");

  if (!executionId) {
    return NextResponse.json(
      {
        ok: true,
        mode: "mock",
        flow: "execution-status",
        executions: [...executionStore.values()],
      },
      { status: 200 },
    );
  }

  const execution = executionStore.get(executionId);
  if (!execution) {
    return NextResponse.json(
      { ok: false, mode: "mock", flow: "execution-status", error: "Execution not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: "mock",
    flow: "execution-status",
    execution,
  });
}

/**
 * Run mock launcher flows for wallet connect, quote, and intent execution.
 *
 * @param req - Incoming request.
 * @returns JSON response with launcher flow payload.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json().catch(() => null)) as {
    flow?: "connect-wallet" | "quote-swap-intent" | "execute-intent";
    walletAddress?: string;
    fromToken?: string;
    toToken?: string;
    amount?: string;
    slippageBps?: number;
    intentId?: string;
  } | null;

  const flow = body?.flow;
  if (!flow) {
    return NextResponse.json(
      { ok: false, error: "Missing flow: connect-wallet | quote-swap-intent | execute-intent" },
      { status: 400 },
    );
  }

  if (flow === "connect-wallet") {
    if (!body.walletAddress) {
      return NextResponse.json({ ok: false, error: "Missing walletAddress" }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      mode: "mock",
      flow,
      walletSession: {
        walletAddress: body.walletAddress,
        provider: "bankr-wallet-kit",
        connectedAt: new Date().toISOString(),
        permissions: ["read_balance", "sign_swap_intent", "submit_transaction"],
      },
    });
  }

  if (flow === "quote-swap-intent") {
    if (!body.walletAddress || !body.fromToken || !body.toToken || !body.amount) {
      return NextResponse.json(
        { ok: false, error: "Missing walletAddress, fromToken, toToken, or amount" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      mode: "mock",
      flow,
      quote: {
        intentId: `intent_${Math.random().toString(36).slice(2, 10)}`,
        walletAddress: body.walletAddress,
        fromToken: body.fromToken,
        toToken: body.toToken,
        amountIn: body.amount,
        estimatedAmountOut: (Number(body.amount) * 0.985).toFixed(6),
        estimatedFeeUsd: "0.14",
        slippageBps: body.slippageBps ?? 50,
        expiresAt: new Date(Date.now() + 45_000).toISOString(),
      },
    });
  }

  if (!body.walletAddress || !body.intentId || !body.fromToken || !body.toToken || !body.amount) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing walletAddress, intentId, fromToken, toToken, or amount",
      },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const execution: BankrExecutionRecord = {
    executionId: createExecutionId(),
    walletAddress: body.walletAddress,
    intentId: body.intentId,
    fromToken: body.fromToken,
    toToken: body.toToken,
    amount: body.amount,
    route: "bankr-router-v1",
    status: "confirmed",
    txHash: `0xmock${Math.random().toString(16).slice(2, 18)}`,
    createdAt: now,
    updatedAt: now,
  };

  executionStore.set(execution.executionId, execution);

  return NextResponse.json({
    ok: true,
    mode: "mock",
    flow,
    execution,
  });
}
