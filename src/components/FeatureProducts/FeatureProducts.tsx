"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import React from "react";

interface Props {
  categories: Category[];
}

const CategoriesGrid: React.FC<Props> = ({ categories }) => {
  return (
    <div className="py-20 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover premium collections across all lifestyle categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -12 }}
              className="col-span-1"
            >
              <Link href={category.slug} className="block group h-full">
                <div className="relative h-[250px] lg:h-[500px] overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <Image
                    src={category.image_url ?? ""}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    priority={idx < 3}
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="mb-2">
                      <span className="inline-block bg-white text-gray-900 text-sm font-bold px-4 py-2 rounded-full">
                        {category.products_count}+ Products
                      </span>
                    </div>
                    <h3 className="text-2xl font-light text-white mb-4">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-white/90 font-medium">
                      <span>Shop Now</span>
                      <svg
                        className="w-6 h-6 ml-3 transform group-hover:translate-x-3 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesGrid;
