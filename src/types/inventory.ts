export interface Inventory {
  id: string;
  variant_id: string;
  supplier_id?: string | null;
  quantity_in_stock: number;
  reserved_quantity: number;
  reorder_level: number;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  total_quantity?: number;
  total_amount?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
}

export interface Campaign {
  id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt_text?: string | null;
}

export interface ProductVariant {
  id: string;
  sku: string;
  barcode?: string | null;
  attributes: Record<string, string>;
  price: number;
  sale_price?: number | null;
  cost_price?: number | null;
  weight?: number | null;
  weight_unit?: string | null;
  inventory: Inventory;

  purchase_stats: Stats;
  sales_stats: Stats;
  return_stats: Stats;
  damage_stats: Stats;
}

export interface InventoryProduct {
  id: string;
  name: string;
  slug: string;
  status: string;
  currency: string;
  low_stock_threshold: number;

  brand?: Brand | null;
  campaign?: Campaign | null;
  images: ProductImage[];
  variants: ProductVariant[];

  purchase_stats: Stats;
  sales_stats: Stats;
  return_stats: Stats;
  damage_stats: Stats;
}
