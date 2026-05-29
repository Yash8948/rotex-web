import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "@/assets/logo.svg";
import bg from "@/assets/footer_bg.svg";

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

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: FOOTER_GRADIENT, minHeight: "764px" }}
    >
      {/* Decorative background SVG */}
      <Image
        src={bg.src}
        alt=""
        width={746}
        height={746}
        aria-hidden="true"
        className="absolute pointer-events-none select-none right-0 bottom-0"
      />

      <div className="container relative z-10 flex flex-col">

        {/* Logo + tagline — Figma: top-[120px] */}
        <div className="pt-30 flex flex-col gap-4">
          <Link href="/">
            <Image
              src={logo}
              alt="Rotex"
              height={40}
              priority
              className="w-48 h-10 object-contain"
            />
          </Link>
          <p className="text-white text-base font-medium font-montserrat leading-6">
            Engineering For the Future
          </p>
        </div>

        {/* Link columns — Figma: top-[362px], gap from logo bottom ~162px */}
        <div className="mt-40.5 pb-16 flex justify-between items-start">

          <FooterColumn heading="Products" links={[
            "Solenoid Valves",
            "Angle Seat Valves",
            "Automotive solutions",
            "Actuators",
            "Positioners",
          ]} />

          <FooterColumn heading="Industries" links={[
            "Oil & Gas",
            "Process",
            "Power",
            "Rail",
            "Machine Solutions",
            "Aerospace & Defense",
            "Automotive",
          ]} />

          <div className="self-stretch flex flex-col justify-between items-start">
            <FooterColumn heading="Company" links={["Who we are", "Awards"]} />
            <FooterColumn heading="Join Us" links={[
              "Become a Distributor",
              "Become a Supplier",
              "Career",
            ]} />
          </div>

          <div className="self-stretch flex flex-col justify-between items-start">
            <FooterColumn heading="Resources" links={["Downloads"]} />
            <FooterColumn heading="Stay Informed" links={[
              "Blogs",
              "News & Updates",
              "Case Studies",
            ]} />
          </div>

          <div className="flex flex-col justify-start items-start gap-5">
            <p className="opacity-50 text-white text-base font-semibold font-montserrat leading-5">
              Connect With Us
            </p>
            <div className="flex justify-start items-center gap-2">
              <SocialIcon href="#" label="LinkedIn"><FaLinkedinIn size={18} /></SocialIcon>
              <SocialIcon href="#" label="Instagram"><FaInstagram size={18} /></SocialIcon>
              <SocialIcon href="#" label="Facebook"><FaFacebookF size={18} /></SocialIcon>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <p className="opacity-50 text-white text-base font-medium font-montserrat leading-6">
        {heading}
      </p>
      <div className="flex flex-col justify-start items-start gap-2">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            className="text-stone-100 text-base font-medium font-montserrat leading-6 hover:opacity-70 transition-opacity duration-150"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="size-7 flex items-center justify-center text-white hover:opacity-70 transition-opacity duration-150"
    >
      {children}
    </a>
  );
}
