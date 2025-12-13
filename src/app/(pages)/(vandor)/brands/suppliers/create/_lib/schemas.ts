import * as z from "zod";

export const supplierSchema = z.object({
  company_name: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  contact_person: z.string().min(1, "Contact person is required"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s()+\-\.]+$/, "Invalid phone number format"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters"),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;
