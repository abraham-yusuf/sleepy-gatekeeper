import { NextResponse } from "next/server";
import { getAgentTask } from "../../../../agents/runtime";

/**
 * Get agent task status + execution logs for realtime polling.
 *
 * @param _req - Incoming request object.
 * @param context - Route context.
 * @param context.params - Async params containing task id.
 * @returns JSON response with task status payload or 404.
 */
export async function GET(
  _req: Request,
  context: { params: Promise<{ taskId: string }> },
): Promise<NextResponse> {
  const { taskId } = await context.params;
  const task = getAgentTask(taskId);

  if (!task) {
    return NextResponse.json(
      {
        error: `Task '${taskId}' not found`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    app: "agent-task",
    ...task,
  });
}
