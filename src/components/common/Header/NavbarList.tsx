"use client";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NAVBAR_DATA } from "@/constant/navbarData";
import { useIsMobile } from "@/hooks/use-mobile";

export function NavbarList() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        {NAVBAR_DATA.map((item) => (
          <NavigationMenuItem key={item.id}>
            {/* If item has child menu */}
            {item.child ? (
              <>
                <NavigationMenuTrigger className="hover:text-primary">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="z-50 bg-white p-0">
                  <ul className="w-[200px]">
                    {item.child.map((child) => (
                      <li key={child.id}>
                        <NavigationMenuLink
                          className="m-0 p-0"
                          href={child.url}
                          asChild
                        >
                          <Link
                            href={child.url ?? "#"}
                            className="block p-3 hover:bg-secondary/10 hover:text-primary transition-colors"
                          >
                            {child.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              // No submenu
              <NavigationMenuLink asChild className="hover:text-primary">
                <Link href={item.url || "#"}>{item.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
