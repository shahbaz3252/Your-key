import type { Prisma } from "../../generated/prisma/client";

// Sirf yahi fields DB se aayenge.
export const amenitySelect = {
  id: true,
  slug: true,
  name: true,
  nameAr: true,
  icon: true,
} satisfies Prisma.AmenitySelect;

export type AmenityRow = Prisma.AmenityGetPayload<{
  select: typeof amenitySelect;
}>;

export function serializeAmenity(amenity: AmenityRow) {
  return { ...amenity };
}

export type PublicAmenity = ReturnType<typeof serializeAmenity>;