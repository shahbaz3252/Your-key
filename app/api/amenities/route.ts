import { handleError, ok } from "@/lib/api/response";
import { listAmenities } from "@/lib/services/amenities";

export async function GET() {
  try {
    const amenities = await listAmenities();

    return ok(amenities, { meta: { total: amenities.length } });
  } catch (error) {
    return handleError(error);
  }
}