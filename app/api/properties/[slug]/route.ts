import type { NextRequest } from "next/server";
import { ApiError, handleError, ok } from "@/lib/api/response";
import { getPropertyBySlug } from "@/lib/services/properties";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const property = await getPropertyBySlug(slug.trim().toLowerCase());

    if (!property) {
      throw new ApiError("Property not found", 404);
    }

    return ok(property);
  } catch (error) {
    return handleError(error);
  }
}