"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import React from "react";
import { FeaturedBrand } from "@/lib/actions/user/brands";
import Link from "next/link";

interface Props {
  beands: FeaturedBrand[];
}

const LogoGrid: React.FC<Props> = ({ beands }) => {
  // Calculate slidesPerView based on number of logos
  const getSlidesPerView = (logosCount: number) => {

    if (logosCount <= 2) return 2; // For 2 logos, show both side by side
    return {
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
      1424: {
        slidesPerView: 7,
        spaceBetween: 30,
      },
    };
  };

  // Center slides when there are only 2 logos
  const shouldCenterSlides = beands.length <= 2;
  return (
    <section className="bg-gray-50">
      <div className="mx-auto ">
        <div className="relative">
          {shouldCenterSlides ? (
            // Center logos manually when there are only 2
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {beands.map((brand, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-center"
                  >
                    <Link href={`/brands-list/${brand.id}`} className="bg-white rounded-xl my-8 p-8 flex items-center justify-center shadow hover:shadow-xl transition-all duration-300 border border-gray-100 h-32 w-full">
                      <Image
                        src={brand.logo || "https://placehold.co/600x300"}
                        alt={`Brand ${idx + 1}`}
                        width={160}
                        height={60}
                        className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            // Use Swiper for more than 2 logos
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
              breakpoints={getSlidesPerView(brandLogos.length)}
              className="py-4"
            >
              {brandLogos.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex justify-center items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full"
                    >
                      <div className="bg-white my-8 rounded-xl p-8 flex items-center justify-center shadow hover:shadow-xl transition-all duration-300 border border-gray-100 h-32 mx-2">
                        <Image
                          src={src}
                          alt={`Brand ${idx + 1}`}
                          width={160}
                          height={60}
                          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </motion.div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default LogoGrid;
