"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategorySidebar from "./CategorySidebar";
import ProductItem from "../Products/product-item";
import { CategoryMini, UserProduct } from "@/types";
import { getUserTopCategories, getUserTopCategoryProducts } from "@/lib/actions/user/products";
import { ChevronRight } from "lucide-react";

const FilterCollection = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [products, setProducts] = useState<UserProduct[]>([]);
    const [categories, setCategories] = useState<CategoryMini[]>([]);
    const [loading, setLoading] = useState({
        categories: true,
        products: true
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(prev => ({ ...prev, categories: true }));
                setError(null);

                const result = await getUserTopCategories({ limit: 5, is_random: true });

                if (result.status === "success" && result.data) {
                    setCategories(result.data);
                    if (result.data.length > 0) {
                        setActiveCategory(result.data[0].slug);
                    }
                } else {
                    setError(result.message || "Failed to load categories");
                }
            } catch (err) {
                setError("An unexpected error occurred");
                console.error(err);
            } finally {
                setLoading(prev => ({ ...prev, categories: false }));
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!activeCategory) return;

            try {
                setLoading(prev => ({ ...prev, products: true }));
                setError(null);

                const result = await getUserTopCategoryProducts({ slug: activeCategory });

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
                setLoading(prev => ({ ...prev, products: false }));
            }
        };

        fetchProducts();
    }, [activeCategory]);

    const getCategoryName = () => {
        if (!activeCategory) return "Products";
        const category = categories.find(cat => cat.slug === activeCategory);
        return category?.name || "Products";
    };

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
                            <p className="text-gray-600">
                                Browse our curated collections
                            </p>
                        </div>

                        {/* Active Category Indicator */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-gray-500">Currently viewing:</span>
                            <span className="font-medium text-primary">
                                {getCategoryName()}
                            </span>
                        </div>
                    </div>

                    {/* Mobile Category Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <span>Browse Categories</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Desktop */}
                    <div className="hidden lg:block">
                        <CategorySidebar
                            categories={categories}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            isMobileOpen={isMobileMenuOpen}
                            setIsMobileOpen={setIsMobileMenuOpen}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {loading.products ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                        <div className="space-y-3">
                                            <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"/>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"/>
                                                <div className="h-5 bg-gray-200 rounded w-1/4"/>
                                                <div className="h-8 bg-gray-200 rounded"/>
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
                            >
                                {products.map((product) => (
                                    <ProductItem key={product.id} product={product} />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-xl">
                                <p className="text-gray-500 text-lg mb-2">No products found</p>
                                <p className="text-gray-400 text-sm">
                                    Try selecting a different category
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCollection;