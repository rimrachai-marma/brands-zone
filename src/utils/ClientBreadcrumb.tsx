"use client";

import { usePathname } from "next/navigation";
import { PageBreadcrumb } from "./PageBreadcrumb";

const ClientBreadcrumb = () => {
  const pathname = usePathname();

  // Hide on home page
  if (pathname === "/") return null;

  return (
    <section className="py-3 bg-secondary/10">
      <div className="container mx-auto">
        <PageBreadcrumb />
      </div>
    </section>
  );
};

export default ClientBreadcrumb;
