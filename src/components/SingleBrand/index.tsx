"use client";

import BrandDetails from "./BrandDetails";
import BrandProducts from "./BrandProducts";
import {  SingleBrandProps } from "@/types";
import FilterSingleBrand from "./FilterSingleBrand";
import { useMemo, useState } from "react";


const SingleBrand = ({ brand, products }: SingleBrandProps) => {
    const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


  // Filter + sort + search logic
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

 

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(term));
    }

    // Sort by name
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return filtered;
  }, [products,  searchTerm, sortOrder]);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="space-y-8">
          <BrandDetails brand={brand} />
          <FilterSingleBrand searchTerm={searchTerm} sortOrder={sortOrder} setSearchTerm={setSearchTerm} setSortOrder={setSortOrder} />
          <BrandProducts products={filteredProducts} brandName={brand.name} />
        </div>
      </div>
    </section>
  );
};

export default SingleBrand;
