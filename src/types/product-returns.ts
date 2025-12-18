import { ProductVariant } from "./products";
import { PurchaseOrder } from "./purchase-order";
import { Supplier } from "./supplier";

export type ProductReturnReason =
  | "defective"
  | "wrong_item"
  | "excess_stock"
  | "expired"
  | "other";

export interface ProductReturnItem {
  id: string;

  product_return_id: string;
  variant_id: string;

  purchase_order_item_id: string | null;

  quantity: number;
  unit_cost: string;
  reason: string | null;

  created_at: string;
  updated_at: string;

  variant: ProductVariant;
}

export interface ProductReturn {
  id: string;
  return_number: string;

  vendor_id: string;
  purchase_order_id: string | null;
  supplier_id: string;

  return_date: string; // ISO date string
  reason: ProductReturnReason;
  notes: string | null;

  created_at: string;
  updated_at: string;

  items: ProductReturnItem[];

  supplier?: Supplier;
  purchase_order?: PurchaseOrder;
}
