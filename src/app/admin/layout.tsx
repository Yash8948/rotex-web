import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Rotex Admin",
  description: "Rotex admin panel",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${montserrat.variable} min-h-screen bg-background font-montserrat text-foreground`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
