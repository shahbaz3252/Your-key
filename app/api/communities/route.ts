import type { NextRequest } from "next/server";
import { handleError, ok } from "@/lib/api/response";
import { listCommunities } from "@/lib/services/communities";
import { parseCommunityQuery } from "@/lib/validators/community-query";

export async function GET(request: NextRequest) {
  try {
    const query = parseCommunityQuery(request.nextUrl.searchParams);

    const communities = await listCommunities(query);

    return ok(communities, { meta: { total: communities.length } });
  } catch (error) {
    return handleError(error);
  }
}