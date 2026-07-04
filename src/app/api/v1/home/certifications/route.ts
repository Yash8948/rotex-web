import { getHomeSection } from "@/lib/home-section";

export async function GET() {
  return getHomeSection("certifications");
}
