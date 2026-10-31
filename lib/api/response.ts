import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 400, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function ok<T>(
  data: T,
  options?: { status?: number; meta?: Record<string, unknown> }
) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(options?.meta ? { meta: options.meta } : {}),
    },
    { status: options?.status ?? 200 }
  );
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        ...(details ? { details } : {}),
      },
    },
    { status }
  );
}

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    return fail(error.message, error.status, error.details);
  }

  if (error instanceof ZodError) {
    return fail(
      "Validation failed",
      422,
      error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }))
    );
  }

  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: string }).code;

    if (code === "P2002") {
      return fail("A record with this value already exists", 409);
    }

    if (code === "P2025") {
      return fail("Record not found", 404);
    }
  }

  console.error("Unhandled API error:", error);

  return fail("Something went wrong", 500);
}