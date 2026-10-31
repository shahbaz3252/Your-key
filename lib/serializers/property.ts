import type { Prisma } from "../../generated/prisma/client";
import { decimalToNumber } from "../serialize";

// ---------- Select whitelists (sirf yahi fields DB se aayenge) ----------

const communitySelect = {
  name: true,
  nameAr: true,
  slug: true,
} satisfies Prisma.CommunitySelect;

export const propertyListSelect = {
  id: true,
  slug: true,
  title: true,
  titleAr: true,
  purpose: true,
  propertyType: true,
  priceAED: true,
  bedrooms: true,
  bathrooms: true,
  areaSqFt: true,
  city: true,
  featured: true,
  community: { select: communitySelect },
  agent: {
    select: { name: true, nameAr: true, slug: true, imageUrl: true },
  },
  images: {
    select: { imageUrl: true, altText: true },
    orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
    take: 5,
  },
} satisfies Prisma.PropertySelect;

export const propertyDetailSelect = {
  id: true,
  slug: true,
  title: true,
  titleAr: true,
  description: true,
  descriptionAr: true,
  purpose: true,
  propertyType: true,
  priceAED: true,
  bedrooms: true,
  bathrooms: true,
  areaSqFt: true,
  address: true,
  city: true,
  featured: true,
  developer: true,
  completionDate: true,
  publishedAt: true,
  community: { select: communitySelect },
  agent: {
    select: {
      name: true,
      nameAr: true,
      slug: true,
      imageUrl: true,
      position: true,
      positionAr: true,
    },
  },
  images: {
    select: { imageUrl: true, altText: true },
    orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
  },
  amenities: {
    select: {
      amenity: {
        select: { name: true, nameAr: true, slug: true, icon: true },
      },
    },
    orderBy: { amenity: { name: "asc" } },
  },
} satisfies Prisma.PropertySelect;

// ---------- Row types (select se khud ban jate hain) ----------

export type PropertyListRow = Prisma.PropertyGetPayload<{
  select: typeof propertyListSelect;
}>;

export type PropertyDetailRow = Prisma.PropertyGetPayload<{
  select: typeof propertyDetailSelect;
}>;

// ---------- Serializers ----------

function serializeImage(image: { imageUrl: string; altText: string | null }) {
  return { url: image.imageUrl, altText: image.altText };
}

export function serializePropertyListItem(property: PropertyListRow) {
  const images = property.images.map(serializeImage);

  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    titleAr: property.titleAr,
    purpose: property.purpose,
    propertyType: property.propertyType,
    priceAED: decimalToNumber(property.priceAED) ?? 0,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    areaSqFt: property.areaSqFt,
    city: property.city,
    featured: property.featured,
    community: property.community,
    agent: property.agent,
    image: images[0] ?? null,
    images,
  };
}

export function serializePropertyDetail(property: PropertyDetailRow) {
  return {
    ...serializePropertyListItem(property),
    description: property.description,
    descriptionAr: property.descriptionAr,
    address: property.address,
    developer: property.developer,
    completionDate: property.completionDate?.toISOString() ?? null,
    publishedAt: property.publishedAt?.toISOString() ?? null,
    agent: property.agent,
    amenities: property.amenities.map((item) => item.amenity),
  };
}

export type PublicPropertyListItem = ReturnType<typeof serializePropertyListItem>;
export type PublicPropertyDetail = ReturnType<typeof serializePropertyDetail>;