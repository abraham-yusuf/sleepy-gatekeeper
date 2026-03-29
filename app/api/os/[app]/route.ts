import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server, paywall, evmAddress, svmAddress, osAppRoutes } from "../../../../proxy";

// ── OS App definitions ────────────────────────────────────────────────────

/**
 * OS App metadata registry.
 * Maps app IDs to their handlers and payment configs.
 */
const OS_APPS: Record<string, {
  price: string;
  description: string;
  handler: (req: NextRequest) => Promise<NextResponse>;
}> = {
  "agents-hub": {
    price: "$0.01",
    description: "OS App: Agents Hub — spawn & manage AI agents",
    handler: async (_req: NextRequest) => {
      return NextResponse.json({
        app: "agents-hub",
        status: "active",
        agents: [],
        message: "Agents Hub is ready. Spawn your first autonomous agent.",
        capabilities: ["spawn", "monitor", "terminate", "fund"],
        escrowProgram: process.env.NEXT_PUBLIC_ESCROW_PROGRAM_ID ?? "62JwzB8fcuLe7bZ5gUGWbJNYMg59Uq7qLR6vja9YNRDU",
      });
    },
  },
  "marketplace": {
    price: "$0.01",
    description: "OS App: Marketplace — browse skills & services",
    handler: async (_req: NextRequest) => {
      return NextResponse.json({
        app: "marketplace",
        status: "active",
        listings: [
          { id: "ai-prompt-mastery",   title: "AI Prompt Engineering", price: "$0.05", type: "skill" },
          { id: "web3-development",    title: "Web3 Dev Starter Kit",  price: "$0.10", type: "skill" },
          { id: "blockchain-security", title: "Blockchain Security",   price: "$0.08", type: "skill" },
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
  "terminal": {
    price: "$0.02",
    description: "OS App: Terminal — execute agent commands",
    handler: async (req: NextRequest) => {
      let command = "";
      try {
        const body = await req.json() as { command?: string };
        command = body.command ?? "";
      } catch {
        command = "";
      }

      // Stub: echo command back with safe execution note
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
      if (cmd === "status")  output.status = { escrow: "deployed", ipfs: "pending", agents: "pending" };

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
        const body = await req.json() as { task?: string; agentId?: string };
        task = body.task ?? "";
        agentId = body.agentId ?? "default-agent";
      } catch {
        task = "";
        agentId = "default-agent";
      }

      // M2M stub — in Phase 2 this calls ElizaOS SDK
      return NextResponse.json({
        app: "agent-task",
        agentId,
        task,
        status: "queued",
        taskId: `task_${Date.now()}`,
        message: "Task queued. Agent will execute and settle payment on completion.",
        note: "ElizaOS integration coming in Phase 2. This endpoint accepts x402 payments from other agents (machine-to-machine).",
        payment: {
          settled: true,
          amount: "$0.05",
          network: "x402",
        },
      });
    },
  },
};

// ── Route handler ──────────────────────────────────────────────────────────

/**
 * Dynamic OS app route handler.
 * Each app is protected by x402 micropayment via withX402 wrapper.
 *
 * @param req - Incoming Next.js request
 * @param context - Route context with params
 * @returns JSON response after payment verified
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

// Build x402-wrapped GET handler (payment-gated)
const paymentConfig = (app: string) => {
  const route = osAppRoutes[`/api/os/${app}` as keyof typeof osAppRoutes];
  if (!route) {
    return {
      accepts: [
        { scheme: "exact" as const, price: "$0.01", network: "eip155:84532" as const, payTo: evmAddress },
        { scheme: "exact" as const, price: "$0.01", network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1" as const, payTo: svmAddress },
      ],
      description: `OS App: ${app}`,
      mimeType: "application/json",
      extensions: { ...declareDiscoveryExtension({}) },
    };
  }
  return route;
};

/**
 * GET /api/os/[app]
 * Protected OS app endpoint — requires x402 micropayment.
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ app: string }> },
): Promise<NextResponse> {
  const { app } = await context.params;
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
 * POST /api/os/[app]
 * Protected OS app POST endpoint — for terminal commands & agent tasks.
 */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ app: string }> },
): Promise<NextResponse> {
  const { app } = await context.params;
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
