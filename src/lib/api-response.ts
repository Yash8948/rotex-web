import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, updatedAt: Date) {
  return NextResponse.json({
    success: true,
    data,
    meta: { updated_at: updatedAt.toISOString() },
  });
}

export function apiError(code: string, message: string, status: number) {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  );
}
