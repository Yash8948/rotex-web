/*
  Warnings:

  - You are about to drop the column `maxPressure` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `minPressure` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `portSize` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT,
    "minPressure" REAL,
    "maxPressure" REAL,
    "orifice" TEXT,
    "flowFactor" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "subType" TEXT,
    "operatingType" TEXT,
    "actionType" TEXT,
    "portConnections" INTEGER,
    "operatorSize" TEXT,
    "bodyMaterial" TEXT,
    "sealMaterial" TEXT,
    "description" TEXT,
    "remark" TEXT,
    "approvals" JSONB,
    "specs" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("actionType", "category", "code", "createdAt", "id", "image", "name", "operatingType", "operatorSize", "slug", "subType", "tags", "updatedAt") SELECT "actionType", "category", "code", "createdAt", "id", "image", "name", "operatingType", "operatorSize", "slug", "subType", "tags", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_size_type_minPressure_maxPressure_orifice_flowFactor_key" ON "ProductVariant"("productId", "size", "type", "minPressure", "maxPressure", "orifice", "flowFactor");
