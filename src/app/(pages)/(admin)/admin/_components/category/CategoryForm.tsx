// components/category/CategoryForm.tsx
'use client';

import { useState } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {CategoryFilterInput, CategoryFormData, categoryFormSchema} from '@/schema/category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types/category';
import { createCategory, updateCategory } from '@/lib/actions/categories';

interface CategoryFormProps {
    category?: Category;
    parentCategories: Category[];
    onSuccess?: () => void;
}

export function CategoryForm({ category, parentCategories, onSuccess }: CategoryFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: category?.name || '',
            slug: category?.slug || '',
            description: category?.description || '',
            image: category?.image || '',
            parent_id: category?.parent_id
                ? category.parent_id.toString()
                : undefined,
        },
    });

    const onSubmit: SubmitHandler<CategoryFilterInput> = async (data) => {
        setIsLoading(true);
        setError(null);

        try {
            if (category) {
                await updateCategory(category.slug, data);
            } else {
                await createCategory(data);
            }

            form.reset();
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Category name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder="category-slug" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="parent_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Parent Category</FormLabel>

                            <Select
                                value={field.value?.toString() ?? undefined}
                                onValueChange={(value) => {
                                    field.onChange(value ? Number(value) : undefined);
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select parent category" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {/* 👇 empty string REMOVED */}
                                    <SelectItem value="root">None (Root Category)</SelectItem>

                                    {parentCategories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Category description"
                                    className="resize-none"
                                    {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
                </Button>
            </form>
        </Form>
    );
}