"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { BrandGridProps } from "@/types";
import Link from "next/link";

const BrandGrid = ({ brands }: BrandGridProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {brands.map((brand, idx) => (
        <Link href={`/brands/${brand.id}`} key={brand.id}>
          <motion.div
            className="border border-primary/20 w-full flex flex-col h-75 hover:shadow-lg group transition cursor-pointer relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="absolute top-4 right-4 object-cover z-1 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all"
            />
            <div className="relative z-2  p-4">
              <div className="max-w-40 mb-4">
                <h3 className="font-medium text-2xl">{brand.name}</h3>
                <p className="mt-4 mb-1">{brand.location}</p>
                <p>{brand.mobile}</p>
              </div>
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="object-contain ms-auto"
              />
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default BrandGrid;
