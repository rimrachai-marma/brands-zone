"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import WishlistButton from "../common/WishlistButton";
import Link from "next/link";
import { getUserRandomProducts } from "@/lib/actions/user/products";
import { useEffect, useState } from "react";
import { UserProduct } from "@/types";

const ExtraProductsItems = () => {
    const [products, setProducts] = useState<UserProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getUserRandomProducts({ is_new: false,limit:5 });
                if (result.status === "success" && result.data) {
                    setProducts(result.data as UserProduct[]);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                setProducts([]);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-10">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                        <div className="space-y-3">
                            <div className="w-full h-56 bg-gray-200 rounded-lg animate-pulse"/>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4"/>
                                <div className="h-5 bg-gray-200 rounded w-1/4"/>
                                <div className="h-8 bg-gray-200 rounded"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!products.length) {
        return null; // Return nothing if no products
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-10"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
            }}
        >
            {products.map((item, index) => (
                <motion.div
                    key={index}
                    variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                    {/* Image */}
                    <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                        <Link href={`/products/${item.slug}`} className="block w-full h-full">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-400"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </Link>
                        <div className="absolute top-2 right-2">
                            <WishlistButton product={item} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-5">
                        <Link href={`/products/${item.slug}`}>
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                                {item.title}
                            </h3>
                        </Link>

                        <div className="flex items-center justify-between mt-3">
                            <span className="text-base font-bold text-gray-900">
                                ${item.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-xs ${
                                            i < Math.round(item.rating || 0)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link
                            href={`/products/${item.slug}`}
                            className="block w-full text-center text-sm font-medium text-primary border border-primary rounded py-2 hover:bg-primary hover:text-white transition-colors duration-200"
                        >
                            View Details
                        </Link>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ExtraProductsItems;