import * as z from "zod";

export const lossDamageSchema = z.object({
  damage_date: z.string().min(1, "Damage date is required"),
  damage_type: z.enum(
    ["physical", "water", "fire", "expired", "manufacturing_defect", "other"],
    "Damage type is required"
  ),
  description: z.string().min(1, "Description is required"),
  items: z
    .array(
      z.object({
        product_id: z.string().min(1, "Product is required"),
        variant_id: z.string().min(1, "Variant is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unit_cost: z.number().min(0.01, "Unit cost must be greater than 0"),
        condition_notes: z.string().optional(),
        total: z.number(),
        current_stock: z.number(),
      })
    )
    .min(1, "At least one item is required")
    .superRefine((items, ctx) => {
      items.forEach((item, index) => {
        if (
          item.current_stock !== undefined &&
          item.quantity > item.current_stock
        ) {
          ctx.addIssue({
            code: "custom",
            message: `Quantity (${item.quantity}) exceeds available stock (${item.current_stock})`,
            path: [index, "quantity"],
          });
        }
      });
    }),
});

export type LossDamageFormData = z.infer<typeof lossDamageSchema>;
