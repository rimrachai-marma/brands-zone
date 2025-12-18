"use client";
import {CategoryMini} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

const CategorySidebar: React.FC<{
  categories: CategoryMini[];
  activeCategory: string | null;
  setActiveCategory: (slug: string | null) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}> = ({
  categories,
  activeCategory,
  setActiveCategory,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const handleCategoryClick = (slug: string | null) => {
    setActiveCategory(slug);
    setIsMobileOpen(false);
  };

  const SidebarContent = (
    <div className="p-6 ">
      <ul className="space-y-1">
        {categories.map((category) => (
          <motion.li
            key={category.slug}
            className="relative border-b border-b-primary/50 hover:text-primary first:border-t first:border-t-primary/50 cursor-pointer transition-colors"
            onClick={() => handleCategoryClick(category.slug)}
            whileHover={{ x: 5 }}
          >
            {activeCategory === category.slug && (
              <motion.div
                layoutId="category-indicator"
                className="absolute inset-y-0 left-0 w-1 bg-primary"
              />
            )}
            <div
              className={`py-2 pl-4 text-base font-medium ${
                activeCategory === category.slug ? "text-primary" : ""
              }`}
            >
              {category.name}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-full col-span-3 sticky top-0 overflow-y-auto">
        {SidebarContent}
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.div
              className="absolute left-0 top-0 w-64 h-full bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking sidebar content
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsMobileOpen(false)} className="">
                  <X size={24} />
                </button>
              </div>
              {SidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategorySidebar;
