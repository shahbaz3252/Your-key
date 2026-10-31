import { prisma } from "../lib/db";
import { seedOffPlanProperties } from "./seed/offplan";

seedOffPlanProperties()
  .catch((error) => {
    console.error("FAILED:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });