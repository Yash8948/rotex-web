import { getHomeSection } from "@/lib/home-section";

export async function GET() {
  return getHomeSection("customer-stories");
}
