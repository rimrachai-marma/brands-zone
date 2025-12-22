"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

const brandLogos = [
  "/images/brands/brand-2.png",
  "/images/brands/tulsa-logo.png",
  "/images/brands/brand-2.png",
  "/images/brands/tulsa-logo.png",
  "/images/brands/brand-2.png",
  "/images/brands/tulsa-logo.png",
];

const LogoGrid = () => {
  return (
      <section className="py-10">
          <div className="relative">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={1000}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                className="py-4"
            >
              {brandLogos.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}

                    >
                      <div className="bg-white rounded-xl p-8 my-1 flex items-center justify-center shadow hover:shadow-xl transition-all duration-300 border border-gray-100 h-32">
                        <Image
                            src={src}
                            alt={`Brand ${idx + 1}`}
                            width={160}
                            height={60}
                            className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>

                    </motion.div>
                  </SwiperSlide>
              ))}
            </Swiper>
          </div>
      </section>
  );
};

export default LogoGrid;