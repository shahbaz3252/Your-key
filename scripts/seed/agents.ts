import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/db";

const agents = [
  {
    slug: "sohail-ahmed",
    name: "Sohail Ahmed",
    position: "REAL ESTATE BROKER",
    bio: "Sohail is a young, energetic and charismatic person that strives on delivering the best to his clients. Customer service is a top priority for Sohail and he firmly believes that hard work, trust and strong interpersonal skills is the formula for success.",
    imageUrl: "/images/agents/sohail-ahmed.png",
    sortOrder: 1,
  },
  {
    slug: "sultan-umar",
    name: "Sultan Umar",
    position: "REAL ESTATE AGENT",
    bio: "Specialising in waterfront and prime Dubai investments.",
    imageUrl: "/images/agents/sultan-umar.png",
    sortOrder: 2,
  },
  {
    slug: "aanis-khalil",
    name: "Aanis Khalil",
    position: "PROPERTY PORTFOLIO MANAGER",
    bio: "Represented property owners and investors in the sale and leasing of residential and commercial properties while ensuring a seamless client experience.",
    imageUrl: "/images/agents/aanis-khalil.png",
    sortOrder: 3,
  },
  {
    slug: "sameet-kumar",
    name: "Sameet Kumar",
    position: "REAL ESTATE ADVISER",
    bio: "Real Estate Advisor | Rentals • Sales • Property Management | Abu Dhabi",
    imageUrl: "/images/agents/sameet-kumar.png",
    sortOrder: 4,
  },
] satisfies Prisma.AgentCreateInput[];

export async function seedAgents() {
  let created = 0;
  let skipped = 0;

  for (const agent of agents) {
    const existing = await prisma.agent.findUnique({
      where: { slug: agent.slug },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.agent.create({ data: agent });
    created++;
  }

  console.log(`Agents: ${created} created, ${skipped} skipped`);
}