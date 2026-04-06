export type AgentTaskStatus = "created" | "running" | "settled" | "completed" | "failed";

export interface AgentTaskLog {
  at: string;
  status: AgentTaskStatus;
  message: string;
}

export interface AgentTaskRecord {
  taskId: string;
  agentId: string;
  task: string;
  status: AgentTaskStatus;
  createdAt: string;
  updatedAt: string;
  settledAt?: string;
  completedAt?: string;
  payment: {
    amount: string;
    network: "x402";
    settled: boolean;
  };
  result?: Record<string, unknown>;
  error?: string;
  logs: AgentTaskLog[];
}

interface RuntimeInput {
  agentId: string;
  task: string;
  paymentAmount?: string;
}

interface RuntimeAdapter {
  run(input: RuntimeInput): Promise<Record<string, unknown>>;
}

const taskStore = new Map<string, AgentTaskRecord>();

/**
 * Build current ISO timestamp.
 *
 * @returns ISO-8601 timestamp string.
 */
function nowIso(): string {
  return new Date().toISOString();
}

/**
 * Delay runtime processing to simulate asynchronous job steps.
 *
 * @param ms - Milliseconds to sleep.
 * @returns Promise that resolves after delay.
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * Update task record and append optional status log.
 *
 * @param taskId - Task identifier.
 * @param patch - Partial record changes and optional log line.
 * @returns Updated task or null when task is missing.
 */
function updateTask(
  taskId: string,
  patch: Partial<Omit<AgentTaskRecord, "taskId" | "logs">> & { logMessage?: string },
): AgentTaskRecord | null {
  const task = taskStore.get(taskId);
  if (!task) return null;

  const next: AgentTaskRecord = {
    ...task,
    ...patch,
    updatedAt: nowIso(),
    logs: [...task.logs],
  };

  if (patch.logMessage) {
    next.logs.push({
      at: nowIso(),
      status: patch.status ?? task.status,
      message: patch.logMessage,
    });
  }

  taskStore.set(taskId, next);
  return next;
}

const runtimeAdapter: RuntimeAdapter = {
  async run(input: RuntimeInput): Promise<Record<string, unknown>> {
    const normalizedTask = input.task.trim().toLowerCase();

    if (!normalizedTask) {
      return {
        action: "noop",
        summary: "No task provided. Agent returned heartbeat diagnostics.",
        diagnostics: {
          uptime: "ok",
          queueDepth: 0,
          wallet: "connected",
        },
      };
    }

    if (normalizedTask.includes("status") || normalizedTask.includes("health")) {
      return {
        action: "check-status",
        summary: "Agent runtime healthy and ready.",
        diagnostics: {
          cpu: "normal",
          memory: "stable",
          signer: "ready",
        },
      };
    }

    return {
      action: "execute-task",
      summary: `Agent ${input.agentId} executed task successfully.`,
      output: `Task '${input.task}' finished without errors.`,
    };
  },
};

/**
 * Execute state machine for a task.
 *
 * @param taskId - Task identifier.
 * @returns Promise that resolves once processing path has finished.
 */
async function processTask(taskId: string): Promise<void> {
  const current = taskStore.get(taskId);
  if (!current) return;

  updateTask(taskId, {
    status: "running",
    logMessage: `Agent ${current.agentId} started execution.`,
  });

  try {
    await sleep(900);
    const result = await runtimeAdapter.run({
      agentId: current.agentId,
      task: current.task,
      paymentAmount: current.payment.amount,
    });

    updateTask(taskId, {
      status: "settled",
      settledAt: nowIso(),
      payment: {
        ...current.payment,
        settled: true,
      },
      logMessage: `Payment ${current.payment.amount} settled via x402.`,
    });

    await sleep(500);
    updateTask(taskId, {
      status: "completed",
      completedAt: nowIso(),
      result,
      logMessage: "Task completed and result persisted.",
    });
  } catch (error) {
    updateTask(taskId, {
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown runtime error",
      logMessage: "Task failed during runtime execution.",
    });
  }
}

/**
 * Create a new task and immediately trigger runtime processing.
 *
 * @param input - Agent runtime input.
 * @returns Newly created task.
 */
export function createAgentTask(input: RuntimeInput): AgentTaskRecord {
  const taskId = `task_${Date.now()}`;
  const timestamp = nowIso();
  const task: AgentTaskRecord = {
    taskId,
    task: input.task,
    agentId: input.agentId,
    status: "created",
    createdAt: timestamp,
    updatedAt: timestamp,
    payment: {
      amount: input.paymentAmount ?? "$0.05",
      network: "x402",
      settled: false,
    },
    logs: [
      {
        at: timestamp,
        status: "created",
        message: `Task created for agent ${input.agentId}.`,
      },
    ],
  };

  taskStore.set(task.taskId, task);
  void processTask(task.taskId);
  return task;
}

/**
 * Fetch one task from in-memory runtime store.
 *
 * @param taskId - Task identifier.
 * @returns Existing task or null.
 */
export function getAgentTask(taskId: string): AgentTaskRecord | null {
  return taskStore.get(taskId) ?? null;
}
