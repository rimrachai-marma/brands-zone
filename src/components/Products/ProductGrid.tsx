"use client";
import { UserProduct } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import WishlistButton from "@/components/common/WishlistButton";
import Link from "next/link";
import {ArrowRight, ShoppingBag} from "lucide-react";

interface ProductGridProps {
    products: UserProduct[] | null;
}

const ProductGrid = ({ products }: ProductGridProps) => {
    if (!products || products.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">No products available</p>
            </div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
            }}
        >
            {products.map((item, index) => (
                <motion.div
                    key={item.id || index}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                    {/* Image Container */}
                    <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
                        <Link href={`/products/${item.slug}`} className="block w-full h-full">
                            <Image
                                src={item.image || "/placeholder.png"}
                                alt={item.title}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                        </Link>

                        {/* Wishlist Button - Top Right */}
                        <div className="absolute top-3 right-3 z-10">
                            <WishlistButton product={item} />
                        </div>

                        {/* Discount Badge */}
                        {item.discount?.campaign && item.discount.percentage > 0 && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                -{item.discount.percentage}%
                            </div>
                        )}
                    </div>

                    <div className="p-4 space-y-3">
                        {/* Title */}
                        <Link href={`/products/${item.slug}`}>
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 h-10">
                                {item.title}
                            </h3>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-sm ${
                                        i < Math.round(item.rating || 0)
                                            ? "text-yellow-400"
                                            : "text-gray-200"
                                    }`}
                                >
                                ★
                            </span>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                            ({item.rating?.toFixed(1) || 0})
                        </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                        </span>

                            {item.discount?.campaign && item.discount.percentage > 0 && (
                                <span className="text-sm text-gray-400 line-through">
                                ${item.original_price?.toFixed(2) ||
                                    (item.price * (1 + item.discount.percentage / 100)).toFixed(2)}
                            </span>
                            )}
                        </div>

                        {/* Clean Button */}
                        <Link
                            href={`/products/${item.slug}`}
                            className="flex items-center justify-center gap-2 w-full mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 group/btn"
                        >
                            <span>View Product</span>
                            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ProductGrid;