import { NextRequest, NextResponse } from "next/server";
import { verifyAuthChallenge, type WalletNetwork } from "../../../../lib/wallet-auth";

interface VerifyRequestBody {
  challengeId?: string;
  network?: WalletNetwork;
  address?: string;
  signature?: string;
}

/** Verify signed challenge payload and issue session proof token. */
export async function POST(req: NextRequest) {
  let body: VerifyRequestBody;

  try {
    body = (await req.json()) as VerifyRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.challengeId || !body.network || !body.address || !body.signature) {
    return NextResponse.json(
      { error: "challengeId, network, address, and signature are required" },
      { status: 400 },
    );
  }

  try {
    const session = verifyAuthChallenge({
      challengeId: body.challengeId,
      network: body.network,
      address: body.address,
      signature: body.signature,
    });

    return NextResponse.json({
      token: session.token,
      proof: {
        network: session.network,
        address: session.address,
        challengeId: session.challengeId,
        message: session.message,
        issuedAt: session.issuedAt,
        expiresAt: session.expiresAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to verify signature" },
      { status: 401 },
    );
  }
}
