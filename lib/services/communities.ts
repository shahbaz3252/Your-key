import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db";
import { communitySelect, serializeCommunity } from "../serializers/community";
import type { CommunityQuery } from "../validators/community-query";

export async function listCommunities(query: CommunityQuery) {
  // Public API: sirf PUBLISHED. Yeh filter kabhi hataana nahi.
  const where: Prisma.CommunityWhereInput = { status: "PUBLISHED" };

  if (query.city) where.city = query.city;

  const rows = await prisma.community.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    select: communitySelect,
  });

  return rows.map(serializeCommunity);
}

export async function getCommunityBySlug(slug: string) {
  const row = await prisma.community.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: communitySelect,
  });

  return row ? serializeCommunity(row) : null;
}