import * as z from "zod";

export const vendorSchema = z.object({
  // Shop Information
  shop_name: z.string().min(3, "Shop name must be at least 3 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .optional(),

  // Contact Information
  business_email: z.email("Invalid email address"),
  business_phone: z.string().min(1, "Phone number required"),
  business_address: z
    .string()
    .min(10, "Address must be at least 10 characters"),

  // Legal Information
  business_registration_number: z
    .string()
    .min(1, "Registration number required"),
  tax_id: z.string().min(5, "Tax ID required"),
  business_type: z.enum(
    ["sole_proprietorship", "partnership", "corporation", "llc"],
    "Business type required "
  ),
  years_in_business: z.number().min(0).max(100),
  website_url: z.url("Invalid URL").optional().or(z.literal("")),

  // Bank Information
  bank_name: z.string().min(3, "Bank name required"),
  bank_account_name: z.string().min(1, "Account name required"),
  bank_account_number: z.string().min(1, "Account number required"),
  bank_routing_number: z.string().optional(),
  bank_swift_code: z.string().optional(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
