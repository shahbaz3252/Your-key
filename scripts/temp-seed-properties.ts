import { prisma } from "../lib/db";

const PREFIX = "test-";

async function cleanup() {
  // Property delete hone se images aur amenity links khud cascade ho jate hain
  const properties = await prisma.property.deleteMany({
    where: { slug: { startsWith: PREFIX } },
  });
  const agents = await prisma.agent.deleteMany({
    where: { slug: { startsWith: PREFIX } },
  });
  const communities = await prisma.community.deleteMany({
    where: { slug: { startsWith: PREFIX } },
  });
  const amenities = await prisma.amenity.deleteMany({
    where: { slug: { startsWith: PREFIX } },
  });

  console.log(
    `Cleanup done: ${properties.count} properties, ${agents.count} agents, ` +
      `${communities.count} communities, ${amenities.count} amenities removed`
  );
}

async function seed() {
  await cleanup();

  const agent = await prisma.agent.create({
    data: {
      name: "Test Agent",
      nameAr: "وكيل تجريبي",
      slug: "test-agent",
      position: "Property Consultant",
      positionAr: "مستشار عقاري",
      imageUrl: "/images/agents/test.png",
    },
  });

  const community = await prisma.community.create({
    data: {
      name: "Test Community",
      nameAr: "مجتمع تجريبي",
      slug: "test-community",
      city: "DUBAI",
    },
  });

  const pool = await prisma.amenity.create({
    data: { name: "Test Pool", nameAr: "مسبح", slug: "test-pool", icon: "pool" },
  });
  const gym = await prisma.amenity.create({
    data: { name: "Test Gym", nameAr: "نادي رياضي", slug: "test-gym", icon: "gym" },
  });

  const now = new Date();

  // 1. Villa for sale (primary image doosri hai, ordering test ke liye)
  await prisma.property.create({
    data: {
      title: "Test Villa in Dubai",
      titleAr: "فيلا تجريبية في دبي",
      slug: "test-villa-dubai-sale",
      description: "A test villa for sale in Dubai.",
      descriptionAr: "فيلا تجريبية للبيع في دبي.",
      purpose: "SALE",
      propertyType: "VILLA",
      status: "PUBLISHED",
      priceAED: 8500000,
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 5200,
      address: "Test Street 1",
      city: "DUBAI",
      featured: true,
      publishedAt: now,
      communityId: community.id,
      agentId: agent.id,
      images: {
        create: [
          {
            imageUrl: "/images/test-villa-2.jpg",
            publicId: "test/villa-secondary",
            altText: "Secondary view",
            sortOrder: 0,
            isPrimary: false,
          },
          {
            imageUrl: "/images/test-villa-1.jpg",
            publicId: "test/villa-primary",
            altText: "Primary view",
            sortOrder: 1,
            isPrimary: true,
          },
        ],
      },
      amenities: {
        create: [
          { amenity: { connect: { id: pool.id } } },
          { amenity: { connect: { id: gym.id } } },
        ],
      },
    },
  });

  // 2. Apartment for rent
  await prisma.property.create({
    data: {
      title: "Test Apartment for Rent",
      titleAr: "شقة تجريبية للإيجار",
      slug: "test-apartment-dubai-rent",
      description: "A test apartment for rent in Dubai.",
      purpose: "RENT",
      propertyType: "APARTMENT",
      status: "PUBLISHED",
      priceAED: 120000,
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1300,
      city: "DUBAI",
      publishedAt: now,
      communityId: community.id,
      agentId: agent.id,
      images: {
        create: [
          {
            imageUrl: "/images/test-rent-1.jpg",
            publicId: "test/rent-primary",
            sortOrder: 0,
            isPrimary: true,
          },
        ],
      },
    },
  });

  // 3. Off-plan in Abu Dhabi (koi community, agent ya image nahi)
  await prisma.property.create({
    data: {
      title: "Test Off-Plan Tower",
      slug: "test-offplan-abu-dhabi",
      description: "A test off-plan apartment in Abu Dhabi.",
      purpose: "OFF_PLAN",
      propertyType: "APARTMENT",
      status: "PUBLISHED",
      priceAED: 1900000,
      bedrooms: 1,
      bathrooms: 2,
      areaSqFt: 850,
      city: "ABU_DHABI",
      developer: "Test Developer",
      completionDate: new Date("2028-12-31"),
      publishedAt: now,
    },
  });

  // 4. Studio for sale
  await prisma.property.create({
    data: {
      title: "Test Studio",
      slug: "test-studio-dubai-sale",
      description: "A test studio for sale in Dubai.",
      purpose: "SALE",
      propertyType: "APARTMENT",
      status: "PUBLISHED",
      priceAED: 950000,
      bedrooms: 0,
      bathrooms: 1,
      areaSqFt: 420,
      city: "DUBAI",
      publishedAt: now,
    },
  });

  // 5. Draft (public API mein nahi aani chahiye)
  await prisma.property.create({
    data: {
      title: "Test Draft Property",
      slug: "test-draft-property",
      description: "This must never appear publicly.",
      purpose: "SALE",
      propertyType: "VILLA",
      status: "DRAFT",
      priceAED: 700000,
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 900,
      city: "DUBAI",
    },
  });

  console.log("Seed done: 5 properties (4 published, 1 draft), 1 agent, 1 community, 2 amenities");
}

async function main() {
  if (process.argv[2] === "cleanup") {
    await cleanup();
  } else {
    await seed();
  }
}

main()
  .catch((error) => {
    console.error("TEMP SEED FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());