"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { HotProduct } from "@/types/products";

interface HotProductProps {
    hotProducts: HotProduct[];
}

const HotSaleProducts = ({ hotProducts }: HotProductProps) => {
    if (!hotProducts || hotProducts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No hot sale products available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotProducts.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </div>
    );
};

export default HotSaleProducts;