"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { CATEGORIES } from "@/constant/categoriesData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AllCategories = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            onClick={toggleMenu}
            className={cn(
              "bg-primary text-white flex items-center justify-between w-full px-8 h-15 cursor-pointer transition-colors",
              isOpen ? "bg-secondary" : "hover:bg-secondary"
            )}
          >
            <div className="flex gap-3 items-center">
              <AiOutlineMenuFold />
              <span>All Categories</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes />
                </motion.div>
              ) : (
                <motion.div
                  key="down"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaAngleDown />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </DropdownMenuTrigger>

        {/* Dropdown content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute z-10 w-full top-[250px] left-0"
            >
              <DropdownMenuContent
                align="start"
                className={cn(
                  // ✅ Responsive width and layout
                  "relative bg-white shadow-lg overflow-visible border-2 border-primary/20 top-5",
                  "w-full sm:w-[280px] md:w-[340px] lg:w-[380px]",
                  // ✅ Keep the little arrow indicator
                  "before:content-[''] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:rotate-45 before:w-6 before:h-6 before:bg-white before:border-l-2 before:border-t-2 before:border-primary/20"
                )}
              >
                {/* ✅ Responsive scroll height */}
                <ScrollArea className="max-h-[60vh]">
                  {CATEGORIES.map((cat) =>
                    cat.child ? (
                      <DropdownMenuSub key={cat.id}>
                        <DropdownMenuSubTrigger className="px-6 py-3 hover:text-primary hover:bg-secondary/10 cursor-pointer transition-colors flex justify-between items-center border-b">
                          <span>{cat.title}</span>
                        </DropdownMenuSubTrigger>

                        {/* ✅ Responsive grid for submenu */}
                        <DropdownMenuSubContent className="bg-white shadow-md w-full sm:w-[360px] md:w-[520px] lg:w-[700px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3">
                          {cat.child.map((sub) => (
                            <DropdownMenuItem key={sub.id}>
                              <Link
                                href={cat.url ?? "#"}
                                className="flex items-center gap-3 transition-colors hover:text-primary hover:bg-secondary/10 w-full p-2"
                              >
                                <div className="shrink-0">
                                  <Image
                                    src={sub.image}
                                    alt={sub.title}
                                    width={80}
                                    height={80}
                                    className="object-cover "
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium">
                                    {sub.title}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {sub.price}
                                  </span>
                                </div>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem
                        key={cat.id}
                        className="px-6 py-3 cursor-pointer transition-colors hover:text-primary hover:bg-secondary/10 border-b last:border-0"
                      >
                        <Link href={cat.url ?? "#"}>{cat.title}</Link>
                      </DropdownMenuItem>
                    )
                  )}
                </ScrollArea>
              </DropdownMenuContent>
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </div>
  );
};

export default AllCategories;
