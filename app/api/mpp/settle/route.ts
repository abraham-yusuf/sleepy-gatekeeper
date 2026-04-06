import { NextRequest, NextResponse } from "next/server";
import { settleChallenge } from "../../../../lib/mpp";

interface SettleBody {
  challengeId?: string;
  txSignature?: string;
  payer?: string;
}

/**
 * Settle a previously issued MPP challenge and mint a structured receipt.
 *
 * @param req - Request with challengeId, txSignature, and payer.
 * @returns Receipt record that can be used for paid endpoint access.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: SettleBody;

  try {
    body = (await req.json()) as SettleBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.challengeId || !body.txSignature || !body.payer) {
    return NextResponse.json(
      { error: "challengeId, txSignature, and payer are required" },
      { status: 400 },
    );
  }

  try {
    const record = settleChallenge({
      challengeId: body.challengeId,
      txSignature: body.txSignature,
      payer: body.payer,
    });

    return NextResponse.json({
      ok: true,
      receiptId: record.receiptId,
      challengeId: record.challengeId,
      app: record.app,
      receipt: record.receipt,
      usage: {
        endpoint: `/api/os/${record.app}`,
        header: {
          "x-mpp-receipt-id": record.receiptId,
          "x-mpp-tx-signature": record.receipt.txSignature,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to settle challenge" },
      { status: 400 },
    );
  }
}
