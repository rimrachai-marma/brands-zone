// lib/schemas/hero-section.ts
import { z } from "zod";

export const heroSectionSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    subtitle: z.string().max(500).optional(),
    cta_text: z.string().max(100).optional(),
    cta_link: z.string().max(255).optional(),
    order: z.number().int().min(0),
    is_active: z.boolean(),
});

export const heroSectionFullSchema = heroSectionSchema.extend({
    image_1: z.any().optional(),
    image_2: z.any().optional(),
    image_3: z.any().optional(),
    remove_image_1: z.boolean().optional(),
    remove_image_2: z.boolean().optional(),
    remove_image_3: z.boolean().optional(),
});

export type HeroSectionFullData = z.infer<typeof heroSectionFullSchema>;
