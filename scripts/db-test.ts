import { prisma } from "../lib/db";

async function main() {
  const slug = `db-test-${Date.now()}`;

  const created = await prisma.amenity.create({
    data: {
      name: "DB Test",
      nameAr: "اختبار",
      slug,
    },
  });
  console.log("1. Created row:", created.id);

  const found = await prisma.amenity.findUnique({
    where: { slug },
  });
  console.log("2. Read back:", found ? "OK" : "NOT FOUND");

  await prisma.amenity.delete({
    where: { id: created.id },
  });
  console.log("3. Deleted test row");

  const counts = {
    users: await prisma.user.count(),
    communities: await prisma.community.count(),
    agents: await prisma.agent.count(),
    properties: await prisma.property.count(),
    amenities: await prisma.amenity.count(),
    enquiries: await prisma.enquiry.count(),
  };
  console.log("4. Table counts:", counts);
}

main()
  .catch((error) => {
    console.error("FAILED:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });