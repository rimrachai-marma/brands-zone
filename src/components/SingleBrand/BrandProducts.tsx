"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";

interface BrandProductsProps {
  products: Product[];
  brandName: string;
}

const BrandProducts = ({ products, brandName }: BrandProductsProps) => {
  if (products.length === 0) {
    return (
      <motion.div
        className="text-center text-gray-500 border  p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No products found for <span className="font-semibold">{brandName}</span>
        .
      </motion.div>
    );
  }
 
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {products.map((p, idx) => (
        <Link href={`/products/${p.id}`} key={p.id}>
          <motion.div
            key={idx}
            className="p-4 flex flex-col items-center hover:shadow-lg transition border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Image
              src={p.image}
              alt={p.title}
              width={120}
              height={120}
              className="object-contain"
            />
            <h3 className="mt-3 font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-500">${p.price}</p>
            <p className="text-yellow-500 text-sm">⭐ {p.rating}</p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default BrandProducts;
