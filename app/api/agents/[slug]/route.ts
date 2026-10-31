import type { NextRequest } from "next/server";
import { ApiError, handleError, ok } from "@/lib/api/response";
import { getAgentBySlug } from "@/lib/services/agents";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const agent = await getAgentBySlug(slug.trim().toLowerCase());

    if (!agent) {
      throw new ApiError("Agent not found", 404);
    }

    return ok(agent);
  } catch (error) {
    return handleError(error);
  }
}