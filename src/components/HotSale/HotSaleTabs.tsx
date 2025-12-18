"use client";
import { useState, useEffect } from "react";
import HotSaleProducts from "@/components/Products/HotSaleProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getHotSaleProductsByDiscount } from "@/lib/actions/user/campaigns";
import { HotProduct } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const HotSaleTabs = () => {
    const [activeTab, setActiveTab] = useState("20");
    const [products, setProducts] = useState<{
        [key: string]: HotProduct[];
    }>({
        "20": [],
        "25": [],
        "33": [],
    });
    const [loading, setLoading] = useState<{
        [key: string]: boolean;
    }>({
        "20": true,
        "25": true,
        "33": true,
    });
    const [error, setError] = useState<string | null>(null);

    // Fetch products for the initial tab
    useEffect(() => {
        fetchProductsByDiscount("20");
    }, []);

    const fetchProductsByDiscount = async (discount: string) => {
        if (products[discount].length > 0) return;

        try {
            setLoading(prev => ({ ...prev, [discount]: true }));
            setError(null);

            const result = await getHotSaleProductsByDiscount(discount);

            if (result.status === "success" && result.data) {
                setProducts(prev => ({
                    ...prev,
                    [discount]: result.data as HotProduct[]
                }));
            } else {
                setError(result.message || `Failed to load ${discount}% off products`);
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, [discount]: false }));
        }
    };

    const handleTabChange = async (value: string) => {
        setActiveTab(value);
        await fetchProductsByDiscount(value);
    };

    // Loading skeleton for the entire section
    if (loading["20"] && loading["25"] && loading["33"] && Object.values(products).every(arr => arr.length === 0)) {
        return (
            <div className="flex w-full flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-64" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-[500px] w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <h4 className="text-xl font-semibold text-primary">
                        Hot Sale Products
                    </h4>
                    <TabsList className="bg-white">
                        <TabsTrigger value="20" className="relative">
                            20% Off
                            {loading["20"] && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="25" className="relative">
                            25% Off
                            {loading["25"] && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="33" className="relative">
                            33% Off
                            {loading["33"] && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                            )}
                        </TabsTrigger>
                    </TabsList>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <p>{error}</p>
                    </div>
                )}

                <TabsContent value="20">
                    {loading["20"] ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-[500px] w-full rounded-xl" />
                            ))}
                        </div>
                    ) : products["20"].length > 0 ? (
                        <HotSaleProducts hotProducts={products["20"]} />
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">No 20% off products available</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="25">
                    {loading["25"] ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-[500px] w-full rounded-xl" />
                            ))}
                        </div>
                    ) : products["25"].length > 0 ? (
                        <HotSaleProducts hotProducts={products["25"]} />
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">No 25% off products available</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="33">
                    {loading["33"] ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-[500px] w-full rounded-xl" />
                            ))}
                        </div>
                    ) : products["33"].length > 0 ? (
                        <HotSaleProducts hotProducts={products["33"]} />
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-600">No 33% off products available</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default HotSaleTabs;