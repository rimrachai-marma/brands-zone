"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedGlassOverlay from "../ui/AnimatedGlassOverlay";

const staticImages = [
  { url: "/products/hot-deal-1", src: "/images/Hero/img10.png" },
  { url: "/products/hot-deal-2", src: "/images/Hero/img4.PNG" },
  { url: "/products/hot-deal-3", src: "/images/Hero/img5.PNG" },
];

const FeatureProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {staticImages.map((prod, idx) => (
        <motion.div
          className="border border-gray-200"
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: idx * 0.2 }} // stagger by index
        >
          <Link
            href={prod.url}
            className="w-full h-full block relative overflow-hidden group cursor-pointer"
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
            <AnimatedGlassOverlay />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureProducts;
