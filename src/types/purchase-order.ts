import { Product, ProductVariant } from "./products";
import { Supplier } from "./supplier";

export interface PurchaseOrder {
  id: string;
  po_number: string;
  vendor_id: string;
  supplier_id: string;
  order_date: string;
  total_amount: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  supplier: Supplier;
  items: PurchaseOrderItem[];
}

export interface VariantWithProduct extends ProductVariant {
  product?: Product;
}

export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  variant_id: string;
  quantity: number;
  unit_cost: string;
  created_at: string;
  updated_at: string;
  variant: VariantWithProduct;
}
