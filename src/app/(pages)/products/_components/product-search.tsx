"use client";

import { Input } from "@/components/ui/input";
import React from "react";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div>
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 h-15 hover:border-primary active:border-primary focus:border-primary focus-visible:shadow-none"
      />
    </div>
  );
};

export default ProductSearch;
