import { PaginationMeta } from ".";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  // Relationships
  parent?: Category;
  children?: Category[];
  products?: unknown[];
  products_count?: number;
}

export interface Categories {
  categories: Category[];
  pagination: PaginationMeta;
}

export type CategoryMini = {
    id: string;
    name: string;
    slug?: string;
}