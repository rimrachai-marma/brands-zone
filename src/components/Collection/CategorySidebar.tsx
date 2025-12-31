"use client";
import { Category } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Tag, ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: (slug: string | null) => void;
  setActiveCategoryName?: (name: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  setActiveCategoryName,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const [openMenuPath, setOpenMenuPath] = useState<string[]>([]);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<
    string[]
  >([]);

  const handleCategoryClick = (
    categorySlug: string | null,
    categoryName: string,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveCategory(categorySlug);
    if (setActiveCategoryName) {
      setActiveCategoryName(categoryName);
    }
    setIsMobileOpen(false);
    setOpenMenuPath([]);
  };

  const toggleMobileExpand = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedMobileCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleMenuOpen = (slug: string, parentPath: string[]) => {
    setOpenMenuPath([...parentPath, slug]);
  };

  const handleMenuClose = () => {
    setOpenMenuPath([]);
  };

  const isMenuOpen = (slug: string) => {
    return openMenuPath.includes(slug);
  };

  // Check if category or any of its children/descendants are active
  const isCategoryOrChildActive = (category: Category): boolean => {
    if (activeCategory === category.slug) return true;
    if (!category.children || category.children.length === 0) return false;
    return category.children.some((child) => isCategoryOrChildActive(child));
  };

  const renderNestedSubmenu = (
    children: Category[],
    parentPath: string[],
    level: number = 1
  ) => {
    if (!children || children.length === 0) return null;

    return (
      <div
        className="absolute left-full top-0 ml-0 min-w-[220px]"
        style={{ zIndex: 10000 + level * 10 }}
      >
        {/* Bridge area - invisible connector */}
        <div className="absolute right-full top-0 w-4 h-full" />

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          className="bg-white rounded-xl shadow-xl border border-gray-200 p-2"
        >
          {children.map((child) => {
            const childPath = [...parentPath, child.slug];
            const isOpen = isMenuOpen(child.slug);
            const isActive = isCategoryOrChildActive(child);

            return (
              <div
                key={child.slug}
                className="relative"
                onMouseEnter={() => handleMenuOpen(child.slug, parentPath)}
              >
                <button
                  onClick={(e) =>
                    handleCategoryClick(child.slug, child.name, e)
                  }
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg transition-all ${
                    activeCategory === child.slug
                      ? "bg-primary text-white"
                      : isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className="font-medium text-sm truncate flex-1 text-left">
                    {child.name}
                  </span>
                  {child.children && child.children.length > 0 && (
                    <ChevronRight className="w-4 h-4 shrink" />
                  )}
                </button>

                {isOpen && child.children && child.children.length > 0 && (
                  <AnimatePresence>
                    {renderNestedSubmenu(child.children, childPath, level + 1)}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  };

  const MobileCategoryItem: React.FC<{
    category: Category;
    level: number;
  }> = ({ category, level }) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedMobileCategories.includes(category.slug);
    const indent = level * 16; // 16px per level
    const isActive = activeCategory === category.slug;
    const hasActiveChild = isCategoryOrChildActive(category) && !isActive;

    return (
      <div className="space-y-2">
        <div
          className="flex items-stretch gap-2"
          style={{ marginLeft: `${indent}px` }}
        >
          <button
            onClick={(e) =>
              handleCategoryClick(category.slug, category.name, e)
            }
            className={`flex-1 text-left p-3 rounded-lg transition-all text-sm ${
              isActive
                ? "bg-primary text-white shadow-lg"
                : hasActiveChild
                ? "bg-primary/10 text-primary font-semibold"
                : level === 0
                ? "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700"
                : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
            }`}
          >
            <div className="font-medium">{category.name}</div>
          </button>

          {hasChildren && (
            <button
              onClick={(e) => toggleMobileExpand(category.slug, e)}
              className={`w-12 rounded-lg transition-all flex items-center justify-center shrink ${
                isExpanded
                  ? "bg-primary text-white"
                  : level === 0
                  ? "bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-600"
                  : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600"
              }`}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Recursive children */}
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 overflow-hidden"
          >
            {category.children!.map((child) => (
              <MobileCategoryItem
                key={child.slug}
                category={child}
                level={level + 1}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:col-span-3">
        <div
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm sticky top-4"
          style={{ zIndex: 100 }}
          onMouseLeave={handleMenuClose}
        >
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Shop Categories
                </h3>
                <p className="text-gray-500 text-sm">Browse collections</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {categories.map((category) => {
              const isOpen = isMenuOpen(category.slug);
              const isActive = isCategoryOrChildActive(category);

              return (
                <div
                  key={category.slug}
                  className="relative"
                  onMouseEnter={() => handleMenuOpen(category.slug, [])}
                >
                  <button
                    onClick={(e) =>
                      handleCategoryClick(category.slug, category.name, e)
                    }
                    className={`w-full flex items-center justify-between gap-3 p-4 py-3 rounded-lg transition-all ${
                      activeCategory === category.slug
                        ? "bg-linear-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                        : isActive
                        ? "bg-primary/5 text-primary hover:bg-primary/10"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`w-3 h-3 rounded-full shrink ${
                          activeCategory === category.slug || isActive
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="font-medium truncate">
                        {category.name}
                      </span>
                    </div>
                    {category.children && category.children.length > 0 && (
                      <ChevronRight className="w-4 h-4 shrink" />
                    )}
                  </button>

                  {/* Submenu on Hover */}
                  {isOpen &&
                    category.children &&
                    category.children.length > 0 && (
                      <AnimatePresence>
                        {renderNestedSubmenu(category.children, [
                          category.slug,
                        ])}
                      </AnimatePresence>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="block lg:hidden">
          <AnimatePresence>
            <div className="fixed inset-0" style={{ zIndex: 99999 }}>
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Drawer */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-100 bg-linear-to-r from-primary/5 to-transparent shrink">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Tag className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Categories
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsMobileOpen(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Select a category to filter products
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2 pb-6">
                      {categories.map((category) => (
                        <MobileCategoryItem
                          key={category.slug}
                          category={category}
                          level={0}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default CategorySidebar;
