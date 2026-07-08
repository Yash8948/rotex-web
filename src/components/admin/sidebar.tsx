"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Factory, Home, Settings, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home Page", icon: Home },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/industries", label: "Industries", icon: Factory },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/global", label: "Global Config", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-14 items-center border-b border-border px-5">
        <Image src={logo} alt="Rotex" className="h-7 w-auto brightness-0 invert" priority />
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="block">
              <Button
                variant={active ? "secondary" : "ghost"}
                className="h-9 w-full justify-start gap-3 px-3 text-sm font-medium"
              >
                <Icon className="size-4" />
                {label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
