import { NextRequest, NextResponse } from "next/server";
import { createChallenge } from "../../../../lib/mpp";

interface ChallengeBody {
  app?: string;
  payer?: string;
  payee?: string;
  mint?: string;
  amount?: string;
  ttlMs?: number;
}

/**
 * Create a one-time MPP challenge for a payable app request.
 *
 * @param req - Request containing payer/payee/mint/amount metadata.
 * @returns Challenge payload and next-step instructions.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: ChallengeBody;

  try {
    body = (await req.json()) as ChallengeBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const app = body.app ?? "agent-task";
  const payer = body.payer?.trim();
  const payee = body.payee?.trim() ?? process.env.MPP_PAYEE ?? "gatekeeper-treasury";
  const mint = body.mint?.trim() ?? "USDC";
  const amount = body.amount?.trim() ?? "0.05";

  if (!payer) {
    return NextResponse.json({ error: "payer is required" }, { status: 400 });
  }

  const challenge = createChallenge({
    app,
    payer,
    payee,
    mint,
    amount,
    ttlMs: body.ttlMs,
  });

  return NextResponse.json({
    ok: true,
    challenge,
    next: {
      step: "Sign message and submit tx signature to /api/mpp/settle",
    },
  });
}
