import { z } from "zod";

export const testimonialFormSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),

    rating: z.number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),

    designation: z.string()
        .max(100, "Designation must be at most 100 characters")
        .optional()
        .or(z.literal("")),

    message: z.string()
        .min(10, "Message must be at least 10 characters")
        .max(500, "Message must be at most 500 characters"),

    avatar: z.instanceof(File)
        .refine(f => f.size <= 2 * 1024 * 1024, "File size must be less than 2MB")
        .refine(f => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
            "File must be an image (JPEG, PNG, or WebP)")
        .optional()
        .or(z.string())
        .or(z.literal("")),

    is_active: z.boolean().optional().default(true),
});

export type TestimonialFormValues =
    z.input<typeof testimonialFormSchema>;
