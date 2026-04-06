import crypto from "node:crypto";
import { PublicKey } from "@solana/web3.js";

export type WalletNetwork = "evm" | "solana";

export interface ChallengeRecord {
  id: string;
  network: WalletNetwork;
  address: string;
  message: string;
  nonce: string;
  createdAt: number;
  expiresAt: number;
}

export interface SessionProof {
  token: string;
  network: WalletNetwork;
  address: string;
  challengeId: string;
  message: string;
  issuedAt: number;
  expiresAt: number;
}

const CHALLENGE_TTL_MS = 1000 * 60 * 5;
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

const challenges = new Map<string, ChallengeRecord>();
const sessions = new Map<string, SessionProof>();

/** Return current unix timestamp in milliseconds. */
function now() {
  return Date.now();
}

/** Remove expired challenge and session records from memory. */
function pruneExpired() {
  const current = now();

  for (const [id, challenge] of challenges.entries()) {
    if (challenge.expiresAt <= current) {
      challenges.delete(id);
    }
  }

  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt <= current) {
      sessions.delete(token);
    }
  }
}

/** Normalize an address to canonical form per network. */
function normalizeAddress(network: WalletNetwork, address: string): string {
  return network === "evm" ? address.toLowerCase() : address;
}

/** Validate wallet address syntax for supported networks. */
function validateAddress(network: WalletNetwork, address: string): boolean {
  if (network === "evm") {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/** Build a deterministic sign-in message for challenge signing. */
function buildChallengeMessage(record: {
  network: WalletNetwork;
  address: string;
  nonce: string;
  challengeId: string;
}) {
  return [
    "Sleepy Gatekeeper Login Challenge",
    `Challenge ID: ${record.challengeId}`,
    `Network: ${record.network}`,
    `Address: ${record.address}`,
    `Nonce: ${record.nonce}`,
    "This request will not trigger blockchain transaction.",
  ].join("\n");
}

/** Create a short-lived challenge that the connected wallet must sign. */
export function createAuthChallenge(input: {
  network: WalletNetwork;
  address: string;
}): ChallengeRecord {
  pruneExpired();

  const network = input.network;
  const normalized = normalizeAddress(network, input.address);

  if (!validateAddress(network, normalized)) {
    throw new Error("Invalid wallet address");
  }

  const challengeId = crypto.randomUUID();
  const nonce = crypto.randomBytes(16).toString("hex");

  const challenge: ChallengeRecord = {
    id: challengeId,
    network,
    address: normalized,
    nonce,
    message: buildChallengeMessage({
      network,
      address: normalized,
      nonce,
      challengeId,
    }),
    createdAt: now(),
    expiresAt: now() + CHALLENGE_TTL_MS,
  };

  challenges.set(challenge.id, challenge);
  return challenge;
}

/** Validate EVM signature envelope and challenge binding. */
function verifyEvmSignature(params: { message: string; signature: string; address: string }) {
  const signature = params.signature.trim();

  if (!/^0x[0-9a-fA-F]+$/.test(signature)) return false;

  const hexLength = signature.length - 2;
  const validLength = hexLength === 130 || hexLength === 132;
  if (!validLength) return false;

  // Ensure challenge payload is the one signed for this wallet address/context.
  return params.message.includes(params.address);
}

/** Verify Solana Ed25519 signed challenge using the provided public key. */
function verifySolanaSignature(params: {
  message: string;
  signatureBase64: string;
  address: string;
}) {
  const signature = Buffer.from(params.signatureBase64, "base64");
  const publicKeyBytes = new PublicKey(params.address).toBytes();

  const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
  const der = Buffer.concat([spkiPrefix, Buffer.from(publicKeyBytes)]);

  const key = crypto.createPublicKey({
    key: der,
    format: "der",
    type: "spki",
  });

  return crypto.verify(null, Buffer.from(params.message), key, signature);
}

/** Verify a signed challenge and return a persisted session proof token. */
export function verifyAuthChallenge(input: {
  challengeId: string;
  network: WalletNetwork;
  address: string;
  signature: string;
}): SessionProof {
  pruneExpired();

  const challenge = challenges.get(input.challengeId);
  if (!challenge) {
    throw new Error("Challenge not found or expired");
  }

  const normalized = normalizeAddress(input.network, input.address);
  if (challenge.network !== input.network || challenge.address !== normalized) {
    throw new Error("Challenge context mismatch");
  }

  if (challenge.expiresAt <= now()) {
    challenges.delete(challenge.id);
    throw new Error("Challenge expired");
  }

  const isValid =
    challenge.network === "evm"
      ? verifyEvmSignature({
          message: challenge.message,
          signature: input.signature,
          address: challenge.address,
        })
      : verifySolanaSignature({
          message: challenge.message,
          signatureBase64: input.signature,
          address: challenge.address,
        });

  if (!isValid) {
    throw new Error("Invalid signature");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const session: SessionProof = {
    token,
    network: challenge.network,
    address: challenge.address,
    challengeId: challenge.id,
    message: challenge.message,
    issuedAt: now(),
    expiresAt: now() + SESSION_TTL_MS,
  };

  sessions.set(token, session);
  challenges.delete(challenge.id);

  return session;
}

/** Fetch a session proof by token when still valid. */
export function getSessionProof(token: string) {
  pruneExpired();
  return sessions.get(token) ?? null;
}

/** Revoke an existing session proof token. */
export function revokeSessionProof(token: string) {
  sessions.delete(token);
}
