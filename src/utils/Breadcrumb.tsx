"use client";

import Link from "next/link";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

export function Breadcrumb() {
  const pathname = usePathname();

  // Split path into segments and filter out empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Hide breadcrumb on home page
  if (segments.length === 0) return null;

  // Build full paths for each segment
  const paths = segments.map(
    (seg, idx) => "/" + segments.slice(0, idx + 1).join("/")
  );

  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Dynamic segments */}
        {segments.map((segment, idx) => {
          const isLast = idx === segments.length - 1;
          const path = paths[idx];

          return (
            <Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {decodeURIComponent(segment.replace(/-/g, " "))}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path} className="capitalize">
                      {decodeURIComponent(segment.replace(/-/g, " "))}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
