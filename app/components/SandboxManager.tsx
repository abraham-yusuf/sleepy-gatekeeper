"use client";

import { useMemo, useState } from "react";

type SandboxStatus = "created" | "running" | "stopped" | "error";

interface SandboxRecord {
  sandboxId: string;
  image: string;
  command: string[];
  status: SandboxStatus;
  createdAt: string;
  startedAt?: string;
  stoppedAt?: string;
  lastHeartbeatAt?: string;
}

interface SandboxApiResponse {
  ok: boolean;
  operation: "create" | "start" | "stop" | "status" | "list";
  mode: "mock";
  sandbox?: SandboxRecord;
  sandboxes?: SandboxRecord[];
  error?: string;
}

async function readJson<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

export function SandboxManager() {
  const [image, setImage] = useState("ghcr.io/sleepy-gatekeeper/runtime:latest");
  const [command, setCommand] = useState("npm run start");
  const [sandboxId, setSandboxId] = useState("");
  const [sandboxes, setSandboxes] = useState<SandboxRecord[]>([]);
  const [active, setActive] = useState<SandboxRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sortedSandboxes = useMemo(
    () => [...sandboxes].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [sandboxes],
  );

  const refreshList = async () => {
    const res = await fetch("/api/os/sandbox", { method: "GET", cache: "no-store" });
    const data = await readJson<SandboxApiResponse>(res);
    if (!res.ok || !data.ok) {
      throw new Error(data.error ?? "Failed to load sandbox list");
    }
    setSandboxes(data.sandboxes ?? []);
  };

  const createSandbox = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/os/sandbox", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          operation: "create",
          image,
          command: command
            .split(" ")
            .map(item => item.trim())
            .filter(Boolean),
          metadata: { source: "sandbox-manager-ui" },
        }),
      });

      const data = await readJson<SandboxApiResponse>(res);
      if (!res.ok || !data.ok || !data.sandbox) {
        throw new Error(data.error ?? "Create sandbox failed");
      }

      setActive(data.sandbox);
      setSandboxId(data.sandbox.sandboxId);
      await refreshList();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Unknown sandbox error");
    } finally {
      setLoading(false);
    }
  };

  const runLifecycle = async (operation: "start" | "stop" | "status") => {
    if (!sandboxId) {
      setError("Masukkan sandboxId terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint =
        operation === "status"
          ? `/api/os/sandbox?sandboxId=${encodeURIComponent(sandboxId)}`
          : "/api/os/sandbox";

      const res = await fetch(endpoint, {
        method: operation === "status" ? "GET" : "POST",
        headers: { "content-type": "application/json" },
        body: operation === "status" ? undefined : JSON.stringify({ operation, sandboxId }),
      });

      const data = await readJson<SandboxApiResponse>(res);
      if (!res.ok || !data.ok || !data.sandbox) {
        throw new Error(data.error ?? `${operation} failed`);
      }

      setActive(data.sandbox);
      await refreshList();
    } catch (lifecycleError) {
      setError(lifecycleError instanceof Error ? lifecycleError.message : "Unknown sandbox error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-retro-gray p-4 text-black">
      <div className="bg-white win95-recessed p-4 min-h-[340px] space-y-4">
        <div>
          <h3 className="text-lg font-bold">🧪 Sandbox Manager</h3>
          <p className="text-xs text-black/70">
            Mock runtime untuk lifecycle sandbox (create, start, stop, status) dengan contract API
            final.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <label className="space-y-1">
            <span className="font-bold">Image</span>
            <input
              value={image}
              onChange={e => setImage(e.target.value)}
              className="w-full border border-gray-400 px-2 py-1 font-mono"
            />
          </label>

          <label className="space-y-1">
            <span className="font-bold">Command</span>
            <input
              value={command}
              onChange={e => setCommand(e.target.value)}
              className="w-full border border-gray-400 px-2 py-1 font-mono"
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className="font-bold">Sandbox ID</span>
            <input
              value={sandboxId}
              onChange={e => setSandboxId(e.target.value)}
              placeholder="sbx_xxxxxxxx"
              className="w-full border border-gray-400 px-2 py-1 font-mono"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-3 py-1 bg-primary text-white border border-black text-xs font-bold"
            onClick={() => void createSandbox()}
            disabled={loading}
          >
            CREATE
          </button>
          <button
            className="px-3 py-1 bg-[#1084d0] text-white border border-black text-xs font-bold"
            onClick={() => void runLifecycle("start")}
            disabled={loading}
          >
            START
          </button>
          <button
            className="px-3 py-1 bg-[#ff9f43] text-white border border-black text-xs font-bold"
            onClick={() => void runLifecycle("stop")}
            disabled={loading}
          >
            STOP
          </button>
          <button
            className="px-3 py-1 bg-gray-700 text-white border border-black text-xs font-bold"
            onClick={() => void runLifecycle("status")}
            disabled={loading}
          >
            STATUS
          </button>
          <button
            className="px-3 py-1 bg-retro-gray border border-black text-xs font-bold"
            onClick={() => void refreshList()}
            disabled={loading}
          >
            REFRESH LIST
          </button>
        </div>

        {error && (
          <div className="text-xs text-red-700 bg-red-100 border border-red-300 px-2 py-2">
            {error}
          </div>
        )}

        {active && (
          <div className="border border-gray-400 bg-gray-50 p-2 text-[11px] font-mono space-y-1">
            <div>ID: {active.sandboxId}</div>
            <div>Status: {active.status}</div>
            <div>Image: {active.image}</div>
            <div>Command: {active.command.join(" ")}</div>
            <div>
              Last heartbeat:{" "}
              {new Date(active.lastHeartbeatAt ?? active.createdAt).toLocaleString()}
            </div>
          </div>
        )}

        <div className="border border-gray-400 bg-white max-h-36 overflow-auto text-[11px]">
          {sortedSandboxes.length === 0 ? (
            <div className="p-3 text-black/40 font-mono">Belum ada sandbox.</div>
          ) : (
            sortedSandboxes.map(item => (
              <button
                type="button"
                key={item.sandboxId}
                className="w-full text-left px-2 py-1 border-b border-gray-200 hover:bg-primary hover:text-white font-mono"
                onClick={() => {
                  setSandboxId(item.sandboxId);
                  setActive(item);
                }}
              >
                {item.sandboxId} · {item.status} · {item.image}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
