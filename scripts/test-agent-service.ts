import { prisma } from "../lib/db";
import { getAgentBySlug, listAgents } from "../lib/services/agents";

async function main() {
  const all = await listAgents();
  console.log("all:", all);

  const one = await getAgentBySlug("does-not-exist");
  console.log("one:", one);
}

main()
  .catch((error) => {
    console.error("TEST FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());