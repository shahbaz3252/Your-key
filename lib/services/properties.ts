import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db";
import {
  propertyDetailSelect,
  propertyListSelect,
  serializePropertyDetail,
  serializePropertyListItem,
} from "../serializers/property";
import type { PropertyQuery } from "../validators/property-query";

// ---------- where ----------

function buildWhere(query: PropertyQuery): Prisma.PropertyWhereInput {
  // Public API: sirf PUBLISHED. Yeh filter kabhi hataana nahi.
  const where: Prisma.PropertyWhereInput = { status: "PUBLISHED" };

  if (query.purpose) where.purpose = query.purpose;
  if (query.propertyType) where.propertyType = query.propertyType;
  if (query.city) where.city = query.city;
  if (query.community) where.community = { slug: query.community };
  if (query.featured !== undefined) where.featured = query.featured;

  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    where.priceAED = {
      ...(query.minPrice !== undefined ? { gte: query.minPrice } : {}),
      ...(query.maxPrice !== undefined ? { lte: query.maxPrice } : {}),
    };
  }

  if (query.minArea !== undefined || query.maxArea !== undefined) {
    where.areaSqFt = {
      ...(query.minArea !== undefined ? { gte: query.minArea } : {}),
      ...(query.maxArea !== undefined ? { lte: query.maxArea } : {}),
    };
  }

  if (query.bedrooms) {
    where.bedrooms = query.bedrooms.plus
      ? { gte: query.bedrooms.value }
      : query.bedrooms.value;
  }

  if (query.bathrooms) {
    where.bathrooms = query.bathrooms.plus
      ? { gte: query.bathrooms.value }
      : query.bathrooms.value;
  }

  return where;
}

// ---------- orderBy ----------

function buildOrderBy(
  sort: PropertyQuery["sort"]
): Prisma.PropertyOrderByWithRelationInput[] {
  switch (sort) {
    case "price-asc":
      return [{ priceAED: "asc" }, { id: "asc" }];
    case "price-desc":
      return [{ priceAED: "desc" }, { id: "asc" }];
    case "area-asc":
      return [{ areaSqFt: "asc" }, { id: "asc" }];
    case "area-desc":
      return [{ areaSqFt: "desc" }, { id: "asc" }];
    case "newest":
    default:
      return [
        { publishedAt: { sort: "desc", nulls: "last" } },
        { createdAt: "desc" },
        { id: "asc" },
      ];
  }
}

// ---------- public functions ----------

export async function listProperties(
  query: PropertyQuery,
  pagination: { skip: number; take: number }
) {
  const where = buildWhere(query);

  const [total, rows] = await Promise.all([
    prisma.property.count({ where }),
    prisma.property.findMany({
      where,
      orderBy: buildOrderBy(query.sort),
      skip: pagination.skip,
      take: pagination.take,
      select: propertyListSelect,
    }),
  ]);

  return { items: rows.map(serializePropertyListItem), total };
}

export async function getPropertyBySlug(slug: string) {
  const row = await prisma.property.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: propertyDetailSelect,
  });

  return row ? serializePropertyDetail(row) : null;
}