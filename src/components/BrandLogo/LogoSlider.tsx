"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

const brandLogos = [
  "/images/brands/brand-1.png",
  "/images/brands/brand-2.png",
  "/images/brands/brand-3.png",
  "/images/brands/brand-1.png",
  "/images/brands/brand-2.png",
  "/images/brands/brand-3.png",
  "/images/brands/brand-1.png",
  "/images/brands/brand-2.png",
  "/images/brands/brand-3.png",
  "/images/brands/brand-1.png",
  "/images/brands/brand-2.png",
  "/images/brands/brand-3.png",
];

const LogoSlider = () => {
  return (
    <motion.div
      className="w-full h-50 col-span-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {brandLogos.map((src, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              className="relative w-full h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1, // stagger effect for slides
              }}
            >
              <Image
                src={src}
                alt={`Brand ${idx + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default LogoSlider;
