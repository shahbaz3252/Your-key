import { z } from "zod";
import type {
  City,
  PropertyPurpose,
  PropertyType,
} from "../../generated/prisma/enums";

// ---------- URL value -> DB enum maps ----------

const PURPOSE_MAP: Record<string, PropertyPurpose> = {
  sale: "SALE",
  sales: "SALE",
  buy: "SALE",
  rent: "RENT",
  "off-plan": "OFF_PLAN",
  offplan: "OFF_PLAN",
};

const TYPE_MAP: Record<string, PropertyType> = {
  apartment: "APARTMENT",
  villa: "VILLA",
  penthouse: "PENTHOUSE",
  townhouse: "TOWNHOUSE",
};

const CITY_MAP: Record<string, City> = {
  dubai: "DUBAI",
  "abu-dhabi": "ABU_DHABI",
};

// ---------- helpers ----------

function normalize(value: unknown) {
  return typeof value === "string"
    ? value.trim().toLowerCase().replace(/_/g, "-")
    : value;
}

function mapped<T extends string>(map: Record<string, T>, label: string) {
  const keys = Object.keys(map) as [string, ...string[]];
  return z
    .preprocess(
      normalize,
      z.enum(keys, { error: `Invalid ${label}. Allowed: ${keys.join(", ")}` })
    )
    .transform((key) => map[key]);
}

// "0", "3", "4+", "studio" (aur "4 " jab "+" URL mein space ban jaye)
const countFilter = z
  .preprocess(
    (v) => (typeof v === "string" ? v.toLowerCase() : v),
    z.string().regex(/^(studio|\d{1,2})[+ ]?$/, {
      error: 'Use a number like "3", "4+" or "studio"',
    })
  )
  .transform((v) => {
    if (v === "studio") return { value: 0, plus: false };
    const plus = v.endsWith("+") || v.endsWith(" ");
    return { value: Number(v.replace(/[+ ]/g, "")), plus };
  });

const price = z.coerce.number().min(0).max(999_999_999_999);
const area = z.coerce.number().int().min(0).max(10_000_000);

const bool = z
  .enum(["true", "false"], { error: 'Use "true" or "false"' })
  .transform((v) => v === "true");

const communitySlug = z
  .preprocess(
    (v) =>
      typeof v === "string"
        ? v.trim().toLowerCase().replace(/\s+/g, "-")
        : v,
    z
      .string()
      .max(100)
      .regex(/^[a-z0-9-]+$/, { error: "Invalid community slug" })
  );

export const PROPERTY_SORTS = [
  "newest",
  "price-asc",
  "price-desc",
  "area-asc",
  "area-desc",
] as const;

// ---------- schema ----------

export const propertyQuerySchema = z
  .object({
    purpose: mapped(PURPOSE_MAP, "purpose").optional(),
    propertyType: mapped(TYPE_MAP, "propertyType").optional(),
    city: mapped(CITY_MAP, "city").optional(),
    community: communitySlug.optional(),
    minPrice: price.optional(),
    maxPrice: price.optional(),
    bedrooms: countFilter.optional(),
    bathrooms: countFilter.optional(),
    minArea: area.optional(),
    maxArea: area.optional(),
    featured: bool.optional(),
    sort: z.enum(PROPERTY_SORTS).default("newest"),
  })
  .refine(
    (q) =>
      q.minPrice === undefined ||
      q.maxPrice === undefined ||
      q.minPrice <= q.maxPrice,
    { error: "minPrice cannot be greater than maxPrice", path: ["maxPrice"] }
  )
  .refine(
    (q) =>
      q.minArea === undefined ||
      q.maxArea === undefined ||
      q.minArea <= q.maxArea,
    { error: "minArea cannot be greater than maxArea", path: ["maxArea"] }
  );

export type PropertyQuery = z.output<typeof propertyQuerySchema>;

// ---------- entry point ----------

const QUERY_KEYS = [
  "purpose",
  "propertyType",
  "city",
  "community",
  "minPrice",
  "maxPrice",
  "bedrooms",
  "bathrooms",
  "minArea",
  "maxArea",
  "featured",
  "sort",
] as const;

/**
 * URLSearchParams se sirf maloom keys uthata hai, khali values ignore karta hai,
 * phir validate karta hai. Galat input par ZodError throw hota hai
 * (handleError use 422 bana dega).
 */
export function parsePropertyQuery(searchParams: URLSearchParams): PropertyQuery {
  const raw: Record<string, string> = {};

  for (const key of QUERY_KEYS) {
    const value = searchParams.get(key);
    if (value !== null && value.trim() !== "") {
      raw[key] = value;
    }
  }

  return propertyQuerySchema.parse(raw);
}