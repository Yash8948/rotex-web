"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GradientButton } from "@/components/ui/gradient-button";
import { Menu } from "lucide-react";
import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
import { useScrolled } from "@/hooks/use-scrolled";
import { type StaticImageData } from "next/image";
import logo from "@/assets/logo.svg";
import industriesMenuImg from "@/assets/Images/breadcurmbBackgrounds/mega_menu.png";
import stayInformedMenuImg from "@/assets/Images/breadcurmbBackgrounds/mega_menu_01.png";
import aboutUsMenuImg from "@/assets/Images/breadcurmbBackgrounds/mega_menu_02.png";

// ─── Types ────────────────────────────────────────────────────────────────────

// Products-style: left category switcher + middle sub-items + right CTA
type SubItem = { label: string; description: string; href: string };

type Category = {
  label: string;
  items: SubItem[];
  viewAllLabel?: string;
  viewAllHref?: string;
};

type CategorySwitcherMenu = {
  type: "category-switcher";
  categories: Category[];
  cta: { text: string; href: string };
};

// Industries-style: flat multi-column + optional right image
type FlatItem = { label: string; href: string };

type FlatGroup = {
  heading: string;
  href?: string;
  description?: string;
  items?: FlatItem[];
  itemColumns?: FlatItem[][];
};

type FlatColumn = { groups: FlatGroup[]; className?: string };

type FlatMenu = {
  type: "flat";
  columns: FlatColumn[];
  image?: string | StaticImageData;
  imageCaption?: string;
  cta?: { text: string; href: string };
};

type MegaMenuConfig = CategorySwitcherMenu | FlatMenu;

type NavItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuConfig;
};

// ─── Products Mega Menu Data ──────────────────────────────────────────────────

const productsMegaMenu: CategorySwitcherMenu = {
  type: "category-switcher",
  categories: [
    {
      label: "Solenoid Valve",
      items: [
        {
          label: "2 Way Valves",
          description: "Two port solenoid valve for efficient fluid control applications",
          href: "/products/solenoid-valve/2-way",
        },
        {
          label: "3 Way Valves",
          description: "Controls start stop and exhaust with three port design",
          href: "/products/solenoid-valve/3-way",
        },
        {
          label: "5 Way Valves",
          description: "Designed for fast switching and consistent motion control",
          href: "/products/solenoid-valve/5-way",
        },
      ],
      viewAllLabel: "View all Solenoid Valves",
      viewAllHref: "/products/solenoid-valve",
    },
    { label: "Angle Seat Valve", items: [] },
    { label: "Actuators", items: [] },
    { label: "Positioners", items: [] },
    { label: "Automotive Solutions", items: [] },
  ],
  cta: {
    text: "Talk to experts to choose the right product",
    href: "/contact",
  },
};

// ─── Industries Mega Menu Data ────────────────────────────────────────────────

const industriesMegaMenu: FlatMenu = {
  type: "flat",
  columns: [
    {
      groups: [
        {
          heading: "Oil & Gas",
          href: "/industries/oil-gas",
          items: [
            { label: "Upstream", href: "/industries/oil-gas/upstream" },
            { label: "Midstream", href: "/industries/oil-gas/midstream" },
            { label: "Downstream", href: "/industries/oil-gas/downstream" },
          ],
        },
        {
          heading: "Power",
          href: "/industries/power",
          items: [
            { label: "Thermal Power", href: "/industries/power/thermal" },
            { label: "Nuclear Power", href: "/industries/power/nuclear" },
          ],
        },
      ],
    },
    {
      groups: [
        {
          heading: "Process Industries",
          href: "/industries/process",
          itemColumns: [
            [
              { label: "Fertilizer", href: "/industries/process/fertilizer" },
              { label: "Chemicals", href: "/industries/process/chemicals" },
              { label: "Cement", href: "/industries/process/cement" },
              { label: "Food & Beverages", href: "/industries/process/food-beverages" },
              { label: "Paper & Pulp", href: "/industries/process/paper-pulp" },
              { label: "Pharmaceuticals", href: "/industries/process/pharmaceuticals" },
            ],
            [
              { label: "Paints", href: "/industries/process/paints" },
              { label: "Textiles", href: "/industries/process/textiles" },
              { label: "Water Management", href: "/industries/process/water-management" },
              { label: "Metal & Mining", href: "/industries/process/metal-mining" },
              { label: "Tyre", href: "/industries/process/tyre" },
            ],
          ],
        },
      ],
    },
    {
      groups: [
        {
          heading: "Machine Solutions",
          href: "/industries/machine-solutions",
          items: [{ label: "Fire Fighting System", href: "/industries/machine-solutions/fire-fighting" }],
        },
        { heading: "Automotive", href: "/industries/automotive" },
        { heading: "Rail", href: "/industries/rail" },
        { heading: "Aerospace & Defence", href: "/industries/aerospace-defence" },
      ],
    },
  ],
  image: industriesMenuImg,
};

// ─── Stay Informed Mega Menu Data ────────────────────────────────────────────

const stayInformedMegaMenu: FlatMenu = {
  type: "flat",
  columns: [
    {
      groups: [
        {
          heading: "Blogs",
          href: "/blogs",
          description: "Expert insights for modern industries",
        },
      ],
    },
    {
      groups: [
        {
          heading: "News & Updates",
          href: "/news",
          description: "Update with Latest Trends & Technology",
        },
      ],
    },
    {
      groups: [
        {
          heading: "Case Studies",
          href: "/case-studies",
          description: "Update with Latest Trends & Technology",
        },
      ],
    },
  ],
  image: stayInformedMenuImg,
  imageCaption: "ISRO's Mahendragiri Facility",
};

// ─── About Us Mega Menu Data ──────────────────────────────────────────────────

const aboutUsMegaMenu: FlatMenu = {
  type: "flat",
  columns: [
    {
      groups: [
        {
          heading: "Who we are",
          href: "/about",
          description: "Our mission and Story",
        },
      ],
    },
    {
      groups: [
        {
          heading: "Awards",
          href: "/about/awards",
          description: "Milestones of Excellence and Trust",
        },
      ],
    },
  ],
  image: aboutUsMenuImg,
};

// ─── Join Us Mega Menu Data ───────────────────────────────────────────────────

const joinUsMegaMenu: FlatMenu = {
  type: "flat",
  columns: [
    {
      className: "w-52",
      groups: [
        {
          heading: "Become a Channel Partner",
          href: "/join/channel-partner",
          description: "Collaborate to drive shared industrial growth",
        },
      ],
    },
    {
      className: "w-52",
      groups: [
        {
          heading: "Become a Supplier",
          href: "/join/supplier",
          description: "Supply certified components for reliable operations",
        },
      ],
    },
    {
      className: "w-32",
      groups: [
        {
          heading: "Career",
          href: "/join/career",
          description: "Be a Part of Our Growth",
        },
      ],
    },
    {
      className: "w-44",
      groups: [
        {
          heading: "Partner Sales Tools",
          href: "/join/partner-sales-tools",
          description: "Partner-Ready Sales Resources",
        },
      ],
    },
  ],
  cta: {
    text: "Submit your details to Become a Channel Partner",
    href: "/join/channel-partner",
  },
};

// ─── Nav Items ────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { label: "Products", href: "/products", megaMenu: productsMegaMenu },
  { label: "Industries", href: "/industries", megaMenu: industriesMegaMenu },
  { label: "About Us", href: "/about", megaMenu: aboutUsMegaMenu },
  { label: "Downloads", href: "/downloads" },
  { label: "Stay Informed", href: "/news", megaMenu: stayInformedMegaMenu },
  { label: "Join Us", href: "/join", megaMenu: joinUsMegaMenu },
];

// ─── Category Switcher Panel (Products) ──────────────────────────────────────

function CategorySwitcherPanel({
  config,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: {
  config: CategorySwitcherMenu;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = config.categories[activeIdx];

  return (
    <div
      className="fixed top-20 lg:top-24 left-0 right-0 z-61 bg-white border-b border-stone-300 shadow-lg flex"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Left: Category list */}
      <div className="w-72 bg-stone-100 border-r border-stone-300 px-10 py-10 flex flex-col gap-4 shrink-0">
        {config.categories.map((cat, i) => (
          <button
            key={cat.label}
            onMouseEnter={() => setActiveIdx(i)}
            className={`px-2.5 py-0.5 text-left border-l-2 text-base font-montserrat leading-6 transition-colors ${
              i === activeIdx
                ? "border-red-600 text-red-600 font-semibold"
                : "border-transparent text-stone-900 font-medium hover:text-stone-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Middle: Sub-items */}
      <div className="flex-1 border-r border-stone-300 px-10 py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          {active.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group w-64 flex flex-col gap-1"
            >
              <span className="text-stone-900 text-base font-medium font-montserrat leading-6 group-hover:text-red-600 transition-colors">
                {item.label}
              </span>
              <span className="text-neutral-400 text-xs font-medium font-montserrat leading-5">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
        {active.viewAllLabel && (
          <Link
            href={active.viewAllHref ?? "#"}
            onClick={onClose}
            className="text-red-600 text-sm font-medium font-montserrat leading-5 hover:underline"
          >
            {active.viewAllLabel}
          </Link>
        )}
      </div>

      {/* Right: CTA */}
      <Link
        href={config.cta.href}
        onClick={onClose}
        className="w-96 shrink-0 px-10 py-10 flex flex-col justify-end"
        style={{
          background:
            "radial-gradient(circle at 145% 88%, #fdba74 6%, #fdba74 13%, #ea580c 67%)",
        }}
      >
        <div className="flex items-end gap-4">
          <span className="text-white text-2xl font-medium font-montserrat leading-8 flex-1">
            {config.cta.text}
          </span>
          <IoChevronDownOutline className="-rotate-90 text-white shrink-0" size={24} />
        </div>
      </Link>
    </div>
  );
}

// ─── Flat Panel (Industries) ──────────────────────────────────────────────────

function FlatMegaMenuPanel({
  config,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: {
  config: FlatMenu;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed top-20 lg:top-24 left-0 right-0 z-61 bg-white border-b border-stone-300 shadow-lg flex min-h-72"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Content columns */}
      <div className="flex-1 flex gap-10 px-20 py-10">
        {config.columns.map((col, colIdx) => (
          <div key={colIdx} className={`flex flex-col gap-11 shrink-0${col.className ? ` ${col.className}` : ""}`}>
            {col.groups.map((group) => (
              <div key={group.heading} className="flex flex-col gap-2.5">
                {/* Heading */}
                {group.href ? (
                  <Link
                    href={group.href}
                    onClick={onClose}
                    className="text-stone-900 text-base font-semibold font-montserrat leading-6 hover:text-red-600 transition-colors"
                  >
                    {group.heading}
                  </Link>
                ) : (
                  <span className="text-stone-900 text-base font-semibold font-montserrat leading-6">
                    {group.heading}
                  </span>
                )}

                {/* Description (e.g. About Us cards) */}
                {group.description && (
                  <p className="text-stone-500 text-sm font-medium font-montserrat leading-5">
                    {group.description}
                  </p>
                )}

                {/* Flat items */}
                {group.items && group.items.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="text-stone-500 text-base font-medium font-montserrat leading-6 hover:text-stone-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Two sub-columns (e.g. Process Industries) */}
                {group.itemColumns && (
                  <div className="flex gap-8">
                    {group.itemColumns.map((subCol, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        {subCol.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="text-stone-500 text-base font-medium font-montserrat leading-6 hover:text-stone-900 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Right: CTA gradient or image */}
      {config.cta ? (
        <Link
          href={config.cta.href}
          onClick={onClose}
          className="w-96 shrink-0 px-10 py-10 flex flex-col justify-end"
          style={{
            background:
              "radial-gradient(circle at 145% 88%, #fdba74 6%, #fdba74 13%, #ea580c 67%)",
          }}
        >
          <div className="flex items-end gap-4">
            <span className="text-white text-2xl font-medium font-montserrat leading-8 flex-1">
              {config.cta.text}
            </span>
            <IoChevronDownOutline className="-rotate-90 text-white shrink-0" size={24} />
          </div>
        </Link>
      ) : config.image ? (
        <div className="w-96 shrink-0 relative overflow-hidden">
          <Image
            src={config.image}
            alt={config.imageCaption ?? ""}
            fill
            className="object-cover"
            sizes="384px"
          />
          {config.imageCaption && (
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-5">
              <span className="text-white text-lg font-semibold font-montserrat leading-5">
                {config.imageCaption}
              </span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

// ─── Animation constants ──────────────────────────────────────────────────────

const EASE = [0.4, 0, 0.2, 1] as const;
const DURATION = 0.5;
const LOGO_DURATION = 0.6;

// ─── Floating Logo ────────────────────────────────────────────────────────────

function FloatingLogo({ scrolled }: { scrolled: boolean }) {
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

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const scrolled = useScrolled(60);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(null);
  }, []);

  const activeItem = navItems.find((item) => item.label === activeMenu);

  return (
    <>
      {isHome && <FloatingLogo scrolled={scrolled} />}

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={false}
        animate={{
          backgroundColor: !isHome || scrolled ? "#201D1D" : "rgba(13,13,13,0)",
        }}
        transition={{ duration: DURATION, ease: EASE }}
      >
        <div className="container h-20 lg:h-24 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center">
            <Link href="/" className="lg:hidden">
              <Image
                src={logo}
                alt="Rotex"
                width={96}
                height={20}
                className="w-24 h-5 object-contain"
              />
            </Link>

            {isHome ? (
              <motion.div
                className="shrink-0 hidden lg:block"
                initial={false}
                animate={{ width: scrolled ? 168 : 0 }}
                transition={{ duration: LOGO_DURATION, ease: EASE }}
              />
            ) : (
              <Link href="/" className="hidden lg:flex items-center mr-6">
                <Image
                  src={logo}
                  alt="Rotex"
                  width={144}
                  height={31}
                  className="w-36 h-8 object-contain"
                />
              </Link>
            )}

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  onMouseEnter={() =>
                    item.megaMenu ? openMenu(item.label) : scheduleClose()
                  }
                  onMouseLeave={scheduleClose}
                >
                  <Link href={item.href} className="flex items-center gap-0.5 group">
                    <span
                      className={`text-sm font-medium font-montserrat whitespace-nowrap transition-colors duration-150 ${
                        activeMenu === item.label
                          ? "text-white"
                          : "text-stone-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.megaMenu && (
                      <IoChevronDownOutline
                        size={14}
                        className={`transition-all duration-150 shrink-0 ${
                          activeMenu === item.label
                            ? "text-white rotate-180"
                            : "text-stone-300 group-hover:text-white"
                        }`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
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

          {/* Mobile */}
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
                      className="flex items-center justify-between px-2 py-3 text-sm font-medium font-montserrat text-white/75 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    >
                      {item.label}
                      {item.megaMenu && (
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

      {/* Mega Menu */}
      <AnimatePresence>
        {activeMenu && activeItem?.megaMenu && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {activeItem.megaMenu.type === "category-switcher" ? (
              <CategorySwitcherPanel
                config={activeItem.megaMenu}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                onClose={closeMenu}
              />
            ) : (
              <FlatMegaMenuPanel
                config={activeItem.megaMenu}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                onClose={closeMenu}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
