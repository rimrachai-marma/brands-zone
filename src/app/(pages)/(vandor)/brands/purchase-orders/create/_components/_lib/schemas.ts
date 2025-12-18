import * as z from "zod";

export const purchaseOrderSchema = z.object({
  supplier_id: z.string().min(1, "Supplier is required"),
  order_date: z.string().min(1, "Order date is required"),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        product_id: z.string().min(1, "Product is required"),
        variant_id: z.string().min(1, "Variant is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unit_cost: z.number().min(0.01, "Unit cost must be greater than 0"),
        total: z.number(),
      })
    )
    .min(1, "At least one item is required"),
});

export type PurchaseOrderFormData = z.infer<typeof purchaseOrderSchema>;
