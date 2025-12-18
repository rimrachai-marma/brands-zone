"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BRANDS_DATA } from "@/constant/brandsData";
import BrandSearch from "@/components/BrandsComp/BrandSearch";
import BrandFilter from "@/components/BrandsComp/BrandFilter";
import BrandGrid from "@/components/BrandsComp/BrandGrid";

const ITEMS_PER_PAGE = 9;

const BrandsComp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter, search, sort brands
  const filteredBrands = useMemo(() => {
    let brands = [...BRANDS_DATA];

    if (searchQuery) {
      brands = brands.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      brands = brands.filter((b) => b.category === selectedCategory);
    }

    brands.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return brands;
  }, [searchQuery, selectedCategory, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="py-16">
    <motion.div
      className="space-y-6 container mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sort & Filter */}
      <BrandFilter
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Search */}
      <BrandSearch value={searchQuery} onChange={setSearchQuery} />

      

      {/* Brands Grid */}
      <BrandGrid brands={paginatedBrands} />

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <Button
            key={idx}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
      </div>
    </motion.div>
    </section>
  );
};

export default BrandsComp;
