import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { importProductsFromWorkbook, SHEET_NAME } from "@/lib/product-import";

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Sign in required" } },
      { status: 401 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, error: { code: "BAD_REQUEST", message: "No file provided" } },
      { status: 400 }
    );
  }

  if (!/\.xlsx?$/i.test(file.name)) {
    return NextResponse.json(
      { success: false, error: { code: "UNSUPPORTED_TYPE", message: "File must be .xlsx or .xls" } },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { success: false, error: { code: "TOO_LARGE", message: "File exceeds 20MB limit" } },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: "buffer" });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "PARSE_ERROR", message: "Could not read the Excel file" } },
      { status: 400 }
    );
  }

  if (!workbook.Sheets[SHEET_NAME]) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "MISSING_SHEET", message: `Sheet "${SHEET_NAME}" not found in the uploaded file` },
      },
      { status: 400 }
    );
  }

  try {
    const summary = await importProductsFromWorkbook(prisma, workbook);
    return NextResponse.json({ success: true, data: summary });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: { code: "IMPORT_FAILED", message: "Import failed. Check server logs." } },
      { status: 500 }
    );
  }
}
