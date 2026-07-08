import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminFooter } from "@/components/admin/footer";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <AdminHeader email={session?.user?.email} />
        <main className="flex-1 p-6">{children}</main>
        <AdminFooter />
      </div>

      <Toaster />
    </div>
  );
}
