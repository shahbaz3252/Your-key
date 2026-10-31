import { prisma } from "../lib/db";
import { seedAgents } from "./seed/agents";
import { seedAmenities } from "./seed/amenities";
import { seedCommunities } from "./seed/communities";

async function main() {
  console.log("Seeding...");

  await seedAmenities();
  await seedCommunities();
  await seedAgents();

  console.log("Seed finished.");
}

main()
  .catch((error) => {
    console.error("SEED FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());