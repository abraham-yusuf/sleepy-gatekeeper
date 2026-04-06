export type SandboxStatus = "created" | "running" | "stopped" | "error";

export interface SandboxMetadata {
  owner?: string;
  app?: string;
  labels?: Record<string, string>;
}

export interface SandboxRecord {
  sandboxId: string;
  image: string;
  command: string[];
  status: SandboxStatus;
  createdAt: string;
  startedAt?: string;
  stoppedAt?: string;
  lastHeartbeatAt?: string;
  metadata?: SandboxMetadata;
}

export interface CreateSandboxInput {
  image: string;
  command?: string[];
  metadata?: SandboxMetadata;
}

export interface StartSandboxInput {
  sandboxId: string;
}

export interface StopSandboxInput {
  sandboxId: string;
}

export interface GetSandboxStatusInput {
  sandboxId: string;
}

export interface SandboxRuntime {
  createSandbox(input: CreateSandboxInput): Promise<SandboxRecord>;
  startSandbox(input: StartSandboxInput): Promise<SandboxRecord>;
  stopSandbox(input: StopSandboxInput): Promise<SandboxRecord>;
  getSandboxStatus(input: GetSandboxStatusInput): Promise<SandboxRecord>;
  listSandboxes(): Promise<SandboxRecord[]>;
}

const SANDBOX_NOT_FOUND = "Sandbox not found";

/**
 * Generate deterministic-looking sandbox ids for the mock runtime.
 *
 * @returns Generated sandbox id.
 */
function createId(): string {
  return `sbx_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * In-memory runtime mock that follows the final sandbox lifecycle contract.
 */
class MockSandboxRuntime implements SandboxRuntime {
  private readonly sandboxes = new Map<string, SandboxRecord>();

  /**
   * Create a sandbox in `created` state.
   *
   * @param input - Sandbox creation payload.
   * @returns Sandbox snapshot.
   */
  async createSandbox(input: CreateSandboxInput): Promise<SandboxRecord> {
    const now = new Date().toISOString();
    const sandbox: SandboxRecord = {
      sandboxId: createId(),
      image: input.image,
      command: input.command ?? ["npm", "run", "start"],
      metadata: input.metadata,
      status: "created",
      createdAt: now,
      lastHeartbeatAt: now,
    };

    this.sandboxes.set(sandbox.sandboxId, sandbox);
    return sandbox;
  }

  /**
   * Transition sandbox status to `running`.
   *
   * @param input - Sandbox id payload.
   * @returns Updated sandbox snapshot.
   */
  async startSandbox(input: StartSandboxInput): Promise<SandboxRecord> {
    const sandbox = this.sandboxes.get(input.sandboxId);
    if (!sandbox) throw new Error(SANDBOX_NOT_FOUND);

    const updated: SandboxRecord = {
      ...sandbox,
      status: "running",
      startedAt: sandbox.startedAt ?? new Date().toISOString(),
      stoppedAt: undefined,
      lastHeartbeatAt: new Date().toISOString(),
    };
    this.sandboxes.set(updated.sandboxId, updated);
    return updated;
  }

  /**
   * Transition sandbox status to `stopped`.
   *
   * @param input - Sandbox id payload.
   * @returns Updated sandbox snapshot.
   */
  async stopSandbox(input: StopSandboxInput): Promise<SandboxRecord> {
    const sandbox = this.sandboxes.get(input.sandboxId);
    if (!sandbox) throw new Error(SANDBOX_NOT_FOUND);

    const updated: SandboxRecord = {
      ...sandbox,
      status: "stopped",
      stoppedAt: new Date().toISOString(),
      lastHeartbeatAt: new Date().toISOString(),
    };
    this.sandboxes.set(updated.sandboxId, updated);
    return updated;
  }

  /**
   * Return latest sandbox state snapshot.
   *
   * @param input - Sandbox id payload.
   * @returns Sandbox snapshot.
   */
  async getSandboxStatus(input: GetSandboxStatusInput): Promise<SandboxRecord> {
    const sandbox = this.sandboxes.get(input.sandboxId);
    if (!sandbox) throw new Error(SANDBOX_NOT_FOUND);
    return sandbox;
  }

  /**
   * List all known sandboxes sorted by newest first.
   *
   * @returns Sandbox list.
   */
  async listSandboxes(): Promise<SandboxRecord[]> {
    return [...this.sandboxes.values()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
}

/**
 * Export shared runtime abstraction used by API routes/UI.
 */
export const sandboxRuntime: SandboxRuntime = new MockSandboxRuntime();
