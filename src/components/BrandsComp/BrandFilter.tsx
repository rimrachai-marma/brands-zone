"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BRANDS_DATA } from "@/constant/brandsData";
import { BrandFilterProps } from "@/types";



const categories = ["All", "Electronics", "Fashion", "Food"];

const BrandFilter = ({
  sortOrder,
  onSortChange,
  selectedCategory,
  onCategoryChange,
}: BrandFilterProps) => {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-between">
      <div>
        <p>Total stores showing: {BRANDS_DATA.length}</p>
      </div>
      <div className="flex items-center gap-12">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-4 space-y-1">
          <Label htmlFor="sort">Sort: </Label>
          <Select
            value={sortOrder}
            onValueChange={(val) => onSortChange(val as "asc" | "desc")}
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

        {/* Category Dropdown */}
        <div className="flex items-center gap-4 space-y-1">
          <Label htmlFor="category">Category: </Label>
          <Select
            value={selectedCategory || "All"}
            onValueChange={(val) =>
              onCategoryChange(val === "All" ? null : val)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
