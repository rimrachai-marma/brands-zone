import * as z from "zod";

export const shopInfoSchema = z.object({
  shop_name: z
    .string()
    .min(1, "Shop name is required")
    .max(100, "Shop name must be less than 100 characters"),

  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  business_email: z
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  business_phone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .optional(),
  business_address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional(),
  website_url: z.url("Enter a valid URL").optional().or(z.literal("")),
});

export type ShopInfoData = z.infer<typeof shopInfoSchema>;

export const passwordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Current password is required." }),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .max(16, { message: "Be at most 16 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),

    password_confirmation: z
      .string()
      .min(1, { message: "Confirm your password." }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["password_confirmation"],
      });
    }
  });

export type PasswordData = z.infer<typeof passwordSchema>;

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;

export const bankingInfoSchema = z.object({
  bank_name: z.string().min(1, "Bank name is required"),
  bank_account_name: z.string().min(1, "Account name is required"),
  bank_account_number: z.string().min(1, "Account number is required"),
  bank_routing_number: z.string().optional().or(z.literal("")),
  bank_swift_code: z.string().optional().or(z.literal("")),
});

export type BankingInfoData = z.infer<typeof bankingInfoSchema>;

export const businessInfoSchema = z.object({
  business_type: z.string().min(1, "Business type is required"),
  years_in_business: z
    .number()
    .min(0, "Years in business must be a positive number"),
  business_registration_number: z.string().optional().or(z.literal("")),
  tax_id: z.string().optional().or(z.literal("")),
});

export type BusinessInfoData = z.infer<typeof businessInfoSchema>;
