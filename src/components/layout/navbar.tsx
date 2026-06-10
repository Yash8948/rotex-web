"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GradientButton } from "@/components/ui/gradient-button";
import { Menu } from "lucide-react";
import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
import { useScrolled } from "@/hooks/use-scrolled";
import logo from "@/assets/logo.svg";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdown?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    hasDropdown: true,
    dropdown: [
      { label: "All Products", href: "/products" },
      { label: "Screeners", href: "/products/screeners" },
      { label: "Conveyors", href: "/products/conveyors" },
      { label: "Feeders", href: "/products/feeders" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    hasDropdown: true,
    dropdown: [
      { label: "Mining", href: "/industries/mining" },
      { label: "Agriculture", href: "/industries/agriculture" },
      { label: "Chemical", href: "/industries/chemical" },
      { label: "Food & Beverage", href: "/industries/food" },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    hasDropdown: true,
    dropdown: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
  { label: "Downloads", href: "/downloads", hasDropdown: false },
  {
    label: "Stay Informed",
    href: "/news",
    hasDropdown: true,
    dropdown: [
      { label: "News", href: "/news" },
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Join Us",
    href: "/join",
    hasDropdown: true,
    dropdown: [
      { label: "Careers", href: "/careers" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
];

function NavDropdownItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => item.hasDropdown && setOpen(true)}
      onMouseLeave={() => item.hasDropdown && setOpen(false)}
    >
      <Link href={item.href} className="flex items-center gap-0.5 group">
        <span className="text-stone-300 text-sm font-medium font-montserrat whitespace-nowrap group-hover:text-white transition-colors duration-150">
          {item.label}
        </span>
        {item.hasDropdown && (
          <IoChevronDownOutline
            size={14}
            className="text-stone-300 group-hover:text-white transition-colors duration-150 shrink-0"
          />
        )}
      </Link>

      {item.hasDropdown && open && item.dropdown && (
        <div
          className="absolute top-full left-0 mt-2 min-w-45 rounded-lg overflow-hidden shadow-2xl z-50 border border-white/10"
          style={{ background: "#1c1917" }}
        >
          {item.dropdown.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="block px-4 py-2.5 text-sm font-medium font-montserrat text-white/75 hover:text-white hover:bg-white/5 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const EASE = [0.4, 0, 0.2, 1] as const;
const DURATION = 0.5;
const LOGO_DURATION = 0.6;

/* ── Single floating logo ─────────────────────────────────────────────────
   This is the ONE real logo on the page. It lives outside the navbar header
   so it can freely animate from hero position → navbar position.
   A spacer inside the header reserves the slot so nav items shift correctly.
─────────────────────────────────────────────────────────────────────────── */
function FloatingLogo({ scrolled }: { scrolled: boolean }) {
  /* navbar: top=(96-31)/2=32, size=144×31  |  hero: top=112, size=282×60
     Desktop/tablet only — on mobile the swipe-up animation eats hero space,
     so the header shows a static logo instead (see Navbar). */
  return (
    <motion.div
      className="fixed left-0 right-0 pointer-events-none hidden lg:block"
      style={{ zIndex: 60 }}
      initial={false}
      animate={{ top: scrolled ? 32 : 112 }}
      transition={{ duration: LOGO_DURATION, ease: EASE }}
    >
      <div className="container">
        <Link href="/" className="pointer-events-auto inline-block">
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{
              width: scrolled ? 144 : 282,
              height: scrolled ? 31 : 60,
            }}
            transition={{ duration: LOGO_DURATION, ease: EASE }}
          >
            <Image
              src={logo}
              alt="Rotex"
              width={282}
              height={60}
              priority
              className="w-full h-full object-contain object-left"
            />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const scrolled = useScrolled(60);

  return (
    <>
      {/* Single logo that slides between hero and navbar positions */}
      <FloatingLogo scrolled={scrolled} />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={false}
        animate={{ backgroundColor: scrolled ? "#201D1D" : "rgba(13,13,13,0)" }}
        transition={{ duration: DURATION, ease: EASE }}
      >
        <div className="container h-20 lg:h-24 flex items-center justify-between">

            {/* LEFT — spacer width = logo(144) + gap(24) when scrolled, 0 when not.
                Nav items start right after spacer so they align with logo's left edge at rest. */}
            <div className="flex items-center">
              {/* Mobile: static logo, no swipe-up animation/space reservation */}
              <Link href="/" className="lg:hidden">
                <Image src={logo} alt="Rotex" width={96} height={20} className="w-24 h-5 object-contain" />
              </Link>

              <motion.div
                className="shrink-0 hidden lg:block"
                initial={false}
                animate={{ width: scrolled ? 168 : 0 }}
                transition={{ duration: LOGO_DURATION, ease: EASE }}
              />
              <div className="hidden lg:flex items-center gap-6">
                {navItems.map((item) => (
                  <NavDropdownItem key={item.href} item={item} />
                ))}
              </div>
            </div>

            {/* RIGHT — search + CTA */}
            <div className="hidden lg:flex items-center gap-6 shrink-0">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="focus:outline-none text-white/80 hover:text-white transition-colors duration-150"
                aria-label="Search"
              >
                <IoSearchOutline size={22} />
              </button>
              <GradientButton href="/contact">Contact Us</GradientButton>
            </div>

            {/* Mobile — search + hamburger */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="focus:outline-none text-white/80 hover:text-white transition-colors duration-150"
                aria-label="Search"
              >
                <IoSearchOutline size={22} />
              </button>

              <Sheet>
                <SheetTrigger
                  render={
                    <button className="text-white/80 hover:text-white transition-colors" />
                  }
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-72 border-white/10"
                  style={{ background: "#201D1D" }}
                >
                  <div className="flex flex-col gap-1 mt-6 px-2">
                    <Link href="/" className="mb-4">
                      <Image src={logo} alt="Rotex" height={28} className="w-36 h-8 object-contain" />
                    </Link>
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between px-2 py-3 text-sm font-medium font-montserrat text-white/75 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                      >
                        {item.label}
                        {item.hasDropdown && (
                          <IoChevronDownOutline size={14} className="text-white/60" />
                        )}
                      </Link>
                    ))}
                    <div className="mt-4">
                      <GradientButton href="/contact" className="w-full">
                        Contact Us
                      </GradientButton>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>

        {searchOpen && (
          <div
            className="container border-t border-white/10 py-3"
            style={{ background: "#161412" }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Search products, industries, resources..."
              className="w-full bg-transparent text-white placeholder-stone-500 text-sm font-montserrat outline-none"
            />
          </div>
        )}
      </motion.header>
    </>
  );
}
