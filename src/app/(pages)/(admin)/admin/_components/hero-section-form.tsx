// components/hero-section/hero-section-form.tsx
"use client";

import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";
import {HeroSectionFullData, heroSectionFullSchema} from "@/schema/hero-section";
import {HeroSection} from "@/types/hero-section";
import {createHeroSection, updateHeroSection} from "@/lib/actions/hero-section";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import ImageUpload from "@/components/shared/ImageUpload";

interface HeroSectionFormProps {
    initialData?: HeroSection;
}

export default function HeroSectionForm({initialData}: HeroSectionFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [apiErrors, setApiErrors] = useState<{ [key: string]: string[] }>({});
    const [existingImages, setExistingImages] = useState<{ [key: string]: string }>({});

    // Load initial data if editing
    useEffect(() => {
        if (initialData) {
            const images: { [key: string]: string } = {};
            if (initialData.full_image_1) images.image_1 = initialData.full_image_1;
            if (initialData.full_image_2) images.image_2 = initialData.full_image_2;
            if (initialData.full_image_3) images.image_3 = initialData.full_image_3;
            setExistingImages(images);
        }
    }, [initialData]);

    const form = useForm<HeroSectionFullData>({
        resolver: zodResolver(heroSectionFullSchema),
        defaultValues: initialData
            ? {
                title: initialData.title || "",
                subtitle: initialData.subtitle || "",
                cta_text: initialData.cta_text || "",
                cta_link: initialData.cta_link || "",
                is_active: initialData.is_active ?? true,
            }
            : {
                title: "",
                subtitle: "",
                cta_text: "",
                cta_link: "",
                is_active: true,
            },
    });

    const clearApiErrors = () => {
        setApiErrors({});
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

    const handleImageChange = (fieldName: string, file?: File) => {
        clearApiErrors();
        form.setValue(fieldName as any, file);

        // Update existingImages state to reflect changes
        setExistingImages(prev => {
            const updated = {...prev};

            if (!file) {
                // If file is removed, remove from existingImages
                delete updated[fieldName];
            } else {
                // If new file is uploaded, create object URL for preview
                const previewUrl = URL.createObjectURL(file);
                updated[fieldName] = previewUrl;
            }

            return updated;
        });

        // If we're removing an image that previously existed from initialData, mark it for removal
        const hadInitialImage = initialData?.[`full_image_${fieldName.split('_')[1]}` as keyof HeroSection];
        if (!file && hadInitialImage) {
            form.setValue(`remove_${fieldName}` as any, true);
        } else if (file) {
            // Clear removal flag if uploading new image
            form.setValue(`remove_${fieldName}` as any, false);
        }
    };

    const getImagePreviewUrl = (fieldName: string, currentValue: any): string | undefined => {
        // If there's a current file value (from form), create preview URL
        if (currentValue instanceof File) {
            return URL.createObjectURL(currentValue);
        }

        // Otherwise, use the existing image URL from initial data
        return existingImages[fieldName];
    };

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            Object.values(existingImages).forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [existingImages]);
    console.log(form.formState.errors)
    const onSubmit = async (data: HeroSectionFullData) => {
        setIsSubmitting(true);
        clearApiErrors();
        const toastId = toast.loading(initialData ? "Updating hero section..." : "Creating hero section...");
        console.log(data)
        try {
            const formData = new FormData();

            // Append all form fields
            Object.entries(data).forEach(([key, value]) => {
                if (value === undefined || value === null) return;

                if (key.startsWith("image_")) {
                    // Handle image files
                    if (value instanceof File) {
                        formData.append(key, value);
                    }
                } else if (key.startsWith("remove_")) {
                    // Handle image removal flags
                    if (value === true) {
                        formData.append(key, "1");
                    }
                } else if (key === "is_active") {
                    // Handle boolean fields
                    formData.append(key, value ? "1" : "0");
                } else {
                    // Handle text fields
                    formData.append(key, value.toString());
                }
            });

            let result;
            if (initialData) {
                result = await updateHeroSection(initialData.id, formData);
            } else {
                result = await createHeroSection(formData);
            }

            if (result.success) {
                toast.success(
                    initialData
                        ? "Hero section updated successfully!"
                        : "Hero section created successfully!",
                    {id: toastId}
                );
                router.push("/admin/hero");
                router.refresh();
            } else {
                // Handle API validation errors
                if (result.data?.errors) {
                    setApiErrors(result.data.errors);
                    toast.error(result.message || "Please fix the validation errors", {id: toastId});
                } else {
                    toast.error(result.message || "Operation failed", {id: toastId});
                }
            }
        } catch (error: any) {
            toast.error(
                error.message || "An error occurred. Please try again.",
                {id: toastId}
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text Fields */}
                    <div className="space-y-6 bg-white p-5 rounded-lg border shadow-sm">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Title *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter title"
                                            {...field}
                                            disabled={isSubmitting}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                clearApiErrors();
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subtitle"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Subtitle
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter subtitle"
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                            disabled={isSubmitting}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                clearApiErrors();
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="cta_text"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            CTA Text
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Learn More"
                                                {...field}
                                                disabled={isSubmitting}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    clearApiErrors();
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cta_link"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">
                                            CTA Link
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="/path"
                                                {...field}
                                                disabled={isSubmitting}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    clearApiErrors();
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base font-medium">
                                            Active Status
                                        </FormLabel>
                                        <FormDescription>
                                            Whether this hero section is visible on the website
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Image Fields */}
                    <div className="space-y-6">
                        {[1, 2, 3].map((num) => {
                            const fieldName = `image_${num}`;
                            const fieldValue = form.watch(fieldName as any);
                            const apiError = getFieldError(fieldName);

                            // Get the appropriate preview URL
                            const previewUrl = getImagePreviewUrl(fieldName, fieldValue);

                            return (
                                <Card key={num} className="overflow-hidden">
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name={fieldName as any}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <ImageUpload
                                                            value={field.value}
                                                            onChange={(file) => handleImageChange(fieldName, file)}
                                                            previewUrl={previewUrl}
                                                            error={apiError}
                                                            disabled={isSubmitting}
                                                            label={`Image ${num}`}
                                                            description="Drag & drop or click to upload"
                                                            required={false}
                                                            maxSize={5}
                                                            accept="image/jpeg,image/png,image/jpg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Display all API errors at the bottom */}
                {Object.keys(apiErrors).length > 0 && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <h3 className="text-destructive font-medium mb-2">
                            Please fix the following errors:
                        </h3>
                        <ul className="space-y-1 text-sm">
                            {Object.entries(apiErrors).map(([field, errors]) => (
                                errors.map((error, index) => (
                                    <li key={`${field}-${index}`} className="text-destructive">
                                        <span className="font-medium">
                                            {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                        </span> {error}
                                    </li>
                                ))
                            ))}
                        </ul>
                    </div>
                )}

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/hero")}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-w-[140px]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                {initialData ? "Updating..." : "Creating..."}
                            </>
                        ) : (
                            initialData ? "Update Hero Section" : "Create Hero Section"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}