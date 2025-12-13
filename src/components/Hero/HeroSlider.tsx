"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const sliderImages = [
  "/images/banner/banner-1.avif",
  "/images/banner/banner-4.avif",
  "/images/banner/banner-5.avif",
];

const HeroSlider = () => {
  return (
    <motion.div
      className="w-full h-200 col-span-12 lg:col-span-8 relative overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="h-full w-full"
      >
        {sliderImages.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`Hero Slide ${idx + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute "></div>
              <div className="absolute inset-0 bg-black/25 flex flex-col justify-center items-start p-8 lg:p-16">
                <motion.h1
                  className="text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to Our Store
                </motion.h1>
                <motion.p
                  className="text-lg text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Discover the best products at unbeatable prices. Shop now and
                  enjoy exclusive deals!
                </motion.p>
                <Button
                  variant="default"
                  className="bg-primary hover:bg-secondary text-white"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default HeroSlider;
