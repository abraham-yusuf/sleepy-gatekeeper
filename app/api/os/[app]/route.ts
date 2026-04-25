import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server, paywall, evmAddress, svmAddress, osAppRoutes } from "../../../../proxy";
import { verifyReceipt } from "../../../../lib/mpp";
import { createAgentTask } from "../../../../agents/runtime";
import {
  type CanonicalPaymentReceipt,
  type PaymentMode,
  upsertCanonicalReceipt,
} from "../../../../lib/payment-ledger";
import { verifyProgramOwnedSignerProof } from "../../../../lib/agent-signer";

// ── OS App definitions ────────────────────────────────────────────────────

const OS_APPS: Record<
  string,
  {
    price: string;
    description: string;
    handler: (req: NextRequest) => Promise<NextResponse>;
  }
> = {
  "agents-hub": {
    price: "$0.01",
    description: "OS App: Agents Hub — spawn & manage AI agents",
    handler: async (_: NextRequest) => {
      return NextResponse.json({
        app: "agents-hub",
        status: "active",
        agents: [],
        message: "Agents Hub is ready. Spawn your first autonomous agent.",
        capabilities: ["spawn", "monitor", "terminate", "fund"],
        escrowProgram:
          process.env.NEXT_PUBLIC_ESCROW_PROGRAM_ID ??
          "62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU",
      });
    },
  },
  marketplace: {
    price: "$0.01",
    description: "OS App: Marketplace — browse skills & services",
    handler: async (_: NextRequest) => {
      return NextResponse.json({
        app: "marketplace",
        status: "active",
        listings: [
          {
            id: "ai-prompt-mastery",
            title: "AI Prompt Engineering",
            price: "$0.05",
            type: "skill",
          },
          { id: "web3-development", title: "Web3 Dev Starter Kit", price: "$0.10", type: "skill" },
          {
            id: "blockchain-security",
            title: "Blockchain Security",
            price: "$0.08",
            type: "skill",
          },
        ],
        message: "Marketplace loaded. Browse and purchase skills via x402.",
      });
    },
  },
  "file-explorer": {
    price: "$0.005",
    description: "OS App: File Explorer — IPFS-backed file system",
    handler: async (req: NextRequest) => {
      const { searchParams } = new URL(req.url);
      const cid = searchParams.get("cid") ?? null;
      return NextResponse.json({
        app: "file-explorer",
        status: "active",
        cid,
        files: [],
        message: cid
          ? `File Explorer: fetching CID ${cid}`
          : "File Explorer ready. Connect IPFS to load your decentralized files.",
        ipfsGateway: "https://ipfs.io/ipfs/",
      });
    },
  },
  terminal: {
    price: "$0.02",
    description: "OS App: Terminal — execute agent commands",
    handler: async (req: NextRequest) => {
      let command = "";
      try {
        const body = (await req.json()) as { command?: string };
        command = body.command ?? "";
      } catch {
        command = "";
      }

      const ALLOWED_COMMANDS = ["help", "status", "agents", "wallet", "ipfs", "version"];
      const cmd = command.trim().toLowerCase().split(" ")[0];
      const isAllowed = ALLOWED_COMMANDS.includes(cmd);

      const output: Record<string, unknown> = {
        app: "terminal",
        command,
        allowed: isAllowed,
        output: isAllowed
          ? `[sleepy-gatekeeper] Executing: ${command}\n> OK`
          : `[sleepy-gatekeeper] Command '${cmd}' not in allowlist. Allowed: ${ALLOWED_COMMANDS.join(", ")}`,
      };

      if (cmd === "version") output.version = "0.1.0-alpha";
      if (cmd === "status")
        output.status = { escrow: "deployed", ipfs: "pending", agents: "pending" };

      return NextResponse.json(output);
    },
  },
  "agent-task": {
    price: "$0.05",
    description: "OS App: Agent Task — execute an autonomous task",
    handler: async (req: NextRequest) => {
      let task = "";
      let agentId = "";
      try {
        const body = (await req.json()) as { task?: string; agentId?: string };
        task = body.task ?? "";
        agentId = body.agentId ?? "default-agent";
      } catch {
        task = "";
        agentId = "default-agent";
      }

      const created = createAgentTask({
        task,
        agentId,
        paymentAmount: "$0.05",
      });

      return NextResponse.json({
        app: "agent-task",
        taskId: created.taskId,
        agentId: created.agentId,
        task: created.task,
        status: created.status,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
        payment: created.payment,
        logs: created.logs,
        message: "Task created. Runtime will process execution and settlement.",
      });
    },
  },
};

/**
 * Resolve OS app definition and execute its handler.
 *
 * @param req - Incoming request.
 * @param context - Dynamic route context.
 * @param context.params - Async params with app id.
 * @returns App JSON response.
 */
async function routeHandler(
  req: NextRequest,
  context: { params: Promise<{ app: string }> },
): Promise<NextResponse> {
  const { app } = await context.params;
  const appDef = OS_APPS[app];

  if (!appDef) {
    return NextResponse.json(
      { error: `OS app '${app}' not found`, available: Object.keys(OS_APPS) },
      { status: 404 },
    );
  }

  return appDef.handler(req);
}

/**
 * Build deterministic canonical receipt identifier.
 *
 * @param mode - Payment mode.
 * @param app - Target app id.
 * @param suffix - Unique proof suffix.
 * @returns Canonical receipt id string.
 */
function buildCanonicalId(mode: PaymentMode, app: string, suffix: string): string {
  return `${mode}:${app}:${suffix}`;
}

/**
 * Validate protocol payment proof from incoming request headers.
 *
 * @param req - Request carrying proof headers.
 * @param app - Target app identifier.
 * @returns Validation result and canonical receipt on success.
 */
async function validatePaymentProof(
  req: NextRequest,
  app: string,
): Promise<{ ok: true; receipt: CanonicalPaymentReceipt } | { ok: false }> {
  const mode = (req.headers.get("x-payment-mode") ?? "").toLowerCase() as PaymentMode | "";

  if (!mode || !["mpp", "x402", "escrow"].includes(mode)) {
    return { ok: false };
  }

  if (mode === "mpp") {
    const receiptId = req.headers.get("x-mpp-receipt-id");
    const txSignature = req.headers.get("x-mpp-tx-signature");
    const record = verifyReceipt({ receiptId, txSignature, app });

    if (!record) return { ok: false };

    const canonical: CanonicalPaymentReceipt = {
      id: buildCanonicalId(mode, app, record.receiptId),
      app,
      mode,
      amount: record.receipt.amount,
      payer: record.receipt.payer,
      payee: record.receipt.payee,
      proof: {
        receiptId: record.receiptId,
        txSignature: record.receipt.txSignature,
        challengeId: record.challengeId,
      },
      verifiedAt: Date.now(),
    };

    await upsertCanonicalReceipt(canonical);
    return { ok: true, receipt: canonical };
  }

  if (mode === "x402") {
    const signature = req.headers.get("x-payment-signature");
    const amount = req.headers.get("x-payment-amount");

    if (!signature || !amount) return { ok: false };

    const programSigner = req.headers.get("x-program-signer");
    const programSignerTimestamp = req.headers.get("x-program-signer-timestamp");
    const programSignerNonce = req.headers.get("x-program-signer-nonce");
    const programSignerProof = req.headers.get("x-program-signer-proof");
    const agentId = req.headers.get("x-agent-id") ?? "unknown-agent";

    const hasProgramSignerHeaders =
      !!programSigner && !!programSignerTimestamp && !!programSignerNonce && !!programSignerProof;

    if (app === "agent-task" && hasProgramSignerHeaders) {
      const verifiedSigner = verifyProgramOwnedSignerProof({
        signer: programSigner,
        agentId,
        app,
        amount,
        timestamp: programSignerTimestamp,
        nonce: programSignerNonce,
        signature: programSignerProof,
      });

      if (!verifiedSigner) return { ok: false };
    }

    const canonical: CanonicalPaymentReceipt = {
      id: buildCanonicalId(mode, app, signature),
      app,
      mode,
      amount,
      proof: {
        signature,
        ...(hasProgramSignerHeaders
          ? {
              programSigner,
              programSignerTimestamp,
              programSignerNonce,
              programSignerProof,
            }
          : {}),
      },
      verifiedAt: Date.now(),
    };

    await upsertCanonicalReceipt(canonical);
    return { ok: true, receipt: canonical };
  }

  const escrowTx = req.headers.get("x-escrow-tx-signature");
  const escrowState = req.headers.get("x-escrow-state");

  if (!escrowTx || !escrowState) return { ok: false };

  const canonical: CanonicalPaymentReceipt = {
    id: buildCanonicalId(mode, app, escrowTx),
    app,
    mode,
    amount: OS_APPS[app]?.price ?? "$0.01",
    proof: {
      escrowTx,
      escrowState,
    },
    verifiedAt: Date.now(),
  };

  await upsertCanonicalReceipt(canonical);
  return { ok: true, receipt: canonical };
}

/**
 * Merge canonical receipt into JSON response body and response headers.
 *
 * @param response - Original app response.
 * @param receipt - Canonical payment receipt.
 * @returns Response decorated with canonical receipt.
 */
async function withCanonicalReceipt(
  response: NextResponse,
  receipt: CanonicalPaymentReceipt,
): Promise<NextResponse> {
  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  const body =
    payload && typeof payload === "object"
      ? { ...(payload as Record<string, unknown>), paymentReceipt: receipt }
      : { paymentReceipt: receipt };

  const next = NextResponse.json(body, { status: response.status });
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "content-type") next.headers.set(key, value);
  });
  next.headers.set("x-payment-receipt-id", receipt.id);
  next.headers.set("x-payment-receipt-mode", receipt.mode);
  return next;
}

const paymentConfig = (app: string) => {
  const route = osAppRoutes[`/api/os/${app}` as keyof typeof osAppRoutes];
  if (!route) {
    return {
      accepts: [
        {
          scheme: "exact" as const,
          price: "$0.01",
          network: "eip155:84532" as const,
          payTo: evmAddress,
        },
        {
          scheme: "exact" as const,
          price: "$0.01",
          network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const,
          payTo: svmAddress,
        },
      ],
      description: `OS App: ${app}`,
      mimeType: "application/json",
      extensions: { ...declareDiscoveryExtension({}) },
    };
  }
  return route;
};

/**
 * GET /api/os/[app] with protocol-proof fast path and x402 fallback.
 *
 * @param req - Incoming request.
 * @param context - Route params context.
 * @param context.params - Async params with app id.
 * @returns Paid app response.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ app: string }> },
): Promise<NextResponse> {
  const { app } = await context.params;

  const verified = await validatePaymentProof(req, app);
  if (verified.ok) {
    const response = await routeHandler(req, context);
    return withCanonicalReceipt(response, verified.receipt);
  }

  const cfg = paymentConfig(app);
  const wrappedHandler = withX402(
    (r: NextRequest) => routeHandler(r, context),
    cfg,
    server,
    undefined,
    paywall,
  );

  return wrappedHandler(req);
}

/**
 * POST /api/os/[app] with protocol-proof fast path and x402 fallback.
 *
 * @param req - Incoming request.
 * @param context - Route params context.
 * @param context.params - Async params with app id.
 * @returns Paid app response.
 */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ app: string }> },
): Promise<NextResponse> {
  const { app } = await context.params;

  const verified = await validatePaymentProof(req, app);
  if (verified.ok) {
    const response = await routeHandler(req, context);
    return withCanonicalReceipt(response, verified.receipt);
  }

  const cfg = paymentConfig(app);
  const wrappedHandler = withX402(
    (r: NextRequest) => routeHandler(r, context),
    cfg,
    server,
    undefined,
    paywall,
  );

  const response = await wrappedHandler(req);
  response.headers.set("x-payment-primary", "protocol-proof");
  response.headers.set("x-payment-fallback", "x402");
  return response;
}
