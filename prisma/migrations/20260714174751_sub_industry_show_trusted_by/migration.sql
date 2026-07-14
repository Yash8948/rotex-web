-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubIndustry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "showTrustedBy" BOOLEAN NOT NULL DEFAULT true,
    "challengesTitle" TEXT NOT NULL,
    "solutionsTitle" TEXT NOT NULL,
    "solutionsIntro" TEXT NOT NULL,
    "challenges" JSONB NOT NULL,
    "solutions" JSONB NOT NULL,
    "recommendedProducts" JSONB NOT NULL,
    "industryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SubIndustry_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubIndustry" ("challenges", "challengesTitle", "createdAt", "description", "id", "industryId", "name", "recommendedProducts", "slug", "solutions", "solutionsIntro", "solutionsTitle") SELECT "challenges", "challengesTitle", "createdAt", "description", "id", "industryId", "name", "recommendedProducts", "slug", "solutions", "solutionsIntro", "solutionsTitle" FROM "SubIndustry";
DROP TABLE "SubIndustry";
ALTER TABLE "new_SubIndustry" RENAME TO "SubIndustry";
CREATE UNIQUE INDEX "SubIndustry_industryId_slug_key" ON "SubIndustry"("industryId", "slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
