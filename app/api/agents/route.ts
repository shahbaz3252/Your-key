import { handleError, ok } from "@/lib/api/response";
import { listAgents } from "@/lib/services/agents";

export async function GET() {
  try {
    const agents = await listAgents();

    return ok(agents, { meta: { total: agents.length } });
  } catch (error) {
    return handleError(error);
  }
}