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
