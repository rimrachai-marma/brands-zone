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

