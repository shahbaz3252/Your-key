import { prisma } from "../lib/db";
import { listAmenities } from "../lib/services/amenities";

async function main() {
  const all = await listAmenities();
  console.log("all:", all);
}

main()
  .catch((error) => {
    console.error("TEST FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());