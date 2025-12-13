"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "./Breadcrumb";

const ClientBreadcrumb = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <section className="py-3 bg-secondary/10">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
    </section>
  );
};

export default ClientBreadcrumb;
