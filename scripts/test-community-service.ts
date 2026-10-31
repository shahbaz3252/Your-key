import { prisma } from "../lib/db";
import {
  getCommunityBySlug,
  listCommunities,
} from "../lib/services/communities";
import { parseCommunityQuery } from "../lib/validators/community-query";

async function main() {
  const all = await listCommunities(parseCommunityQuery(new URLSearchParams("")));
  console.log("all:", all);

  const dubai = await listCommunities(
    parseCommunityQuery(new URLSearchParams("city=dubai"))
  );
  console.log("dubai:", dubai);

  const one = await getCommunityBySlug("does-not-exist");
  console.log("one:", one);
}

main()
  .catch((error) => {
    console.error("TEST FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());