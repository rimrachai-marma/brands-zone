'use client'
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/Products/ProductGrid";
import { getUserTopCategories, getUserTopCategoryProducts } from "@/lib/actions/user/products";
import { CategoryMini, UserProduct } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesTabs = () => {
    const [categories, setCategories] = useState<CategoryMini[]>([]);
    const [products, setProducts] = useState<UserProduct[]>([]);
    const [activeTab, setActiveTab] = useState<string>("");
    const [loading, setLoading] = useState({
        categories: true,
        products: true
    });
    const [error, setError] = useState<string | null>(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(prev => ({ ...prev, categories: true }));
                setError(null);

                const result = await getUserTopCategories({limit:4,is_random:false});

                if (result.status === "success" && result.data) {
                    setCategories(result.data);

                    // Set first category as default active tab
                    if (result.data.length > 0) {
                        setActiveTab(result.data[0].slug);
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

    // Fetch products when activeTab changes
    useEffect(() => {
        const fetchProducts = async () => {
            if (!activeTab) return;

            try {
                setLoading(prev => ({ ...prev, products: true }));
                setError(null);

                const result = await getUserTopCategoryProducts({ slug: activeTab });

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
    }, [activeTab]);

    // Handle tab change
    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    // Loading state for categories
    if (loading.categories) {
        return (
            <div className="flex w-full flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between mb-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error && categories.length === 0) {
        return (
            <div className="flex w-full flex-col items-center justify-center py-12">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    // No categories state
    if (categories.length === 0) {
        return (
            <div className="flex w-full flex-col items-center justify-center py-12">
                <p className="text-gray-500">No categories available</p>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between mb-4">
                    <h4 className="text-xl font-semibold text-primary">
                        Top Categories Products
                    </h4>
                    <TabsList className="bg-white">
                        {categories.map(category => (
                            <TabsTrigger
                                key={category.id}
                                value={category.slug}
                                className="data-[state=active]:bg-primary data-[state=active]:text-white !rounded-none"
                            >
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {categories.map(category => (
                    <TabsContent key={category.id} value={category.slug}>
                        {loading.products ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {[...Array(8)].map((_, i) => (
                                    <Skeleton key={i} className="h-48 w-full" />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center py-12">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex items-center justify-center py-12">
                                <p className="text-gray-500">No products found in this category</p>
                            </div>
                        ) : (
                            <ProductGrid products={products} />
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default CategoriesTabs;