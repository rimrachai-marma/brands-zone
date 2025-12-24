"use client";
import { CategoryMini } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Tag } from "lucide-react";
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

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
                <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Tag className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Shop Categories</h3>
                                <p className="text-gray-500 text-sm">Browse collections</p>
                            </div>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="space-y-2">


                        {categories.map((category) => (
                            <button
                                key={category.slug}
                                onClick={() => handleCategoryClick(category.slug)}
                                className={`w-full flex items-center justify-between p-4 py-3 rounded-lg transition-all ${
                                    activeCategory === category.slug
                                        ? "bg-linear-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                                        : "hover:bg-gray-50 text-gray-700"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${
                                        activeCategory === category.slug ? "bg-primary" : "bg-gray-300"
                                    }`} />
                                    <div className="text-left">
                                        <span className="font-medium block">{category.name}</span>

                                    </div>
                                </div>
                                    <ChevronRight className="w-4 h-4" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            className="absolute left-0 top-0 h-full w-80 bg-white"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="h-full flex flex-col">
                                {/* Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">Categories</h3>
                                        <button
                                            onClick={() => setIsMobileOpen(false)}
                                            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                                        >
                                            <X className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                    <p className="text-gray-500">Select a category to filter products</p>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleCategoryClick(null)}
                                            className={`w-full text-left p-4 rounded-xl ${
                                                activeCategory === null
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-50 hover:bg-gray-100"
                                            }`}
                                        >
                                            <div className="font-medium">All Products</div>
                                        </button>

                                        {categories.map((category) => (
                                            <button
                                                key={category.slug}
                                                onClick={() => handleCategoryClick(category.slug)}
                                                className={`w-full text-left p-4 rounded-xl ${
                                                    activeCategory === category.slug
                                                        ? "bg-primary text-white"
                                                        : "bg-gray-50 hover:bg-gray-100"
                                                }`}
                                            >
                                                <div className="font-medium">{category.name}</div>

                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CategorySidebar;