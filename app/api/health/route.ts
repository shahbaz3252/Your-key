import { prisma } from "@/lib/db";
import { ok, handleError } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return ok({
      status: "ok",
      database: "connected",
      time: new Date().toISOString(),
    });
  } catch (error) {
    return handleError(error);
  }
}