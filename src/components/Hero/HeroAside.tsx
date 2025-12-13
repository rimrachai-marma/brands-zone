"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const staticImages = [
  { url: "/products/hot-deal-1", src: "/images/banner/banner-3.avif" },
  { url: "/products/hot-deal-2", src: "/images/banner/banner-2.avif" },
];

const HeroAside = () => {
  return (
    <motion.div
      className="flex flex-col gap-6 col-span-12 lg:col-span-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {staticImages.map((prod, idx) => (
        <Link
          href={prod.url}
          key={idx}
          className="w-full h-full relative overflow-hidden group cursor-pointer"
        >
          <Image
            src={prod.src}
            alt={`Static Image ${idx + 1}`}
            width={576}
            height={250}
            priority
            loading="eager"
            className="object-cover w-full h-full"
          />

          {/* Animated glass overlay */}
          <div className="absolute inset-0 w-60 h-200 -rotate-35 bg-white/20 backdrop-blur-sm transform translate-x-200 -translate-y-60 group-hover:-translate-x-120 transition-transform duration-800"></div>
        </Link>
      ))}
    </motion.div>
  );
};

export default HeroAside;
