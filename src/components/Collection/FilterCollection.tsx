"use client";
import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import CategorySidebar from "./CategorySidebar";
import ProductItem from "../Products/product-item";
import {CategoryMini, UserProduct} from "@/types";
import {getUserTopCategories, getUserTopCategoryProducts} from "@/lib/actions/user/products";


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
                setLoading(prev => ({...prev, categories: true}));
                setError(null);

                const result = await getUserTopCategories({limit: 5, is_random: true});

                if (result.status === "success" && result.data) {
                    setCategories(result.data);

                    // Set first category as default active tab
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
                setLoading(prev => ({...prev, categories: false}));
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


    return (
        <div className=" bg-white/50  py-16 ">
            <div className=" mx-auto container-fluid ">
                <div className="grid grid-cols-12">
                    <CategorySidebar
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        isMobileOpen={isMobileMenuOpen}
                        setIsMobileOpen={setIsMobileMenuOpen}
                    />

                    {/* 7. Main Content / Product Grid */}
                    <main className=" col-span-12 lg:col-span-9">
                        <div className=" mb-4 flex items-center justify-between">
                            <h1 className="text-3xl sm:text-2xl font-extrabold">
                                {/*{activeCategory*/}
                                {/*    ? FILTER_CATEGORY.find((c) => c.key === activeCategory)?.name*/}
                                {/*    : "All Products"}*/}
                            </h1>

                        </div>

                        <motion.div
                            key={activeCategory || "all"} // Key change forces stagger reset on category change
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                        >
                            <AnimatePresence mode="wait">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductItem key={product.id} product={product}/>
                                    ))
                                ) : (
                                    <motion.div
                                        key="no-products"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
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
