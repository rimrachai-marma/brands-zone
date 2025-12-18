"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { HotProductProps } from "@/types";

const HotSaleProducts = ({ hotProducts }: HotProductProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotProducts.map((product) => (
        <motion.div key={product.id} transition={{ duration: 0.3 }}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default HotSaleProducts;
