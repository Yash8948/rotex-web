import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "@/assets/logo.svg";
import bg from "@/assets/footer_bg.svg";

/*
  Gradient: base #110101 + radial glow from below-right (57% 162%)
  Colors: #FF9A00 → #F03900 → #950000 → #110101 → #000000
  Matches the dome-shaped warm glow visible in center-right of footer
*/
const FOOTER_GRADIENT = `
  radial-gradient(
    circle at 57% 150%,
    #ff9a00 0%,
    #f03900 18%,
    #950000 38%,
    #110101 62%,
    #000000 85%
  )
`.trim();

const footerColumns = [
  {
    heading: "Products",
    links: [
      "Solenoid Valves",
      "Angle Seat Valves",
      "Automotive solutions",
      "Actuators",
      "Positioners",
    ],
  },
  {
    heading: "Industries",
    links: [
      "Oil & Gas",
      "Process",
      "Power",
      "Rail",
      "Machine Solutions",
      "Aerospace & Defense",
      "Automotive",
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: FOOTER_GRADIENT, minHeight: "764px" }}
    >
      {/*
        Figma: left-[1579px] top-[918px] w-[740px] h-[701px] origin-top-left -rotate-180
        After rotation math: visual position = left=(1579-740)=839, top=(918-701)=217
        Use <img> not <Image> — Next.js strips SVG internal opacity="0.1" attribute
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image
        src={bg.src}
        alt=""
        width={746}
        height={746}
        aria-hidden="true"
        className="absolute pointer-events-none select-none right-0 bottom-0"
      />

      {/* Logo + tagline — Figma: left-[77px] top-[120px] */}
      <div className="absolute left-[77px] top-[120px] inline-flex flex-col justify-start items-start gap-4">
        <Link href="/">
          {/* Figma: w-48 h-10 */}
          <Image
            src={logo}
            alt="Rotex"
            height={40}
            priority
            className="w-48 h-10 object-contain"
          />
        </Link>
        {/* Figma: text-white text-base font-medium Montserrat leading-6 */}
        <p className="text-white text-base font-medium font-[var(--font-montserrat)] leading-6">
          Engineering For the Future
        </p>
      </div>

      {/*
        Link columns — Figma: left-[77px] top-[362px] w-[1283px] justify-between
      */}
      <div className="absolute left-[77px] top-[362px] w-[1283px] max-w-[calc(100%-154px)] inline-flex justify-between items-start">

        {/* Products */}
        <FooterColumn heading="Products" links={[
          "Solenoid Valves",
          "Angle Seat Valves",
          "Automotive solutions",
          "Actuators",
          "Positioners",
        ]} />

        {/* Industries */}
        <FooterColumn heading="Industries" links={[
          "Oil & Gas",
          "Process",
          "Power",
          "Rail",
          "Machine Solutions",
          "Aerospace & Defense",
          "Automotive",
        ]} />

        {/* Company + Join Us stacked — Figma: self-stretch justify-between */}
        <div className="self-stretch inline-flex flex-col justify-between items-start">
          <FooterColumn heading="Company" links={["Who we are", "Awards"]} />
          <FooterColumn heading="Join Us" links={[
            "Become a Distributor",
            "Become a Supplier",
            "Career",
          ]} />
        </div>

        {/* Resources + Stay Informed stacked */}
        <div className="self-stretch inline-flex flex-col justify-between items-start">
          <FooterColumn heading="Resources" links={["Downloads"]} />
          <FooterColumn heading="Stay Informed" links={[
            "Blogs",
            "News & Updates",
            "Case Studies",
          ]} />
        </div>

        {/* Connect With Us */}
        <div className="inline-flex flex-col justify-start items-start gap-5">
          {/* Figma: opacity-50 text-white text-base font-semibold Montserrat leading-5 */}
          <p className="opacity-50 text-white text-base font-semibold font-[var(--font-montserrat)] leading-5">
            Connect With Us
          </p>
          {/* Figma: inline-flex justify-start items-center gap-2, size-7 icons */}
          <div className="inline-flex justify-start items-center gap-2">
            <SocialIcon href="#" label="LinkedIn">
              <FaLinkedinIn size={18} />
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <FaInstagram size={18} />
            </SocialIcon>
            <SocialIcon href="#" label="Facebook">
              <FaFacebookF size={18} />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div className="inline-flex flex-col justify-start items-start gap-5">
      {/* Figma: opacity-50 text-white text-base font-medium Montserrat leading-6 */}
      <p className="opacity-50 text-white text-base font-medium font-[var(--font-montserrat)] leading-6">
        {heading}
      </p>
      {/* Figma: flex flex-col gap-2 */}
      <div className="flex flex-col justify-start items-start gap-2">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            /* Figma: text-stone-100 text-base font-medium Montserrat leading-6 */
            className="text-stone-100 text-base font-medium font-[var(--font-montserrat)] leading-6 hover:opacity-70 transition-opacity duration-150"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    /* Figma: size-7 relative */
    <a
      href={href}
      aria-label={label}
      className="size-7 flex items-center justify-center text-white hover:opacity-70 transition-opacity duration-150"
    >
      {children}
    </a>
  );
}
