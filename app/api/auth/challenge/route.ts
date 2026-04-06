import { NextRequest, NextResponse } from "next/server";
import { createAuthChallenge, type WalletNetwork } from "../../../../lib/wallet-auth";

interface ChallengeRequestBody {
  network?: WalletNetwork;
  address?: string;
}

/** Issue a login challenge tied to wallet network + address. */
export async function POST(req: NextRequest) {
  let body: ChallengeRequestBody;

  try {
    body = (await req.json()) as ChallengeRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.network || !body.address) {
    return NextResponse.json({ error: "network and address are required" }, { status: 400 });
  }

  try {
    const challenge = createAuthChallenge({
      network: body.network,
      address: body.address,
    });

    return NextResponse.json({
      challengeId: challenge.id,
      message: challenge.message,
      expiresAt: challenge.expiresAt,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create challenge" },
      { status: 400 },
    );
  }
}
