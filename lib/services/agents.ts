import { prisma } from "../db";
import { agentSelect, serializeAgent } from "../serializers/agent";

export async function listAgents() {
  // Public API: sirf active agents. Yeh filter kabhi hataana nahi.
  const rows = await prisma.agent.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
    select: agentSelect,
  });

  return rows.map(serializeAgent);
}

export async function getAgentBySlug(slug: string) {
  const row = await prisma.agent.findFirst({
    where: { slug, active: true },
    select: agentSelect,
  });

  return row ? serializeAgent(row) : null;
}