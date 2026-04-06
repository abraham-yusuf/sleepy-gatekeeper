import { promises as fs } from "node:fs";
import path from "node:path";

export type PaymentMode = "mpp" | "x402" | "escrow";

export interface AgentSpendRecord {
  agentId: string;
  totalSpent: number;
  budget: number;
  transactions: Array<{
    endpoint: string;
    amount: number;
    timestamp: number;
    receipt?: string;
    mode: PaymentMode;
  }>;
}

export interface CanonicalPaymentReceipt {
  id: string;
  app: string;
  mode: PaymentMode;
  amount: string;
  payer?: string;
  payee?: string;
  proof: Record<string, string>;
  verifiedAt: number;
}

interface LedgerStore {
  spends: Record<string, AgentSpendRecord>;
  receipts: Record<string, CanonicalPaymentReceipt>;
}

const LEDGER_PATH = path.join(process.cwd(), ".data", "payment-ledger.json");

/**
 * Ensure storage directory and ledger file exist.
 */
async function ensureFile(): Promise<void> {
  await fs.mkdir(path.dirname(LEDGER_PATH), { recursive: true });
  try {
    await fs.access(LEDGER_PATH);
  } catch {
    const initial: LedgerStore = { spends: {}, receipts: {} };
    await fs.writeFile(LEDGER_PATH, JSON.stringify(initial, null, 2), "utf-8");
  }
}

/**
 * Load ledger file contents.
 *
 * @returns Parsed ledger object.
 */
async function readLedger(): Promise<LedgerStore> {
  await ensureFile();
  try {
    const raw = await fs.readFile(LEDGER_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<LedgerStore>;
    return {
      spends: parsed.spends ?? {},
      receipts: parsed.receipts ?? {},
    };
  } catch {
    return { spends: {}, receipts: {} };
  }
}

/**
 * Persist full ledger payload to disk.
 *
 * @param next - Ledger state to save.
 */
async function writeLedger(next: LedgerStore): Promise<void> {
  await ensureFile();
  await fs.writeFile(LEDGER_PATH, JSON.stringify(next, null, 2), "utf-8");
}

/**
 * Get one agent spend record, creating a default entry when absent.
 *
 * @param agentId - Agent identifier.
 * @param budget - Budget ceiling to apply.
 * @returns Persisted spend record.
 */
export async function getAgentSpendRecord(
  agentId: string,
  budget: number,
): Promise<AgentSpendRecord> {
  const ledger = await readLedger();
  if (!ledger.spends[agentId]) {
    ledger.spends[agentId] = {
      agentId,
      totalSpent: 0,
      budget,
      transactions: [],
    };
    await writeLedger(ledger);
  }

  const record = ledger.spends[agentId];
  if (record.budget !== budget) {
    record.budget = budget;
    await writeLedger(ledger);
  }

  return record;
}

/**
 * Save an updated agent spend record.
 *
 * @param record - Agent spend state.
 */
export async function saveAgentSpendRecord(record: AgentSpendRecord): Promise<void> {
  const ledger = await readLedger();
  ledger.spends[record.agentId] = record;
  await writeLedger(ledger);
}

/**
 * Read all agent spend records.
 *
 * @returns Record keyed by agent id.
 */
export async function getAllAgentSpendRecords(): Promise<Record<string, AgentSpendRecord>> {
  const ledger = await readLedger();
  return ledger.spends;
}

/**
 * Delete one agent spend record.
 *
 * @param agentId - Agent identifier.
 */
export async function resetAgentSpendRecord(agentId: string): Promise<void> {
  const ledger = await readLedger();
  delete ledger.spends[agentId];
  await writeLedger(ledger);
}

/**
 * Upsert canonical payment receipt after proof verification.
 *
 * @param receipt - Canonical receipt payload.
 */
export async function upsertCanonicalReceipt(receipt: CanonicalPaymentReceipt): Promise<void> {
  const ledger = await readLedger();
  ledger.receipts[receipt.id] = receipt;
  await writeLedger(ledger);
}

/**
 * Get a canonical receipt by id.
 *
 * @param id - Canonical receipt id.
 * @returns Receipt when present.
 */
export async function getCanonicalReceipt(id: string): Promise<CanonicalPaymentReceipt | null> {
  const ledger = await readLedger();
  return ledger.receipts[id] ?? null;
}
