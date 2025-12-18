import { User } from "./users";

// Base types
export type Currency = "USD" | "EUR" | "GBP" | "BDT";
export type WeightUnit = "kg" | "g" | "lb" | "oz";
export type DimensionUnit = "cm" | "mm" | "in" | "ft";
export type ProductStatus = "draft" | "published" | "archived";
export type AttributeType = "color" | "select";

export interface AttributeOption {
  value: string;
  label: string;
  metadata?: Record<string, string>;
}

// Image interface
export interface ProductImage {
  id: string;
  url: string;
  alt_text: string;
  order: number;
  created_at: string;
  updated_at: string;
  product_id: string;
}

// Brand interface
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  website: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Campaign interface
export interface Campaign {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner_image: string;
  discount_percentage: string;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  badge_text: string;
  badge_color: string;
  created_at: string;
  updated_at: string;
}

// Product attribute interface
export interface ProductAttribute {
  id: string;
  name: string;
  slug: string;
  type: AttributeType;
  options: AttributeOption[];
  product_id: string;
  created_at: string;
  updated_at: string;
}

// Product variant interface
export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  barcode: string;
  attributes: Record<string, string>;
  price: string;
  sale_price: string | null;
  cost_price: string;
  stock_quantity: number;
  weight: string;
  weight_unit: WeightUnit;
  length: string | null;
  width: string | null;
  height: string | null;
  dimension_unit: DimensionUnit;
  created_at: string;
  updated_at: string;
}

// Product review interface (empty in your data but included for completeness)
export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

// Main Product interface
export interface Product {
  id: string;
  user_id: string;
  brand_id: string;
  campaign_id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  currency: Currency;
  low_stock_threshold: number;
  weight: string;
  weight_unit: WeightUnit;
  length: string;
  width: string;
  height: string;
  dimension_unit: DimensionUnit;
  specifications: Record<string, string>;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  canonical_url: string;
  status: ProductStatus;
  featured: boolean;
  published_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  reviews_count: number;
  reviews_avg_rating: number | null;
  images: ProductImage[];
  brand: Brand;
  campaign: Campaign;
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  reviews: ProductReview[];
  user: User;
}

export interface Products {
  products: Omit<Product, "user" | "reviews">[];
}
