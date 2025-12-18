import { PaginationMeta } from ".";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  products_count?: number;
}

export interface BrandStatistics {
  total_products: number;
  active_products: number;
  draft_products: number;
  archived_products: number;
  total_variants: number;
}

export interface Brands {
  brands: Brand[];
  pagination: PaginationMeta;
}
