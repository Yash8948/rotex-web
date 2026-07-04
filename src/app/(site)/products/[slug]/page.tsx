import { PageHero } from "@/components/ui/page-hero";
import breadcrumbBg from "@/assets/Images/breadcurmbBackgrounds/default_bg.jpg";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <PageHero
        bg={breadcrumbBg}
        title={slug
          .split("-")
          .slice(0, -1)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")}
        description=""
      />
      <div className="container py-16">
        <p className="text-stone-400 text-sm">Product detail page — coming soon.</p>
        <p className="text-stone-500 text-xs mt-2 font-mono">{slug}</p>
      </div>
    </div>
  );
}
