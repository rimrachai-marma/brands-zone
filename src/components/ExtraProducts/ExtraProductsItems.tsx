"use client";
import { PRODUCTS_DATA } from "@/constant/productsData";
import Image from "next/image";
import { motion } from "framer-motion";
import WishlistButton from "../common/WishlistButton";
import Link from "next/link";

const ExtraProductsItems = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {PRODUCTS_DATA.slice(0, 4).map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white px-5 py-10 flex items-center overflow-hidden group relative cursor-pointer border border-primary/20 transition-all duration-300"
        >
          {/* Image */}
          <div className="relative w-40 h-40 overflow-hidden">
            <Link href={`/products/${item.id}`} className="w-full h-full block">
              {" "}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
          </div>

          <WishlistButton product={item} />

          {/* Content */}
          <div className="p-4 text-center space-y-2">
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
              <Link
                href={`/products/${item.id}`}
                className="w-full h-full block"
              >
                {" "}
                {item.title}
              </Link>
            </h3>
            <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
            <div className="flex justify-center items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.round(item.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExtraProductsItems;
