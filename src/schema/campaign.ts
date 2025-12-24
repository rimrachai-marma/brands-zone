import { z } from 'zod';

export const campaignFormSchema = z.object({
    name: z.string().min(1),
    discount_percentage: z.coerce
        .number()
        .min(0)
        .max(100),

    starts_at: z.string(),
    ends_at: z.string(),

    is_active: z.boolean().default(true),

    description: z.string().optional(),
    banner_image: z.any().optional(),
    badge_text: z.string().optional(),
});


export type CampaignFormData = z.input<typeof campaignFormSchema>;

export const campaignFilterSchema = z.object({
    keyword: z.string().optional(),
    is_active: z.boolean().optional(),
    ongoing: z.boolean().optional(),
    upcoming: z.boolean().optional(),
    sort: z.enum(['starts', 'ends', 'created', 'start', 'end']).default('starts'),
    order: z.enum(['asc', 'desc']).default('desc'),
    page: z.number().min(1).default(1),
    per_page: z.number().min(1).max(100).default(10),
});

export type CampaignFilterInput = z.input<typeof campaignFilterSchema>;
export type CampaignFilterData = z.infer<typeof campaignFilterSchema>;