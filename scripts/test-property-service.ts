import { prisma } from "../lib/db";
import { listProperties, getPropertyBySlug } from "../lib/services/properties";
import { parsePropertyQuery } from "../lib/validators/property-query";

async function main() {
  const query = parsePropertyQuery(
    new URLSearchParams(
      "purpose=buy&city=dubai&bedrooms=3%2B&minPrice=500000&maxPrice=9000000&minArea=500&sort=price-desc&featured=false"
    )
  );

  const list = await listProperties(query, { skip: 0, take: 12 });
  console.log("list:", list);

  const detail = await getPropertyBySlug("does-not-exist");
  console.log("detail:", detail);
}

main()
  .catch((error) => {
    console.error("TEST FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());