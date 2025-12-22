// schemas/category.ts
import { z } from 'zod';

export const categoryFormSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    slug: z.string().min(1, 'Slug is required').max(255),
    description: z.string().optional(),
    image: z.string().optional(),
    parent_id: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export const categoryFilterSchema = z.object({
    keyword: z.string().optional(),
    root_only: z.boolean().optional(),
    with_children: z.boolean().optional(),
    with_parent: z.boolean().optional(),
    with_products_count: z.boolean().optional(),
    sort: z.enum(['name', 'created_at', 'updated_at']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    page: z.number().min(1).default(1),
    per_page: z.number().min(1).max(100).default(12),
});

export type CategoryFilterInput = z.input<typeof categoryFilterSchema>;
export type CategoryFilterOutput = z.output<typeof categoryFilterSchema>;
export type CategoryFilterData = z.infer<typeof categoryFilterSchema>;