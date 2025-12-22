'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Running",
    url: "/category/running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&auto=format&fit=crop",
    itemCount: 156,
  },
  {
    name: "Sneakers",
    url: "/category/sneakers",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&auto=format&fit=crop",
    itemCount: 89,
  },
  {
    name: "Sports",
    url: "/category/sports",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&auto=format&fit=crop",
    itemCount: 134,
  },
  {
    name: "Formal",
    url: "/category/formal",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&auto=format&fit=crop",
    itemCount: 67,
  },
  {
    name: "Sandals",
    url: "/category/sandals",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&auto=format&fit=crop",
    itemCount: 92,
  },
];


const CategoriesGrid = () => {
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

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((category, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -12 }}
                    className="col-span-1"
                >
                  <Link
                      href={category.url}
                      className="block group h-full"
                  >
                    <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                      <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                          priority={idx < 3}
                      />

                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="mb-2">
                      <span className="inline-block bg-white text-gray-900 text-sm font-bold px-4 py-2 rounded-full">
                        {category.itemCount}+ Products
                      </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
                href="/categories"
                className="inline-flex items-center text-lg font-semibold text-gray-700 hover:text-primary transition-colors"
            >
              Browse All Categories
              <svg
                  className="w-6 h-6 ml-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default CategoriesGrid;