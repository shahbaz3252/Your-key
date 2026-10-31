import type { NextRequest } from "next/server";
import { buildMeta, parsePagination } from "@/lib/api/pagination";
import { handleError, ok } from "@/lib/api/response";
import { listProperties } from "@/lib/services/properties";
import { parsePropertyQuery } from "@/lib/validators/property-query";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const query = parsePropertyQuery(searchParams);
    const pagination = parsePagination(searchParams, {
      defaultPageSize: 12,
      maxPageSize: 50,
    });

    const { items, total } = await listProperties(query, pagination);

    return ok(items, { meta: buildMeta(total, pagination) });
  } catch (error) {
    return handleError(error);
  }
}