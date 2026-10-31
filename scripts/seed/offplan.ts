import { prisma } from "../../lib/db";
import type {
  City,
  PropertyType,
} from "../../generated/prisma/enums";

type OffPlanSeed = {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  propertyType: PropertyType;
  priceAED: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  city: City;
  communitySlug: string | null;
  agentSlug: string;
  completionDate: Date | null;
  publishedAt: Date;
  image: string;
  amenitySlugs: string[];
};

const items: OffPlanSeed[] = [
  {
    slug: "private-villa-collection",
    title: "Private Villa Collection",
    titleAr: "مجموعة الفلل الخاصة",
    description:
      "A collection of luxury villas under construction in Dubai. Placeholder description, update from the admin dashboard.",
    propertyType: "VILLA",
    priceAED: 7500000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7000,
    city: "DUBAI",
    communitySlug: null,
    agentSlug: "sultan-umar",
    completionDate: new Date("2027-12-31"),
    publishedAt: new Date("2026-09-30"),
    image: "/images/luxury-villa.png",
    amenitySlugs: [
      "swimming-pool",
      "covered-parking",
      "security-24-7",
      "garden",
      "smart-home",
      "central-ac",
    ],
  },
  {
    slug: "marina-residences",
    title: "Marina Residences",
    titleAr: "مساكن المارينا",
    description:
      "Waterfront living in Dubai Marina, currently under construction. Placeholder description, update from the admin dashboard.",
    propertyType: "APARTMENT",
    priceAED: 2600000,
    bedrooms: 2,
    bathrooms: 3,
    areaSqFt: 1350,
    city: "DUBAI",
    communitySlug: "dubai-marina",
    agentSlug: "sameet-kumar",
    completionDate: new Date("2027-06-30"),
    publishedAt: new Date("2026-09-29"),
    image: "/images/render-marina.png",
    amenitySlugs: [
      "swimming-pool",
      "gym",
      "covered-parking",
      "balcony",
      "sea-view",
      "security-24-7",
    ],
  },
  {
    slug: "saadiyat-residences",
    title: "Saadiyat Residences",
    titleAr: "مساكن السعديات",
    description:
      "Island living on Saadiyat Island, currently under construction. Placeholder description, update from the admin dashboard.",
    propertyType: "APARTMENT",
    priceAED: 3900000,
    bedrooms: 3,
    bathrooms: 4,
    areaSqFt: 2100,
    city: "ABU_DHABI",
    communitySlug: "saadiyat-island",
    agentSlug: "aanis-khalil",
    completionDate: new Date("2028-03-31"),
    publishedAt: new Date("2026-09-28"),
    image: "/images/render-saadiyat.png",
    amenitySlugs: [
      "swimming-pool",
      "gym",
      "private-beach",
      "sea-view",
      "concierge",
      "central-ac",
    ],
  },
  {
    slug: "family-townhouse-saadiyat",
    title: "Family Townhouse in Saadiyat",
    titleAr: "تاون هاوس عائلي في السعديات",
    description:
      "A family townhouse on Saadiyat Island. Placeholder description, update from the admin dashboard.",
    propertyType: "TOWNHOUSE",
    priceAED: 5400000,
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3200,
    city: "ABU_DHABI",
    communitySlug: "saadiyat-island",
    agentSlug: "aanis-khalil",
    completionDate: null,
    publishedAt: new Date("2026-09-27"),
    image: "/images/render-saadiyat.png",
    amenitySlugs: [
      "swimming-pool",
      "covered-parking",
      "garden",
      "security-24-7",
      "kids-play-area",
      "central-ac",
    ],
  },
];

export async function seedOffPlanProperties() {
  let created = 0;
  let skipped = 0;

  for (const item of items) {
    const existing = await prisma.property.findUnique({
      where: { slug: item.slug },
      select: { id: true },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    const community = item.communitySlug
      ? await prisma.community.findUnique({
          where: { slug: item.communitySlug },
          select: { id: true },
        })
      : null;

    if (item.communitySlug && !community) {
      throw new Error(`Community not found: ${item.communitySlug}`);
    }

    const agent = await prisma.agent.findUnique({
      where: { slug: item.agentSlug },
      select: { id: true },
    });

    if (!agent) {
      throw new Error(`Agent not found: ${item.agentSlug}`);
    }

    const amenities = await prisma.amenity.findMany({
      where: { slug: { in: item.amenitySlugs } },
      select: { id: true },
    });

    if (amenities.length !== item.amenitySlugs.length) {
      throw new Error(`Some amenities are missing for: ${item.slug}`);
    }

    await prisma.property.create({
      data: {
        slug: item.slug,
        title: item.title,
        titleAr: item.titleAr,
        description: item.description,
        purpose: "OFF_PLAN",
        propertyType: item.propertyType,
        status: "PUBLISHED",
        priceAED: item.priceAED,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        areaSqFt: item.areaSqFt,
        city: item.city,
        communityId: community?.id ?? null,
        agentId: agent.id,
        featured: false,
        completionDate: item.completionDate,
        publishedAt: item.publishedAt,
        images: {
          create: [
            {
              imageUrl: item.image,
              publicId: `seed/${item.slug}-1`,
              altText: item.title,
              sortOrder: 0,
              isPrimary: true,
            },
          ],
        },
        amenities: {
          create: amenities.map((amenity) => ({
            amenityId: amenity.id,
          })),
        },
      },
    });

    created += 1;
  }

  console.log(`Off-plan: ${created} created, ${skipped} skipped`);
}