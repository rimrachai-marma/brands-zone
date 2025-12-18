"use client";

import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Categories as CategoriesType } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MainLogo from "./MainLogo";

import { AiOutlineMenuFold } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Categories from "./Categories";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {sidebarCategories} from "@/constant/ctgr";

interface Props {
  categories: sidebarCategories;
}

const AllCategories = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
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
          <Categories categories={categories} />
        </ScrollArea>

        {/* Footer */}
        <div className="px-6 py-4 border-t shrink-0">
          {/* <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1">
              Sign In
            </Button>
            <Button className="flex-1">Sign Up</Button>
          </div> */}

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="font-medium text-lg">Hello, John Doe</h2>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AllCategories;
