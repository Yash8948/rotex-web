declare global {
  namespace PrismaJson {
    type IndustryStats = {
      id: string;
      value: number;
      suffix: string;
      label: string;
      format_comma: boolean;
    }[];

    type IndustryWhyChoose = {
      title: string;
      highlight: string;
      cards: { id: string; title: string; description: string }[];
    };

    type NavLink = { id: string; label: string; href: string };
    type FooterLink = { label: string; href: string };

    type GlobalConfigData = {
      logo: { src: string; alt: string; href: string };
      header: { nav: NavLink[]; cta: { label: string; href: string } };
      footer: {
        tagline: string;
        columns: { id: string; heading: string; links: FooterLink[] }[];
        social: { id: string; platform: string; href: string }[];
        legal: { copyright: string; links: FooterLink[] };
        contact: { email: string; phone: string; address: string };
      };
    };

    type HomeSeoData = {
      title: string;
      description: string;
      og_image: { src: string; alt: string };
      canonical: string;
    };
  }
}

export {};
