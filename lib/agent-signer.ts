import { createHmac, timingSafeEqual } from "crypto";

export interface ProgramOwnedSignerProofInput {
  signer: string;
  agentId: string;
  app: string;
  amount: string;
  timestamp: string;
  nonce: string;
}

export interface ProgramOwnedSignerProof extends ProgramOwnedSignerProofInput {
  signature: string;
}

const DEFAULT_SIGNER = "sleepy-gatekeeper-program-signer";
const DEFAULT_SECRET = "sleepy-gatekeeper-dev-secret";

/**
 * Resolve signing secret used by program-owned signer stub.
 *
 * @returns Shared HMAC secret.
 */
function signerSecret(): string {
  return process.env.M2M_SIGNER_SECRET ?? DEFAULT_SECRET;
}

/**
 * Build deterministic program-owned signer proof for M2M release stubs.
 *
 * @param input - Signing input payload.
 * @returns Signed proof object.
 */
export function buildProgramOwnedSignerProof(
  input: Omit<ProgramOwnedSignerProofInput, "signer" | "timestamp" | "nonce"> & {
    signer?: string;
    timestamp?: string;
    nonce?: string;
  },
): ProgramOwnedSignerProof {
  const signer = input.signer ?? process.env.M2M_PROGRAM_SIGNER ?? DEFAULT_SIGNER;
  const timestamp = input.timestamp ?? Date.now().toString();
  const nonce = input.nonce ?? crypto.randomUUID();
  const payload = `${signer}|${input.agentId}|${input.app}|${input.amount}|${timestamp}|${nonce}`;
  const signature = createHmac("sha256", signerSecret()).update(payload).digest("hex");

  return {
    signer,
    agentId: input.agentId,
    app: input.app,
    amount: input.amount,
    timestamp,
    nonce,
    signature,
  };
}

/**
 * Verify program-owned signer proof freshness and signature integrity.
 *
 * @param proof - Signed proof payload.
 * @param maxAgeMs - Maximum allowed proof age.
 * @returns True when proof is valid.
 */
export function verifyProgramOwnedSignerProof(
  proof: ProgramOwnedSignerProof,
  maxAgeMs = 5 * 60 * 1000,
): boolean {
  const now = Date.now();
  const ts = Number(proof.timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(now - ts) > maxAgeMs) return false;

  const payload = `${proof.signer}|${proof.agentId}|${proof.app}|${proof.amount}|${proof.timestamp}|${proof.nonce}`;
  const expected = createHmac("sha256", signerSecret()).update(payload).digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(proof.signature, "hex");

  if (expectedBuffer.length !== actualBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, actualBuffer);
}
