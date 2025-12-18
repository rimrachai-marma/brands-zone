"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import MainLogo from "./MainLogo";
import Categories from "./Categories";
import {sidebarCategories} from "@/constant/ctgr";

interface Props {
  categories: sidebarCategories;
}
const MobileMenu = ({ categories }: Props) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Open menu">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent className="p-0 flex flex-col h-full">
          {/* Fixed Header */}
          <SheetHeader className="py-4 border-b shrink-0">
            <SheetTitle>
              <MainLogo />
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable Content Area */}
          <ScrollArea className="flex-1 my-0 overflow-y-auto">
            <div className="flex flex-col">
              {/* Categories Navigation Section */}
              <Categories categories={categories} />

              <Separator />

              {/* Main Navigation Menu */}
              <div className="space-y-1 px-2 py-4">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start rounded"
                >
                  <Link href="/">Home</Link>
                </Button>



                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start rounded"
                >
                  <Link href="/search">Products</Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start rounded"
                >
                  <Link href="/blog">Blog</Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start rounded"
                >
                  <Link href="/brands">Brands</Link>
                </Button>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="px-6 py-4 border-t shrink-0">
            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1">
                Sign In
              </Button>
              <Button className="flex-1">Sign Up</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
