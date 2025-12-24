// components/category/CategoryForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {CategoryFilterData, CategoryFormData, categoryFormSchema} from '@/schema/category';
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
import { createCategory, updateCategory,getCategories } from '@/lib/actions/admin/category';
import ImageUpload from "@/components/shared/ImageUpload";

interface CategoryFormProps {
    category?: Category;
    onSuccess?: () => void;
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [apiErrors, setApiErrors] = useState<{ [key: string]: string[] }>({});
    const [existingImages, setExistingImages] = useState<string|undefined>();
const [parentCategories, setParentCategories] = useState<Category[]>([]);
    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: category?.name || '',
            description: category?.description || '',
            image: undefined,
            parent_id: category?.parent_id
                ? category.parent_id.toString()
                : undefined,
        },
    });

    useEffect(() => {
        if (category?.image_url) {
            setExistingImages(category.image_url);
        }
    }, [category]);
    const fetchCategories = async () => {
        setError(null);

        try {
            const response = await getCategories();
            if (response.status === 'success' && response.data) {
                setParentCategories(response.data)
            }
        } catch (err) {
        }
    };

    useEffect(()=>{
        fetchCategories();
    },[])

    const handleImageChange = (file?: File) => {
        form.setValue('image', file);
        if (file) {
            setExistingImages(URL.createObjectURL(file));
        } else {
            setExistingImages(undefined);
        }
    };

    const getFieldError = (fieldName: string): string | undefined => {
        // First check for API errors
        if (apiErrors[fieldName] && apiErrors[fieldName].length > 0) {
            return apiErrors[fieldName][0];
        }
        // Then check for form validation errors
        const formError = form.formState.errors[fieldName as keyof typeof form.formState.errors];
        return formError?.message?.toString();
    };

    const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        setIsLoading(true);
        setError(null);
        setApiErrors({});

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', data.name);

            if (data.description) {
                formData.append('description', data.description);
            }

            if (data.parent_id && data.parent_id !== 'root' && data.parent_id !== '') {
                formData.append('parent_id', data.parent_id);
            }

            // Only append image if a new file is selected
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }
            console.log(category)
            let res;
            if (category?.id) {
                res = await updateCategory(category.id, formData);
            } else {
                res = await createCategory(formData);
            }
            console.log(res)
            // Check if there are API validation errors
            if (res?.data?.errors) {
                setApiErrors(res.data.errors);

                // Set form errors for better UX
                Object.entries(res.data.errors).forEach(([field, messages]) => {
                    if (Array.isArray(messages) && messages.length > 0) {
                        form.setError(field as keyof CategoryFormData, {
                            type: 'server',
                            message: messages[0]
                        });
                    }
                });
                return;
            }

            // Check for general error message
            if (!res?.status && res?.message) {
                setError(res.message);
                return;
            }

            // Only reset and call onSuccess if successful
            form.reset();
            setExistingImages(undefined);
            onSuccess?.();
        } catch (err) {
            console.log(err)
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

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
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ImageUpload
                                    value={field.value}
                                    onChange={handleImageChange}
                                    previewUrl={existingImages}
                                    error={getFieldError('image')}
                                    label="Category Image"
                                    required={false}
                                    maxSize={2}
                                    accept="image/jpeg,image/png,image/jpg"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    name="parent_id"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Parent Category</FormLabel>
                            <Select
                                value={field.value?.toString() ?? 'root'}
                                onValueChange={(value) => {
                                    field.onChange(value === 'root' ? undefined : value);
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select parent category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
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

                <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
                    </Button>
                    {category && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onSuccess?.()}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}