import "dotenv/config";
import path from "node:path";
import * as XLSX from "xlsx";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { importProductsFromWorkbook, SHEET_NAME } from "../src/lib/product-import";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!.replace(/^file:/, ""),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const filePath = args.find((a) => !a.startsWith("--")) ?? path.join(process.cwd(), "examples", "sample_upload.xlsx");

  console.log(`Reading ${filePath} (sheet "${SHEET_NAME}")${dryRun ? " [dry-run]" : ""}...`);
  const wb = XLSX.readFile(filePath);

  const summary = await importProductsFromWorkbook(prisma, wb, { dryRun });

  console.log(
    `\nDone. ${summary.created} product(s) created, ${summary.updated} updated, ${summary.totalVariants} variant(s) written, ${summary.skippedNoCode} row(s) skipped (no model number).`
  );
  if (summary.unrecognizedPrefixes.length) {
    console.warn(
      `Unrecognized model-number prefixes defaulted to "Solenoid Valve" — review CATEGORY_RULES in src/lib/product-import.ts if these need a different category:\n  ${summary.unrecognizedPrefixes.join(", ")}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
