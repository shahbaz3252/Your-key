import type { NextRequest } from "next/server";
import { ApiError, handleError, ok } from "@/lib/api/response";
import { getCommunityBySlug } from "@/lib/services/communities";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const community = await getCommunityBySlug(slug.trim().toLowerCase());

    if (!community) {
      throw new ApiError("Community not found", 404);
    }

    return ok(community);
  } catch (error) {
    return handleError(error);
  }
}