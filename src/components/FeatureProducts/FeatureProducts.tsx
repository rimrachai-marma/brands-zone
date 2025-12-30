"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Props {
  categories: Category[];
}

const CategoriesCarousel: React.FC<Props> = ({ categories }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (isHovered) return;

      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [api, isHovered]);

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

        <div className="relative  lg:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {categories.map((category, idx) => (
                <CarouselItem
                  key={category.slug}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -12 }}
                    className="h-full"
                  >
                    <Link
                      href={category.slug ?? ""}
                      className="block group h-full"
                    >
                      <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                        <Image
                          src={category.image_url ?? ""}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          priority={idx < 4}
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
