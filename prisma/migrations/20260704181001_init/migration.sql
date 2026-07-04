-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tags" TEXT[],
    "subType" TEXT,
    "operatingType" TEXT,
    "actionType" TEXT,
    "portSize" TEXT,
    "minPressure" TEXT,
    "maxPressure" TEXT,
    "operatorSize" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bgKey" TEXT,
    "description" TEXT NOT NULL,
    "sectionTitle" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "stats" JSONB NOT NULL,
    "whyChoose" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubIndustry" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "challengesTitle" TEXT NOT NULL,
    "solutionsTitle" TEXT NOT NULL,
    "solutionsIntro" TEXT NOT NULL,
    "challenges" TEXT[],
    "solutions" TEXT[],
    "recommendedProducts" TEXT[],
    "industryId" TEXT NOT NULL,

    CONSTRAINT "SubIndustry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerStory" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "subIndustryId" TEXT NOT NULL,

    CONSTRAINT "CustomerStory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_slug_key" ON "Industry"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubIndustry_industryId_slug_key" ON "SubIndustry"("industryId", "slug");

-- AddForeignKey
ALTER TABLE "SubIndustry" ADD CONSTRAINT "SubIndustry_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerStory" ADD CONSTRAINT "CustomerStory_subIndustryId_fkey" FOREIGN KEY ("subIndustryId") REFERENCES "SubIndustry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
