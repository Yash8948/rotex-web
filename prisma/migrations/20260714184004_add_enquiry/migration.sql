-- AlterTable
ALTER TABLE "SubIndustry" ADD COLUMN "image" TEXT;

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "industryName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "enquiryType" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "company" TEXT,
    "designation" TEXT,
    "message" TEXT NOT NULL,
    "fileUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomerStory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_CustomerStory" ("author", "company", "createdAt", "id", "image", "published", "quote", "updatedAt") SELECT "author", "company", "createdAt", "id", "image", "published", "quote", "updatedAt" FROM "CustomerStory";
DROP TABLE "CustomerStory";
ALTER TABLE "new_CustomerStory" RENAME TO "CustomerStory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
