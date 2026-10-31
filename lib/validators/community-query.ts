import { z } from "zod";
import { CITY_MAP, mapped } from "./property-query";

export const communityQuerySchema = z.object({
  city: mapped(CITY_MAP, "city").optional(),
});

export type CommunityQuery = z.output<typeof communityQuerySchema>;

export function parseCommunityQuery(
  searchParams: URLSearchParams
): CommunityQuery {
  const city = searchParams.get("city");

  return communityQuerySchema.parse(
    city !== null && city.trim() !== "" ? { city } : {}
  );
}