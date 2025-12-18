import * as z from "zod";

export const productReturnItemSchema = z.object({
  product_id: z.string().min(1, "Product is required"),
  variant_id: z.string().min(1, "Variant is required"),
  purchase_order_item_id: z.string().min(1, "Purchase order item is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit_cost: z.number().min(0.01, "Unit cost must be greater than 0"),
  reason: z.string().optional(),
  total: z.number(),
  max_quantity: z.number().optional(),
});

export const productReturnSchema = z.object({
  supplier_id: z.string().min(1, "Supplier is required"),
  purchase_order_id: z.string().min(1, "Purchase order is required"),
  return_date: z.string().min(1, "Return date is required"),
  reason: z.enum(
    ["defective", "wrong_item", "excess_stock", "expired", "other"],
    "Return reason is required"
  ),
  notes: z.string().optional(),
  items: z
    .array(productReturnItemSchema)
    .min(1, "At least one item is required")
    .superRefine((items, ctx) => {
      items.forEach((item, index) => {
        if (
          item.max_quantity !== undefined &&
          item.quantity > item.max_quantity
        ) {
          ctx.addIssue({
            code: "custom",
            message: `Cannot exceed PO quantity (${item.max_quantity})`,
            path: [index, "quantity"],
          });
        }
      });
    }),
});

export type ProductReturnFormData = z.infer<typeof productReturnSchema>;
