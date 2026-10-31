import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/db";

// Pehli image primary hoti hai, baaqi uske baad.
function images(slug: string, alt: string, urls: string[]) {
  return {
    create: urls.map((imageUrl, index) => ({
      imageUrl,
      publicId: `seed/${slug}-${index + 1}`,
      altText: alt,
      sortOrder: index,
      isPrimary: index === 0,
    })),
  };
}

function amenityLinks(slugs: string[]) {
  return {
    create: slugs.map((slug) => ({ amenity: { connect: { slug } } })),
  };
}

const properties = [
  {
    slug: "ultra-luxury-beachfront-villa",
    title: "Ultra-Luxury Beachfront Villa",
    titleAr: "فيلا شاطئية فائقة الفخامة",
    description:
      "A signature beachfront villa on Palm Jumeirah with private beach access, sweeping sea views and generous indoor and outdoor living spaces.",
    purpose: "SALE",
    propertyType: "VILLA",
    status: "PUBLISHED",
    priceAED: 18500000,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8200,
    city: "DUBAI",
    featured: true,
    publishedAt: new Date("2026-10-06T10:00:00Z"),
    community: { connect: { slug: "palm-jumeirah" } },
    agent: { connect: { slug: "sultan-umar" } },
    images: images(
      "ultra-luxury-beachfront-villa",
      "Ultra-Luxury Beachfront Villa",
      ["/images/luxury-villa.png"]
    ),
    amenities: amenityLinks([
      "swimming-pool",
      "private-beach",
      "sea-view",
      "security-24-7",
      "covered-parking",
      "garden",
      "smart-home",
      "central-ac",
    ]),
  },
  {
    slug: "penthouse-above-the-clouds",
    title: "Penthouse Above the Clouds",
    titleAr: "بنتهاوس فوق السحاب",
    description:
      "A sky-high penthouse in the heart of Downtown Dubai with floor-to-ceiling glass and sweeping skyline views.",
    purpose: "SALE",
    propertyType: "PENTHOUSE",
    status: "PUBLISHED",
    priceAED: 25000000,
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 6800,
    city: "DUBAI",
    featured: true,
    publishedAt: new Date("2026-10-05T10:00:00Z"),
    community: { connect: { slug: "downtown-dubai" } },
    agent: { connect: { slug: "sameet-kumar" } },
    images: images(
      "penthouse-above-the-clouds",
      "Penthouse Above the Clouds",
      ["/images/glass-facade.png", "/images/penthouse.png"]
    ),
    amenities: amenityLinks([
      "swimming-pool",
      "gym",
      "concierge",
      "security-24-7",
      "balcony",
      "covered-parking",
      "smart-home",
      "central-ac",
    ]),
  },
  {
    slug: "waterfront-apartment-for-rent",
    title: "Waterfront Apartment for Rent",
    titleAr: "شقة للإيجار على الواجهة البحرية",
    description:
      "A bright one-bedroom apartment in Dubai Marina with waterfront views and easy access to the promenade. Listed at the yearly rent.",
    purpose: "RENT",
    propertyType: "APARTMENT",
    status: "PUBLISHED",
    priceAED: 145000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqFt: 820,
    city: "DUBAI",
    featured: true,
    publishedAt: new Date("2026-10-03T10:00:00Z"),
    community: { connect: { slug: "dubai-marina" } },
    agent: { connect: { slug: "sultan-umar" } },
    images: images(
      "waterfront-apartment-for-rent",
      "Waterfront Apartment for Rent",
      ["/images/render-marina.png"]
    ),
    amenities: amenityLinks([
      "swimming-pool",
      "gym",
      "sea-view",
      "balcony",
      "security-24-7",
      "covered-parking",
      "central-ac",
    ]),
  },
  {
    slug: "yas-island-residence",
    title: "Yas Island Residence",
    titleAr: "سكن فاخر في جزيرة ياس",
    description:
      "A spacious three-bedroom residence on Yas Island, close to leisure, dining and entertainment. Listed at the yearly rent.",
    purpose: "RENT",
    propertyType: "APARTMENT",
    status: "PUBLISHED",
    priceAED: 180000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 1850,
    city: "ABU_DHABI",
    featured: true,
    publishedAt: new Date("2026-10-02T10:00:00Z"),
    community: { connect: { slug: "yas-island" } },
    agent: { connect: { slug: "aanis-khalil" } },
    images: images("yas-island-residence", "Yas Island Residence", [
      "/images/abudhabi-skyline.png",
      "/images/render-yas.png",
    ]),
    amenities: amenityLinks([
      "swimming-pool",
      "gym",
      "kids-play-area",
      "balcony",
      "security-24-7",
      "covered-parking",
      "central-ac",
    ]),
  },
  {
    slug: "modern-apartment-marina-views",
    title: "Modern Apartment with Marina Views",
    titleAr: "شقة عصرية بإطلالات على المارينا",
    description:
      "A modern two-bedroom apartment in Dubai Marina with marina views and access to premium building facilities.",
    purpose: "SALE",
    propertyType: "APARTMENT",
    status: "PUBLISHED",
    priceAED: 2800000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1450,
    city: "DUBAI",
    featured: true,
    publishedAt: new Date("2026-10-01T10:00:00Z"),
    community: { connect: { slug: "dubai-marina" } },
    agent: { connect: { slug: "aanis-khalil" } },
    images: images(
      "modern-apartment-marina-views",
      "Modern Apartment with Marina Views",
      ["/images/dubai-skyline.png", "/images/modern-apartment.png"]
    ),
    amenities: amenityLinks([
      "swimming-pool",
      "gym",
      "sea-view",
      "balcony",
      "security-24-7",
      "covered-parking",
      "central-ac",
    ]),
  },
] satisfies Prisma.PropertyCreateInput[];

export async function seedProperties() {
  let created = 0;
  let skipped = 0;

  for (const property of properties) {
    const existing = await prisma.property.findUnique({
      where: { slug: property.slug },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.property.create({ data: property });
    created++;
  }

  console.log(`Properties: ${created} created, ${skipped} skipped`);
}