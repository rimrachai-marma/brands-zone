"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CategorySidebar from "./CategorySidebar";
import ProductItem from "../Products/product-item";
import { CategoryMini, UserProduct } from "@/types";
import { getUserTopCategoryProducts } from "@/lib/actions/user/products";
import { ChevronRight } from "lucide-react";
import { getCategoryTree } from "@/lib/actions/categories";

const FilterCollection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [categories, setCategories] = useState<CategoryMini[]>([]);
  const [activeCategoryName, setActiveCategoryName] = useState<string>();
  const [loading, setLoading] = useState({
    categories: true,
    products: true,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading((prev) => ({ ...prev, categories: true }));
        setError(null);

        const result = await getCategoryTree();

        if (result.status === "success" && result.data) {
          setCategories(result.data);
          // Auto-select first category instead of null
          if (result.data.length > 0) {
            setActiveCategory(result.data[0].slug);
            setActiveCategoryName(result.data[0].name);
          }
        } else {
          setError(result.message || "Failed to load categories");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      // Don't fetch until a category is selected
      if (!activeCategory) return;

      try {
        setLoading((prev) => ({ ...prev, products: true }));
        setError(null);

        const result = await getUserTopCategoryProducts({
          slug: activeCategory,
        });

        if (result.status === "success" && result.data) {
          setProducts(result.data as UserProduct[]);
        } else {
          setError(result.message || "Failed to load products");
          setProducts([]);
        }
      } catch (err) {
        setError("An unexpected error occurred while loading products");
        setProducts([]);
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="py-5 bg-white">
      <div className="container-fluid mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Shop by Category
              </h2>
              <p className="text-gray-600">Browse our curated collections</p>
            </div>

            {/* Active Category Indicator */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-500">Currently viewing:</span>
              <span className="font-medium text-primary">
                {activeCategoryName}
              </span>
            </div>
          </div>

          {/* Mobile Category Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>Browse Categories</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setActiveCategoryName={setActiveCategoryName}
              isMobileOpen={isMobileMenuOpen}
              setIsMobileOpen={setIsMobileMenuOpen}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {loading.products ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                        <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse" />
                        <div className="h-8 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-red-600 mb-2">Error loading products</p>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
            ) : products.length > 0 ? (
              <motion.div
                key={activeCategory || "all"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
              >
                {products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg mb-2 font-medium">
                    No products found
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try selecting a different category or check back later
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCollection;
