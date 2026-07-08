import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const GLOBAL_CONFIG = {
  logo: { src: "https://cdn.rotex.com/brand/logo.svg", alt: "Rotex", href: "/" },
  header: {
    nav: [
      { id: "nav_001", label: "Products", href: "/products" },
      { id: "nav_002", label: "Industries", href: "/industries" },
      { id: "nav_003", label: "About", href: "/about" },
      { id: "nav_004", label: "Resources", href: "/resources" },
      { id: "nav_005", label: "Contact", href: "/contact" },
    ],
    cta: { label: "Get a Quote", href: "/contact" },
  },
  footer: {
    tagline: "Engineering flow control solutions since 1967.",
    columns: [
      {
        id: "col_001",
        heading: "Products",
        links: [
          { label: "Solenoid Valves", href: "/products/solenoid-valve" },
          { label: "Angle Seat Valves", href: "/products/angle-seat-valve" },
          { label: "Actuators", href: "/products/actuators" },
        ],
      },
      {
        id: "col_002",
        heading: "Industries",
        links: [
          { label: "Oil & Gas", href: "/industries/oil-gas" },
          { label: "Power", href: "/industries/power" },
          { label: "Automotive", href: "/industries/automotive" },
        ],
      },
      {
        id: "col_003",
        heading: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Careers", href: "/careers" },
        ],
      },
    ],
    social: [
      { id: "soc_001", platform: "linkedin", href: "https://linkedin.com/company/rotex" },
      { id: "soc_002", platform: "youtube", href: "https://youtube.com/@rotex" },
      { id: "soc_003", platform: "twitter", href: "https://twitter.com/rotex" },
    ],
    legal: {
      copyright: "© 2026 Rotex. All rights reserved.",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
      ],
    },
    contact: {
      email: "info@rotex.com",
      phone: "+91 22 0000 0000",
      address: "Rotex Industries, Mumbai, India",
    },
  },
};

const HOME_SEO = {
  title: "Rotex | Flow Control. Where It Matters Most.",
  description:
    "Engineered flow control solutions that reduce downtime, enhance safety, and ensure uninterrupted operations across critical industries.",
  og_image: { src: "https://cdn.rotex.com/og/home.jpg", alt: "Rotex — Flow Control Solutions" },
  canonical: "https://www.rotex.com",
};

const SECTIONS: { key: string; order: number; data: unknown }[] = [
  {
    key: "hero",
    order: 1,
    data: {
      slides: [
        {
          id: "slide_001",
          published: true,
          title: "Flow Control. Where It Matters Most.",
          description:
            "Engineered precise solutions that reduce downtime, enhance safety, and ensure uninterrupted operations across critical industry applications.",
          media: { type: "video", src: "https://cdn.rotex.com/hero/slide-1.mp4" },
          cta_buttons: [
            { label: "Explore Solutions", href: "/solutions" },
            { label: "Download Zero Downtime Blueprint", href: "/downloads" },
          ],
        },
        {
          id: "slide_002",
          published: true,
          title: "Precision Engineered For Critical Industries.",
          description:
            "Over four decades of expertise delivering valve solutions trusted by the world's most demanding sectors.",
          media: {
            type: "image",
            src: "https://cdn.rotex.com/hero/slide-2.jpg",
            alt: "Rotex valve installation in oil refinery",
          },
          cta_buttons: [
            { label: "View Products", href: "/products" },
            { label: "Contact Us", href: "/contact" },
          ],
        },
      ],
    },
  },
  {
    key: "partners",
    order: 2,
    data: {
      title: "Trusted by Industry Leaders",
      partnerIds: [],
    },
  },
  {
    key: "redefining",
    order: 3,
    data: {
      heading: {
        title: "Redefining Flow Performance",
        subtitle:
          "A new chapter shaped by precision engineering, advanced capabilities, and a commitment to solving the most demanding industrial challenges.",
      },
      media: { type: "video", src: "https://cdn.rotex.com/redefining/overview.mp4" },
      tagline: { prefix: "Leading Flow", highlight: "Intelligence", suffix: "Since 1967" },
      stats: [
        { id: "stat_001", value: 33, suffix: "", label: "Utility Patents", format_comma: false, published: true },
        { id: "stat_002", value: 83, suffix: "+", label: "Countries Served Worldwide", format_comma: false, published: true },
        { id: "stat_003", value: 21, suffix: "+", label: "International Certifications", format_comma: false, published: true },
        { id: "stat_004", value: 80, suffix: "+", label: "Global Distributors", format_comma: false, published: true },
        { id: "stat_005", value: 9000, suffix: "+", label: "Customers", format_comma: true, published: true },
        { id: "stat_006", value: 6000, suffix: "+", label: "Customised Solutions Developed", format_comma: true, published: true },
      ],
    },
  },
  {
    key: "industries",
    order: 4,
    data: {
      heading: {
        title: "Built Around Your Industry",
        subtitle:
          "Tailored solutions designed to meet the operational demands of your sector — ensuring precision, reliability, and long-term performance.",
      },
      industries: [
        { id: "ind_001", published: true, slug: "oil-gas", label: "Oil and Gas", title: "OIL AND GAS", description: "The Hidden Reason 73% of Oil & Gas Plants Shutdowns Are Actually Preventable (And Why Most Plants Still Don't Know This)", image: { src: "https://cdn.rotex.com/industries/oil-gas.jpg", alt: "Oil and gas refinery" } },
        { id: "ind_002", published: true, slug: "process", label: "Process", title: "PROCESS", description: "Precision flow control solutions built for continuous process environments where uptime is non-negotiable.", image: { src: "https://cdn.rotex.com/industries/process.jpg", alt: "Industrial process plant" } },
        { id: "ind_003", published: true, slug: "power", label: "Power", title: "POWER", description: "Engineered screening and conveying systems that keep power generation facilities running at peak efficiency.", image: { src: "https://cdn.rotex.com/industries/power.jpg", alt: "Power generation facility" } },
        { id: "ind_004", published: true, slug: "rail", label: "Rail", title: "RAIL", description: "Heavy-duty material handling solutions designed for the demanding conditions of rail infrastructure.", image: { src: "https://cdn.rotex.com/industries/rail.jpg", alt: "Rail infrastructure" } },
        { id: "ind_005", published: true, slug: "machine-solution", label: "Machine Solution", title: "MACHINE SOLUTION", description: "Custom-engineered flow and separation systems integrated seamlessly into your existing machine architecture.", image: { src: "https://cdn.rotex.com/industries/machine-solution.jpg", alt: "Industrial machinery" } },
        { id: "ind_006", published: true, slug: "aerospace", label: "Aerospace & Defence", title: "AEROSPACE & DEFENCE", description: "Certified separation and screening equipment meeting the rigorous standards of aerospace and defence supply chains.", image: { src: "https://cdn.rotex.com/industries/aerospace.jpg", alt: "Aerospace manufacturing" } },
        { id: "ind_007", published: true, slug: "automotive", label: "Automotive", title: "AUTOMOTIVE", description: "High-throughput material handling systems built for the speed and precision demands of automotive production.", image: { src: "https://cdn.rotex.com/industries/automotive.jpg", alt: "Automotive production line" } },
      ],
    },
  },
  {
    key: "products",
    order: 5,
    data: {
      heading: { title: "Engineered Flow Control Systems" },
      cta: { label: "View All Products", href: "/products" },
      products: [
        { id: "prod_001", published: true, slug: "solenoid-valve", name: "Solenoid Valve", description: "The Component Inside Valves That Cannot Fail", image: { src: "https://cdn.rotex.com/products/solenoid-valve.png", alt: "Solenoid Valve" } },
        { id: "prod_002", published: true, slug: "angle-seat-valve", name: "Angle Seat Valve", description: "Durable flow control for demanding needs", image: { src: "https://cdn.rotex.com/products/angle-seat-valve.png", alt: "Angle Seat Valve" } },
        { id: "prod_003", published: true, slug: "actuators", name: "Actuators", description: "Powerful mechanical devices for valve movement", image: { src: "https://cdn.rotex.com/products/actuators.png", alt: "Actuators" } },
        { id: "prod_004", published: true, slug: "positioners", name: "Positioners", description: "Precise, digital control for valve positioning", image: { src: "https://cdn.rotex.com/products/positioners.png", alt: "Positioners" } },
        { id: "prod_005", published: true, slug: "controllers", name: "Controllers", description: "Smart process control for industrial systems", image: { src: "https://cdn.rotex.com/products/controllers.png", alt: "Controllers" } },
        { id: "prod_006", published: true, slug: "sensors", name: "Sensors", description: "Accurate measurement for critical processes", image: { src: "https://cdn.rotex.com/products/sensors.png", alt: "Sensors" } },
        { id: "prod_007", published: true, slug: "automation", name: "Automation Systems", description: "End-to-end automation for flow operations", image: { src: "https://cdn.rotex.com/products/automation.png", alt: "Automation Systems" } },
      ],
    },
  },
  {
    key: "certifications",
    order: 6,
    data: {
      title: "Certified & Trusted Worldwide",
      logos: [
        { id: "cert_001", published: true, src: "https://cdn.rotex.com/certifications/iatf.png", alt: "IATF Certified" },
        { id: "cert_002", published: true, src: "https://cdn.rotex.com/certifications/ul.png", alt: "UL Listed" },
        { id: "cert_003", published: true, src: "https://cdn.rotex.com/certifications/atex.png", alt: "ATEX Certified" },
        { id: "cert_004", published: true, src: "https://cdn.rotex.com/certifications/ce.png", alt: "CE Marked" },
        { id: "cert_005", published: true, src: "https://cdn.rotex.com/certifications/kosha.png", alt: "KOSHA Certified" },
        { id: "cert_006", published: true, src: "https://cdn.rotex.com/certifications/sil3.png", alt: "SIL 3 Certified" },
        { id: "cert_007", published: true, src: "https://cdn.rotex.com/certifications/cert-7.png", alt: "Certification Name" },
      ],
    },
  },
  {
    key: "customer-stories",
    order: 7,
    data: {
      heading: { title: "Customer Stories", subtitle: "Trusted across industries, proven in action" },
      stories: [
        { id: "story_001", published: true, media: { type: "image", src: "https://cdn.rotex.com/stories/rajesh-mehta.jpg" }, quote: "Rotex solutions have consistently improved our system reliability and reduced downtime significantly. Their engineering precision truly reflects in performance.", author: "Rajesh Mehta", company: "Plant Head, Aarti Industries Ltd." },
        { id: "story_002", published: true, media: { type: "video", src: "https://cdn.rotex.com/stories/story-2.mp4" }, quote: "Quote text here.", author: "Author Name", company: "Role, Company Name" },
      ],
    },
  },
  {
    key: "resources",
    order: 8,
    data: {
      heading: { title: "Resources" },
      tabs: [
        {
          id: "case-studies",
          label: "Case Studies",
          cta: { label: "Read All Case Studies", href: "/case-studies" },
          articles: [
            { id: "art_001", published: true, slug: "solenoid-valve-classification", title: "Solenoid Valve Classification: The Engineering Logic Behind Reliable Automation Systems", image: { src: "https://cdn.rotex.com/resources/solenoid-valve-classification.jpg", alt: "Solenoid valve classification" } },
            { id: "art_002", published: true, slug: "future-industrial-valves", title: "Future of Industrial Valves: 7 Rotex Technologies Improving Reliability & Uptime", image: { src: "https://cdn.rotex.com/resources/future-industrial-valves.jpg", alt: "Industrial valves" } },
            { id: "art_003", published: true, slug: "select-solenoid-valve", title: "How to Select the Right Solenoid Valve for Your Industrial Process?", image: { src: "https://cdn.rotex.com/resources/select-solenoid-valve.jpg", alt: "Selecting solenoid valve" } },
          ],
        },
        {
          id: "news",
          label: "News & Updates",
          cta: { label: "View All News", href: "/news" },
          articles: [
            { id: "art_004", published: true, slug: "global-expansion", title: "Rotex Expands Global Distribution Network Across 15 New Markets", image: { src: "https://cdn.rotex.com/resources/global-expansion.jpg", alt: "Global expansion" } },
            { id: "art_005", published: true, slug: "smart-valve-controllers", title: "Rotex Launches Next-Generation Smart Valve Controllers for Industry 4.0", image: { src: "https://cdn.rotex.com/resources/smart-valve-controllers.jpg", alt: "Smart valve controllers" } },
            { id: "art_006", published: true, slug: "sil3-certification", title: "Rotex Achieves SIL 3 Certification for Critical Safety Systems", image: { src: "https://cdn.rotex.com/resources/sil3-certification.jpg", alt: "SIL 3 certification" } },
          ],
        },
        {
          id: "blogs",
          label: "Blogs",
          cta: { label: "Read All Blogs", href: "/blog" },
          articles: [
            { id: "art_007", published: true, slug: "valve-maintenance-signs", title: "5 Signs Your Industrial Valve Needs Immediate Maintenance", image: { src: "https://cdn.rotex.com/resources/valve-maintenance-signs.jpg", alt: "Valve maintenance" } },
            { id: "art_008", published: true, slug: "valve-actuators-guide", title: "Understanding Valve Actuators: A Comprehensive Guide for Engineers", image: { src: "https://cdn.rotex.com/resources/valve-actuators-guide.jpg", alt: "Valve actuators" } },
            { id: "art_009", published: true, slug: "flow-control-oil-gas", title: "Flow Control in the Oil & Gas Industry: Challenges and Solutions", image: { src: "https://cdn.rotex.com/resources/flow-control-oil-gas.jpg", alt: "Flow control oil and gas" } },
          ],
        },
      ],
    },
  },
  {
    key: "cta",
    order: 9,
    data: {
      background_image: { src: "https://cdn.rotex.com/cta/cta-bg.jpg", alt: "CTA background" },
      title: "Let's Solve Your Next Challenge",
      subtitle: "Connect with our experts to find the right solution for your application.",
      cta: { label: "Book Free Consultation", href: "/contact" },
    },
  },
];

async function main() {
  await prisma.globalConfig.upsert({
    where: { id: "global" },
    update: { data: GLOBAL_CONFIG },
    create: { id: "global", data: GLOBAL_CONFIG },
  });

  await prisma.homeSeo.upsert({
    where: { id: "home" },
    update: { data: HOME_SEO },
    create: { id: "home", data: HOME_SEO },
  });

  for (const section of SECTIONS) {
    await prisma.homeSection.upsert({
      where: { key: section.key },
      update: { order: section.order, data: section.data as never },
      create: { key: section.key, order: section.order, enabled: true, data: section.data as never },
    });
  }

  console.log(`Seeded global config, home SEO, and ${SECTIONS.length} home sections.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
