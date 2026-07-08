import * as XLSX from "xlsx";
import type { PrismaClient } from "@/generated/prisma/client";

// ── Source layout ────────────────────────────────────────────────────────────
// Sheet "Copy of Valve Data Base": rows 1-3 are headers/notes, data starts row 4.
// Columns "sub-industries" (44), "is_solenoid" (45) and the trailing unnamed
// column (46) are verified exact duplicates of "Catalogue page" (39), "IOM link"
// (40) and "DATA Sheet" (41) — copy/paste artifacts, not real data. "image of
// model" (38) and "Long Product Description" (43) contain corrupted values
// (stray filenames / unrelated codes), not usable images or prose. All five are
// intentionally excluded below.

export const SHEET_NAME = "Copy of Valve Data Base";
const HEADER_ROWS = 3;

const COL = {
  SIZE: 0,
  TYPE: 1,
  MIN_PRESSURE: 2,
  MAX_PRESSURE: 3,
  ORIFICE: 4,
  FLOW_FACTOR: 5,
  MODEL_NUMBER: 6,
  MIN_PILOT_PRESSURE: 7,
  BODY_MATERIAL: 8,
  SEAL_MATERIAL: 9,
  MANUAL_OVERRIDE: 10,
  WEATHER_PROOF_OPTIONS: 11,
  EXPLOSION_PROOF_OPTIONS: 12,
  INTRINSICALLY_SAFE_OPTIONS: 13,
  SOLENOID_SIZE: 14,
  LARGE_ENCLOSURE: 15,
  OXYGEN_SUFFIX: 16,
  CRYOGENIC_SUFFIX: 17,
  COPPER_FREE_SUFFIX: 18,
  AMMONIA_SUFFIX: 19,
  AC_INRUSH: 20,
  AC_HOLDING: 21,
  POWER_AC: 22,
  POWER_AC_DC: 23,
  POWER_DC: 24,
  PORT_CONNECTIONS: 25,
  FUNCTIONAL_TYPE: 26,
  SPECIALTY_APPLICATION: 27,
  DESIGN_TYPE: 28,
  ENGINEERING_TYPE: 29,
  MEDIA: 30,
  DEFAULT_BODY_MATERIAL_TYPE: 31,
  VOLTAGE_VARIATION: 32,
  REMARK: 33,
  EAC_APPROVAL: 34,
  SIL3: 35,
  CE_APPROVAL: 36,
  MARINE_APPROVAL: 37,
  CATALOGUE_PAGE: 39,
  IOM_LINK: 40,
  DATA_SHEET: 41,
} as const;

// ── Category mapping — edit this table as prefixes are confirmed/corrected ──
const CATEGORY_RULES: { prefix: RegExp; category: string }[] = [
  { prefix: /^GD/i, category: "Actuators" },
  { prefix: /^GV/i, category: "Actuators" },
  { prefix: /^FA/i, category: "Angle Seat Valve" },
  { prefix: /^FB/i, category: "Angle Seat Valve" },
];
const DEFAULT_CATEGORY = "Solenoid Valve";
// Prefixes known to legitimately fall through to DEFAULT_CATEGORY (verified
// against the source data). Anything outside this + CATEGORY_RULES is logged
// as an unrecognized prefix rather than silently defaulted.
const KNOWN_DEFAULT_PREFIX = /^([0-9]|PV|P|M|L|I|MV)/i;

function categoryForCode(code: string): string {
  const rule = CATEGORY_RULES.find((r) => r.prefix.test(code));
  return rule ? rule.category : DEFAULT_CATEGORY;
}

const CATEGORY_SINGULAR: Record<string, string> = {
  "Solenoid Valve": "Solenoid Valve",
  Actuators: "Actuator",
  "Angle Seat Valve": "Angle Seat Valve",
};

const ACTION_LABELS: Record<string, string> = {
  NC: "Normally Closed",
  NO: "Normally Open",
  Universal: "Universal",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function toStr(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

function toNum(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  const s = String(v).trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Row = unknown[];

type VariantInput = {
  size: string;
  type: string | null;
  minPressure: number | null;
  maxPressure: number | null;
  orifice: string | null;
  flowFactor: string | null;
  optionCode: string | null;
};

// Numeric-prefixed Model Numbers often carry a trailing option suffix (e.g.
// "24106A", "24106AE", "20101EP", "30125-EP") that Rotex treats as an
// ordering option on a shared base model, not a distinct product — the base
// model's core spec (size/pressure/orifice/flow) repeats identically across
// the suffix family (verified against the source data). Letter-prefixed
// codes (FA/FB/GD/GV/...) are fully-structured part numbers with no such
// base+suffix split, so they're left untouched.
function parseCode(rawCode: string): { baseCode: string; optionCode: string | null } {
  if (!/^[0-9]/.test(rawCode)) return { baseCode: rawCode, optionCode: null };
  const baseCode = rawCode.match(/^[0-9]+/)![0];
  const suffix = rawCode.slice(baseCode.length).replace(/^-+/, "");
  return { baseCode, optionCode: suffix || null };
}

function buildVariants(groupRows: Row[]): VariantInput[] {
  const byKey = new Map<string, VariantInput>();
  for (const row of groupRows) {
    const size = toStr(row[COL.SIZE]);
    if (!size) continue;
    const { optionCode } = parseCode(toStr(row[COL.MODEL_NUMBER]) ?? "");
    const variant: VariantInput = {
      size,
      type: toStr(row[COL.TYPE]),
      minPressure: toNum(row[COL.MIN_PRESSURE]),
      maxPressure: toNum(row[COL.MAX_PRESSURE]),
      orifice: toStr(row[COL.ORIFICE]),
      flowFactor: toStr(row[COL.FLOW_FACTOR]),
      optionCode,
    };
    const key = [
      variant.size,
      variant.type,
      variant.minPressure,
      variant.maxPressure,
      variant.orifice,
      variant.flowFactor,
      variant.optionCode,
    ].join("|");
    if (!byKey.has(key)) byKey.set(key, variant);
  }
  return [...byKey.values()];
}

function buildSpecs(first: Row): PrismaJson.ProductSpecs {
  const specs: PrismaJson.ProductSpecs = {};
  const set = (key: string, value: string | number | null) => {
    if (value !== null) specs[key] = value;
  };
  set("Manual Override", toStr(first[COL.MANUAL_OVERRIDE]));
  set("Weather Proof Options", toStr(first[COL.WEATHER_PROOF_OPTIONS]));
  set("Explosion Proof Options", toStr(first[COL.EXPLOSION_PROOF_OPTIONS]));
  set("Intrinsically Safe Options", toStr(first[COL.INTRINSICALLY_SAFE_OPTIONS]));
  set("Solenoid Size", toStr(first[COL.SOLENOID_SIZE]));
  set("Large Enclosure", toStr(first[COL.LARGE_ENCLOSURE]));
  set("Oxygen (Suffix - OX)", toStr(first[COL.OXYGEN_SUFFIX]));
  set("Cryogenic (Suffix - SZ)", toStr(first[COL.CRYOGENIC_SUFFIX]));
  set("Copper Free (Suffix - CF)", toStr(first[COL.COPPER_FREE_SUFFIX]));
  set("Ammonia (Suffix - AM)", toStr(first[COL.AMMONIA_SUFFIX]));
  set("AC Inrush (W)", toNum(first[COL.AC_INRUSH]));
  set("AC Holding (VI)", toNum(first[COL.AC_HOLDING]));
  set("Power AC (W)", toNum(first[COL.POWER_AC]));
  set("AC/DC Version Power (W)", toNum(first[COL.POWER_AC_DC]));
  set("DC Power (W)", toNum(first[COL.POWER_DC]));
  set("Minimum Pilot Pressure (bar)", toNum(first[COL.MIN_PILOT_PRESSURE]));
  set("Speciality Application", toStr(first[COL.SPECIALTY_APPLICATION]));
  set("Media", toStr(first[COL.MEDIA]));
  set("Default Body Material Type", toStr(first[COL.DEFAULT_BODY_MATERIAL_TYPE]));
  set("Voltage Variation", toStr(first[COL.VOLTAGE_VARIATION]));
  set("Catalogue Page", toStr(first[COL.CATALOGUE_PAGE]));
  set("IOM Link", toStr(first[COL.IOM_LINK]));
  set("Data Sheet", toStr(first[COL.DATA_SHEET]));
  return specs;
}

// ── Import ───────────────────────────────────────────────────────────────────

export type ImportSummary = {
  created: number;
  updated: number;
  totalVariants: number;
  skippedNoCode: number;
  unrecognizedPrefixes: string[];
};

export async function importProductsFromWorkbook(
  prisma: PrismaClient,
  workbook: XLSX.WorkBook,
  opts: { dryRun?: boolean } = {}
): Promise<ImportSummary> {
  const dryRun = opts.dryRun ?? false;

  const sheet = workbook.Sheets[SHEET_NAME];
  if (!sheet) throw new Error(`Sheet "${SHEET_NAME}" not found in workbook`);

  const rows = (XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, raw: true }) as Row[]).slice(HEADER_ROWS);

  const groups = new Map<string, Row[]>();
  let skippedNoCode = 0;
  for (const row of rows) {
    const rawCode = toStr(row[COL.MODEL_NUMBER]);
    if (!rawCode) {
      skippedNoCode++;
      continue;
    }
    const { baseCode } = parseCode(rawCode);
    if (!groups.has(baseCode)) groups.set(baseCode, []);
    groups.get(baseCode)!.push(row);
  }

  let created = 0;
  let updated = 0;
  let totalVariants = 0;
  const unrecognizedPrefixes = new Set<string>();

  for (const [code, groupRows] of groups) {
    const first = groupRows[0];
    const category = categoryForCode(code);
    if (!CATEGORY_RULES.some((r) => r.prefix.test(code)) && !KNOWN_DEFAULT_PREFIX.test(code)) {
      unrecognizedPrefixes.add(code);
    }

    const operatingType = toStr(first[COL.DESIGN_TYPE]);
    const actionTypeRaw = toStr(first[COL.FUNCTIONAL_TYPE]);
    const actionLabel = (actionTypeRaw && ACTION_LABELS[actionTypeRaw]) ?? actionTypeRaw ?? "";
    const categorySingular = CATEGORY_SINGULAR[category] ?? category;
    const name = [titleCase(operatingType ?? ""), actionLabel, categorySingular]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    const slug = slugify(`${name}-${code}`);
    const portConnections = toNum(first[COL.PORT_CONNECTIONS]);
    const tags: string[] = [];
    if (portConnections !== null) tags.push(`${portConnections} Way`);
    if (actionLabel) tags.push(actionLabel);

    const variants = buildVariants(groupRows);
    totalVariants += variants.length;

    if (dryRun) {
      console.log(`[dry-run] ${code} -> "${name}" (${category}), ${variants.length} variant(s)`);
      continue;
    }

    const specs = buildSpecs(first);
    const approvals: PrismaJson.ProductApprovals = {
      eac: toStr(first[COL.EAC_APPROVAL]),
      sil3: toStr(first[COL.SIL3]),
      ce: toStr(first[COL.CE_APPROVAL]),
      marine: toStr(first[COL.MARINE_APPROVAL]),
    };
    const bodyMaterial = toStr(first[COL.BODY_MATERIAL]);
    const sealMaterial = toStr(first[COL.SEAL_MATERIAL]);
    const subType = toStr(first[COL.ENGINEERING_TYPE]);
    const remark = toStr(first[COL.REMARK]);

    const wasCreated = await prisma.$transaction(async (tx) => {
      const existing = await tx.product.findUnique({ where: { code } });

      const product = await tx.product.upsert({
        where: { code },
        create: {
          slug,
          code,
          name,
          category,
          image: `https://placehold.co/400x400?text=${encodeURIComponent(code)}`,
          tags,
          subType,
          operatingType,
          actionType: actionTypeRaw,
          portConnections,
          bodyMaterial,
          sealMaterial,
          remark,
          approvals,
          specs,
        },
        // slug/image are admin-owned once set — re-imports refresh catalog data
        // but never clobber a manually curated slug or uploaded image.
        update: {
          name,
          category,
          tags,
          subType,
          operatingType,
          actionType: actionTypeRaw,
          portConnections,
          bodyMaterial,
          sealMaterial,
          remark,
          approvals,
          specs,
        },
      });

      await tx.productVariant.deleteMany({ where: { productId: product.id } });
      if (variants.length) {
        await tx.productVariant.createMany({
          data: variants.map((v) => ({ ...v, productId: product.id })),
        });
      }

      return !existing;
    });

    if (wasCreated) created++;
    else updated++;
  }

  return { created, updated, totalVariants, skippedNoCode, unrecognizedPrefixes: [...unrecognizedPrefixes] };
}
