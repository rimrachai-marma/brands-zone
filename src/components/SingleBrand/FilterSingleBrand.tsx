import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface FilterSingleBrandProps {
  searchTerm: string;
  sortOrder: "asc" | "desc";
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

const FilterSingleBrand = ({
  searchTerm,
  sortOrder,
  setSearchTerm,
  setSortOrder,
}: FilterSingleBrandProps) => {
  return (
    <>
      {/* Search and Filter */}
      <div className="flex gap-4 items-end border-b pb-4">
        {/* Search */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="search"
            className="text-sm font-medium text-gray-600 mb-1"
          >
            Search Products
          </label>
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Sort Order */}
        <div className="flex flex-col">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-600 mb-1"
          >
            Sort
          </label>
          <Select
            value={sortOrder}
            onValueChange={(val: "asc" | "desc") => setSortOrder(val)}
          >
            <SelectTrigger id="sort" className="w-40">
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A - Z</SelectItem>
              <SelectItem value="desc">Z - A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default FilterSingleBrand;
