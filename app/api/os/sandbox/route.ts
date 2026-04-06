import { NextRequest, NextResponse } from "next/server";
import { sandboxRuntime } from "../../../../lib/sandbox";

/**
 * Normalize unknown exceptions into a stable API error message.
 *
 * @param error - Unknown thrown value.
 * @returns Normalized error message.
 */
function asErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown sandbox error";
}

/**
 * Return sandbox list or a specific sandbox status.
 *
 * @param req - Incoming request.
 * @returns JSON response containing list/status payload.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const sandboxId = searchParams.get("sandboxId");

  try {
    if (sandboxId) {
      const sandbox = await sandboxRuntime.getSandboxStatus({ sandboxId });
      return NextResponse.json({
        ok: true,
        mode: "mock",
        operation: "status",
        sandbox,
      });
    }

    const sandboxes = await sandboxRuntime.listSandboxes();
    return NextResponse.json({
      ok: true,
      mode: "mock",
      operation: "list",
      sandboxes,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        mode: "mock",
        operation: "status",
        error: asErrorMessage(error),
      },
      { status: 404 },
    );
  }
}

/**
 * Execute sandbox lifecycle operations.
 *
 * @param req - Incoming request.
 * @returns JSON response containing lifecycle result.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json().catch(() => null)) as {
    operation?: "create" | "start" | "stop";
    sandboxId?: string;
    image?: string;
    command?: string[];
    metadata?: Record<string, unknown>;
  } | null;

  const operation = body?.operation;

  if (!operation) {
    return NextResponse.json(
      { ok: false, error: "Missing operation: create | start | stop" },
      { status: 400 },
    );
  }

  try {
    if (operation === "create") {
      if (!body.image) {
        return NextResponse.json({ ok: false, error: "Missing image" }, { status: 400 });
      }

      const sandbox = await sandboxRuntime.createSandbox({
        image: body.image,
        command: body.command,
        metadata: body.metadata,
      });

      return NextResponse.json({
        ok: true,
        mode: "mock",
        operation,
        sandbox,
      });
    }

    if (!body.sandboxId) {
      return NextResponse.json({ ok: false, error: "Missing sandboxId" }, { status: 400 });
    }

    const sandbox =
      operation === "start"
        ? await sandboxRuntime.startSandbox({ sandboxId: body.sandboxId })
        : await sandboxRuntime.stopSandbox({ sandboxId: body.sandboxId });

    return NextResponse.json({
      ok: true,
      mode: "mock",
      operation,
      sandbox,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, mode: "mock", operation, error: asErrorMessage(error) },
      { status: 404 },
    );
  }
}
