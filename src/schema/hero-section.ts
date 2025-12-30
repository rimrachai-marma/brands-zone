// lib/schemas/hero-section.ts
import { z } from "zod";

export const heroSectionSchema = z.object({
    title: z.any().optional(),
    subtitle: z.any().optional(),
    cta_text: z.any().optional(),
    cta_link: z.any().optional(),
    is_active: z.number(),
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
