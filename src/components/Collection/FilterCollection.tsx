"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategorySidebar from "./CategorySidebar";
import { FILTER_CATEGORY } from "@/constant/categoryFilterData";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import ProductItem from "../Products/product-item";
import { PRODUCTS_DATA } from "@/constant/productsData";

const FilterCollection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter products based on the active category
  const filteredProducts = useMemo(() => {
    if (!activeCategory) {
      return PRODUCTS_DATA;
    }
    return PRODUCTS_DATA.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white/50  py-16 ">
      <div className="container mx-auto ">
        <div className="grid grid-cols-12">
          <CategorySidebar
            categories={FILTER_CATEGORY}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isMobileOpen={isMobileMenuOpen}
            setIsMobileOpen={setIsMobileMenuOpen}
          />

          {/* 7. Main Content / Product Grid */}
          <main className="py-6 col-span-12 lg:col-span-9">
            <div className=" mb-4 flex items-center justify-between">
              <h1 className="text-3xl sm:text-2xl font-extrabold">
                {activeCategory
                  ? FILTER_CATEGORY.find((c) => c.key === activeCategory)?.name
                  : "All Products"}
              </h1>

              <Button onClick={() => setIsMobileMenuOpen(true)}>
                <Filter />
                <span>Filter</span>
              </Button>
            </div>

            <motion.div
              key={activeCategory || "all"} // Key change forces stagger reset on category change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            >
              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                ) : (
                  <motion.div
                    key="no-products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="lg:col-span-4 text-center p-12 bg-gray-100  "
                  >
                    <p className="text-xl font-medium ">
                      No products found in this category.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FilterCollection;
