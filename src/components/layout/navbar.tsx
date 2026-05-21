"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GradientButton } from "@/components/ui/gradient-button";
import { Menu } from "lucide-react";
import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
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
  {
    label: "Downloads",
    href: "/downloads",
    hasDropdown: false,
  },
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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
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
      {/* Figma: flex justify-start items-center gap-0.5 */}
      <Link
        href={item.href}
        className="flex justify-start items-center gap-0.5 group"
      >
        {/* Figma: text-stone-300 text-sm font-medium font-['Montserrat'] */}
        <span className="justify-center text-stone-300 text-sm font-medium font-[var(--font-montserrat)] whitespace-nowrap group-hover:text-white transition-colors duration-150">
          {item.label}
        </span>

        {item.hasDropdown && (
          <IoChevronDownOutline
            size={14}
            className="text-stone-300 group-hover:text-white transition-colors duration-150 flex-shrink-0"
          />
        )}
      </Link>

      {/* Dropdown panel */}
      {item.hasDropdown && open && item.dropdown && (
        <div
          className="absolute top-full left-0 mt-2 min-w-[180px] rounded-lg overflow-hidden shadow-2xl z-50 border border-white/10"
          style={{ background: "#1c1917" }}
        >
          {item.dropdown.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="block px-4 py-2.5 text-sm font-medium font-[var(--font-montserrat)] text-stone-300 hover:text-white hover:bg-white/5 transition-colors duration-150"
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

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    /* Figma: bg-stone-900 — #1c1917. Modes panel shows #201D1D; using exact Figma class */
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#201D1D]">

      {/* Figma: h-24. Content: left-[80px] top-[29.50px] — replicated via flex items-center + px-[80px] */}
      <div className="h-24 px-[80px] flex items-center">

        {/* Figma: w-[1280px] inline-flex justify-between items-center */}
        <div className="w-full inline-flex justify-between items-center">

          {/* LEFT — Figma: flex justify-start items-center gap-12 */}
          <div className="flex justify-start items-center gap-12">

            {/* Logo — Figma: w-36 h-8 */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                alt="Rotex"
                height={31}
                priority
                className="w-36 h-8 object-contain"
              />
            </Link>

            {/* Nav wrapper — Figma: flex justify-start items-center gap-16 */}
            <div className="hidden lg:flex justify-start items-center gap-16">
              {/* Nav items — Figma: flex justify-start items-center gap-6 */}
              <div className="flex justify-start items-center gap-6">
                {navItems.map((item) => (
                  <NavDropdownItem key={item.href} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Figma: flex justify-start items-center gap-6 */}
          <div className="hidden lg:flex justify-start items-center gap-6">

            {/* Search — react-icons IoSearchOutline, stone-300 color */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="focus:outline-none text-stone-300 hover:text-white transition-colors duration-150"
              aria-label="Search"
            >
              <IoSearchOutline size={22} />
            </button>

            {/* Figma: flex justify-start items-center gap-3 */}
            <div className="flex justify-start items-center gap-3">
              <GradientButton href="/contact">Contact Us</GradientButton>
            </div>
          </div>

          {/* Mobile hamburger — shown below lg */}
          <Sheet>
            <SheetTrigger
              render={
                <button className="lg:hidden text-stone-300 hover:text-white transition-colors" />
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
                  <Image
                    src={logo}
                    alt="Rotex"
                    height={28}
                    className="w-36 h-8 object-contain"
                  />
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-2 py-3 text-sm font-medium font-[var(--font-montserrat)] text-stone-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <IoChevronDownOutline size={14} className="text-stone-300" />
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

      {/* Search expand */}
      {searchOpen && (
        <div
          className="border-t border-white/10 px-[80px] py-3"
          style={{ background: "#161412" }}
        >
          <input
            autoFocus
            type="text"
            placeholder="Search products, industries, resources..."
            className="w-full bg-transparent text-white placeholder-stone-500 text-sm font-[var(--font-montserrat)] outline-none"
          />
        </div>
      )}
    </header>
  );
}
