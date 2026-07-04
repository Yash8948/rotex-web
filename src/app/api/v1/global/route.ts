import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  const config = await prisma.globalConfig.findUnique({ where: { id: "global" } });

  if (!config) {
    return apiError("NOT_FOUND", "Global config not found", 404);
  }

  return apiSuccess(config.data, config.updatedAt);
}
