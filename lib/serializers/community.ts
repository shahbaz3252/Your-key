import type { Prisma } from "../../generated/prisma/client";
import { decimalToNumber } from "../serialize";

// Sirf yahi fields DB se aayenge. publicId, status, sortOrder, timestamps nahi.
export const communitySelect = {
  id: true,
  slug: true,
  name: true,
  nameAr: true,
  city: true,
  description: true,
  descriptionAr: true,
  imageUrl: true,
  avgBuyAED: true,
  avgRentAED: true,
  typesEn: true,
  typesAr: true,
  _count: {
    select: { properties: { where: { status: "PUBLISHED" } } },
  },
} satisfies Prisma.CommunitySelect;

export type CommunityRow = Prisma.CommunityGetPayload<{
  select: typeof communitySelect;
}>;

export function serializeCommunity(community: CommunityRow) {
  const { _count, avgBuyAED, avgRentAED, ...rest } = community;

  return {
    ...rest,
    avgBuyAED: decimalToNumber(avgBuyAED),
    avgRentAED: decimalToNumber(avgRentAED),
    propertyCount: _count.properties,
  };
}

export type PublicCommunity = ReturnType<typeof serializeCommunity>;