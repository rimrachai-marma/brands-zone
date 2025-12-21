"use client";
import { motion } from "framer-motion";

import BrandGrid from "@/components/BrandsComp/BrandGrid";
import { PublicVendor, StatusState, VendorRating, VendorStats } from "@/types";
import React from "react";

interface Props {
  vendors: (PublicVendor & {
    rating: VendorRating;
    stats: Omit<VendorStats, "years_in_business" | "verified_since">;
    status_state: StatusState;
  })[];
}

const BrandsComp: React.FC<Props> = ({ vendors }) => {
  return (
    <section className="py-16">
      <motion.div
        className="space-y-6 container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Sort & Filter */}
        {/* <BrandFilter
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        /> */}

        {/* Search */}
        {/* <BrandSearch value={searchQuery} onChange={setSearchQuery} /> */}

        {/* Brands Grid */}
        <BrandGrid vendors={vendors} />

        {/* Pagination */}
        {/* <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Button
              key={idx}
              variant={currentPage === idx + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}
        </div> */}
      </motion.div>
    </section>
  );
};

export default BrandsComp;
