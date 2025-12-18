"use client";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types";
import { Select } from "@radix-ui/react-select";
import React from "react";

const ProductFilter = () => {
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  return (
    <div className="flex flex-wrap gap-6 items-center justify-between">
      <div>
        <p>Total stores showing: {20}</p>
      </div>
      <div className="flex items-center gap-12">
        {/* Sort Dropdown */}

        <div className="flex items-center gap-4 space-y-1">
          <Label htmlFor="sort">Sort: </Label>
          <Select
            value={sortOrder}
            onValueChange={(val) => setSortOrder(val as "asc" | "desc")}
          >
            <SelectTrigger className="w-40">
              <SelectValue
                placeholder={sortOrder === "asc" ? "A - Z" : "Z - A"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A - Z</SelectItem>
              <SelectItem value="desc">Z - A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
