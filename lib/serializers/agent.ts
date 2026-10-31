import type { Prisma } from "../../generated/prisma/client";

// Sirf yahi fields DB se aayenge. publicId, active, sortOrder, timestamps nahi.
export const agentSelect = {
  id: true,
  slug: true,
  name: true,
  nameAr: true,
  position: true,
  positionAr: true,
  bio: true,
  bioAr: true,
  email: true,
  phone: true,
  imageUrl: true,
  _count: {
    select: { properties: { where: { status: "PUBLISHED" } } },
  },
} satisfies Prisma.AgentSelect;

export type AgentRow = Prisma.AgentGetPayload<{
  select: typeof agentSelect;
}>;

export function serializeAgent(agent: AgentRow) {
  const { _count, ...rest } = agent;

  return {
    ...rest,
    propertyCount: _count.properties,
  };
}

export type PublicAgent = ReturnType<typeof serializeAgent>;