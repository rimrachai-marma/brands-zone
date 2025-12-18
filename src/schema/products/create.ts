import * as z from "zod";

export const productSchema = z.object({
  // Basic Information
  name: z
    .string()
    .min(1, "Product name is required")
    .max(200, "Product name cannot exceed 200 characters"),
  description: z
    .string()
    .min(1, "Product description is required")
    .max(2000, "Description cannot exceed 2000 characters"),
  short_description: z
    .string()
    .max(500, "Short description cannot exceed 500 characters")
    .optional(),
  brand_id: z.string().optional(),

  // Categories
  category_ids: z.array(z.string()).min(1, "At least one category is required"),

  // Pricing & Inventory
  currency: z
    .string()
    .length(3, "Currency code must be exactly 3 characters")
    .optional(),
  low_stock_threshold: z.number().int().min(0).optional(),

  // Specifications
  specifications: z.record(z.string(), z.string()).optional(),

  // Images
  images: z
    .array(
      z.object({
        url: z.string().min(1, "Image URL is required"),
        alt_text: z.string().optional(),
        publicId: z.string().trim().optional(),
      })
    )
    .min(1, "At least one product image is required"),

  // Attributes
  attributes: z
    .array(
      z.object({
        name: z.string().min(1, "Attribute name is required"),
        slug: z.string().min(1, "Attribute slug is required"),
        type: z.enum(["color", "select"]),
        options: z
          .array(
            z.object({
              value: z.string().min(1, "Option value is required"),
              label: z.string().min(1, "Option label is required"),
              metadata: z.record(z.any(), z.any()).optional(),
            })
          )
          .min(1, "At least one option is required"),
      })
    )
    .optional(),
  // Variants
  variants: z
    .array(
      z.object({
        sku: z.string().min(1, "SKU is required"),
        barcode: z.string().optional(),
        attributes: z
          .record(z.string("Required"), z.string("Required"))
          .optional(),
        price: z.number().min(0, "Price must be at least 0"),
        sale_price: z.number().min(0).optional(),
        cost_price: z.number().min(0).optional(),
        weight: z.number().min(0).optional(),
        weight_unit: z.enum(["kg", "g", "lb", "oz"]).optional(),
        length: z.number().min(0).optional(),
        width: z.number().min(0).optional(),
        height: z.number().min(0).optional(),
        dimension_unit: z.enum(["cm", "inch", "m"]).optional(),
      })
    )
    .min(1, "At least one product variant is required")
    .superRefine((variants, ctx) => {
      variants.forEach((variant, index) => {
        if (
          variant.sale_price &&
          variant.price &&
          variant.sale_price >= variant.price
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Sale price must be less than regular price",
            path: [index, "sale_price"],
          });
        }
      });
      // Validate that multi-variant products have attributes
      if (variants.length > 1) {
        variants.forEach((variant, index) => {
          if (
            !variant.attributes ||
            Object.keys(variant.attributes).length === 0
          ) {
            ctx.addIssue({
              code: "custom",
              message:
                "Each variant must have at least one attribute when product has multiple variants",
              path: ["variants", index, "attributes"],
            });
          }
        });
      }
    }),

  // SEO
  meta_title: z
    .string()
    .max(255, "Meta title cannot exceed 255 characters")
    .optional(),
  meta_description: z
    .string()
    .max(500, "Meta description cannot exceed 500 characters")
    .optional(),
  meta_keywords: z.array(z.string()).optional(),
  canonical_url: z
    .url("Must be a valid URL")
    .max(500)
    .optional()
    .or(z.literal("")),

  campaign_id: z.string().optional(),

  // Status
  status: z.enum(["draft", "published", "archived"]),
  published_at: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
