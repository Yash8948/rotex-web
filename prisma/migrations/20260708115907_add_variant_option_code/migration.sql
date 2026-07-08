-- DropIndex
DROP INDEX "ProductVariant_productId_size_type_minPressure_maxPressure_orifice_flowFactor_key";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN "optionCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_size_type_minPressure_maxPressure_orifice_flowFactor_optionCode_key" ON "ProductVariant"("productId", "size", "type", "minPressure", "maxPressure", "orifice", "flowFactor", "optionCode");
