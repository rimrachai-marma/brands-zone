"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Brands } from "@/types";

interface BrandDetailsProps {
  brand: Brands;
}

const BrandDetails = ({ brand }: BrandDetailsProps) => {
  return (
    <div>
        <div className="mb-12 flex justify-center">
            <Image className="w-full" width={1256} height={942} src={brand.image} alt={brand.name}/>
        </div>
      <motion.div
        className="border p-6 border-primary/20 shadow-sm flex flex-col md:flex-row items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          width={120}
          height={120}
          className="object-contain"
        />
        <div className=" w-full">
          <h2 className="text-3xl font-bold text-shadow-sm capitalize text-shadow-secondary/75 text-white">{brand.name}</h2>
          <hr className="border-primary/20 my-4" />
          <p className="text-gray-500">{brand.location}</p>
          <p className="text-gray-700">{brand.mobile}</p>
          <p className="mt-2 text-sm text-primary font-medium">
            Category: {brand.category}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandDetails;
