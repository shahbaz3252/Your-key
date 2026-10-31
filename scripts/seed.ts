import { prisma } from "../lib/db";
import { seedAgents } from "./seed/agents";
import { seedAmenities } from "./seed/amenities";
import { seedCommunities } from "./seed/communities";
import { seedProperties } from "./seed/properties";

async function main() {
  console.log("Seeding...");

  // Tarteeb zaroori hai: properties ko baaqi teeno pehle chahiye
  await seedAmenities();
  await seedCommunities();
  await seedAgents();
  await seedProperties();

  console.log("Seed finished.");
}

main()
  .catch((error) => {
    console.error("SEED FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());