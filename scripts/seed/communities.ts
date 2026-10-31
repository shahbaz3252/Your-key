import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/db";

const communities = [
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    nameAr: "دبي مارينا",
    city: "DUBAI",
    imageUrl: "/images/dubai-skyline.png",
    avgBuyAED: 2400000,
    avgRentAED: 145000,
    typesEn: "Apartments, Penthouses",
    typesAr: "شقق، بنتهاوس",
    sortOrder: 1,
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    nameAr: "وسط مدينة دبي",
    city: "DUBAI",
    imageUrl: "/images/penthouse.png",
    avgBuyAED: 3200000,
    avgRentAED: 180000,
    typesEn: "Apartments, Penthouses",
    typesAr: "شقق، بنتهاوس",
    sortOrder: 2,
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    nameAr: "نخلة جميرا",
    city: "DUBAI",
    imageUrl: "/images/luxury-villa.png",
    avgBuyAED: 8500000,
    avgRentAED: 420000,
    typesEn: "Villas, Apartments",
    typesAr: "فلل، شقق",
    sortOrder: 3,
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    nameAr: "الخليج التجاري",
    city: "DUBAI",
    imageUrl: "/images/modern-apartment.png",
    avgBuyAED: 1800000,
    avgRentAED: 110000,
    typesEn: "Apartments, Commercial",
    typesAr: "شقق، عقارات تجارية",
    sortOrder: 4,
  },
  {
    slug: "jbr",
    name: "JBR",
    nameAr: "جميرا بيتش ريزيدنس",
    city: "DUBAI",
    imageUrl: "/images/render-marina.png",
    avgBuyAED: 2700000,
    avgRentAED: 160000,
    typesEn: "Apartments, Penthouses",
    typesAr: "شقق، بنتهاوس",
    sortOrder: 5,
  },
  {
    slug: "saadiyat-island",
    name: "Saadiyat Island",
    nameAr: "جزيرة السعديات",
    city: "ABU_DHABI",
    imageUrl: "/images/abudhabi-skyline.png",
    avgBuyAED: 4800000,
    avgRentAED: 240000,
    typesEn: "Villas, Apartments",
    typesAr: "فلل، شقق",
    sortOrder: 6,
  },
  {
    slug: "yas-island",
    name: "Yas Island",
    nameAr: "جزيرة ياس",
    city: "ABU_DHABI",
    imageUrl: "/images/render-yas.png",
    avgBuyAED: 2500000,
    avgRentAED: 180000,
    typesEn: "Apartments, Villas",
    typesAr: "شقق، فلل",
    sortOrder: 7,
  },
  {
    slug: "al-reem-island",
    name: "Al Reem Island",
    nameAr: "جزيرة الريم",
    city: "ABU_DHABI",
    imageUrl: "/images/townhouse.png",
    avgBuyAED: 1700000,
    avgRentAED: 105000,
    typesEn: "Apartments, Townhouses",
    typesAr: "شقق، تاون هاوس",
    sortOrder: 8,
  },
] satisfies Prisma.CommunityCreateInput[];

export async function seedCommunities() {
  let created = 0;
  let skipped = 0;

  for (const community of communities) {
    const existing = await prisma.community.findUnique({
      where: { slug: community.slug },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.community.create({ data: community });
    created++;
  }

  console.log(`Communities: ${created} created, ${skipped} skipped`);
}