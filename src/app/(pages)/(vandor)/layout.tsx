import React from "react";
import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/shared/navbar";
import { VendorSidebar } from "./brands/_components/vendor-sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <VendorSidebar />
      <SidebarInset>
        <Navbar />
        <main className="bg-slate-50 p-6 lg:p-8 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
