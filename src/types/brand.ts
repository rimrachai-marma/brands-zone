export interface Brands {
  id: number;
  name: string;
  location: string;
  mobile: string;
  logo: string;
  image:string
  category: string;
}

export interface BrandGridProps {
  brands: Brands[];
}

export interface BrandFilterProps {
  sortOrder: "asc" | "desc";
  onSortChange: (val: "asc" | "desc") => void;
  selectedCategory: string | null;
  onCategoryChange: (val: string | null) => void;
}

export interface BrandSearchProps {
  value: string;
  onChange: (val: string) => void;
}
