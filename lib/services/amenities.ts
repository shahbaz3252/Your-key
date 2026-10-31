import { prisma } from "../db";
import { amenitySelect, serializeAmenity } from "../serializers/amenity";

export async function listAmenities() {
  const rows = await prisma.amenity.findMany({
    orderBy: [{ name: "asc" }, { id: "asc" }],
    select: amenitySelect,
  });

  return rows.map(serializeAmenity);
}