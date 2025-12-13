import { ProductVariant } from "./products";
import { Vendor } from "./vendor";

export interface ProductDamageItem {
  id: string;
  product_damage_id: string;
  variant_id: string;

  quantity: number;
  unit_cost: string;
  condition_notes?: string | null;

  created_at: string;
  updated_at: string;

  variant: ProductVariant;
}

export interface ProductDamage {
  id: string;
  damage_number: string;

  vendor_id: string;
  damage_date: string; // YYYY-MM-DD
  damage_type:
    | "physical"
    | "water"
    | "fire"
    | "expired"
    | "manufacturing_defect"
    | "other";

  description?: string | null;

  created_at: string;
  updated_at: string;

  vendor: Vendor;
  items: ProductDamageItem[];
}
