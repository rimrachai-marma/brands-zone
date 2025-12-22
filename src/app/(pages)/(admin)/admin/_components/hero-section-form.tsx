// components/hero-section/hero-section-form.tsx
"use client";

import {useState} from "react";
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
import {Upload, AlertCircle, X} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface HeroSectionFormProps {
    initialData?: HeroSection;
}

export default function HeroSectionForm({initialData}: HeroSectionFormProps) {
    const router = useRouter();
    const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({});
    const [dragActive, setDragActive] = useState<{ [key: string]: boolean }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const form = useForm<HeroSectionFullData>({
        resolver: zodResolver(heroSectionFullSchema),
        defaultValues: initialData
            ? {
                title: initialData.title,
                subtitle: initialData.subtitle || "",
                cta_text: initialData.cta_text || "",
                cta_link: initialData.cta_link || "",
                order: initialData.order,
                is_active: initialData.is_active,
            }
            : {
                title: "",
                subtitle: "",
                cta_text: "",
                cta_link: "",
                order: 0,
                is_active: true,
            },
    });

    const handleFile = (file: File, fieldName: string) => {
        // Validate file
        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({...prev, [fieldName]: "Please select an image file"}));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({...prev, [fieldName]: "File size must be less than 5MB"}));
            return;
        }

        // Clear any existing error
        setErrors((prev) => {
            const newErrors = {...prev};
            delete newErrors[fieldName];
            return newErrors;
        });

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setPreviewImages((prev) => ({...prev, [fieldName]: previewUrl}));

        // Store in form
        form.setValue(fieldName as any, file);
    };

    const handleDrag = (e: React.DragEvent, fieldName: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive((prev) => ({...prev, [fieldName]: true}));
        } else if (e.type === "dragleave") {
            setDragActive((prev) => ({...prev, [fieldName]: false}));
        }
    };

    const handleDrop = (e: React.DragEvent, fieldName: string) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive((prev) => ({...prev, [fieldName]: false}));

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0], fieldName);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0], fieldName);
        }
        e.target.value = "";
    };

    const clearImage = (fieldName: string) => {
        const preview = previewImages[fieldName];
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreviewImages((prev) => {
            const newPreviews = {...prev};
            delete newPreviews[fieldName];
            return newPreviews;
        });
        form.setValue(fieldName as any, undefined);
    };

    const onSubmit = async (data: HeroSectionFullData) => {
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key.startsWith("image_")) {
                    // Handle image files
                    if (value && value instanceof File) {
                        formData.append(key, value);
                    }
                } else if (key.startsWith("is_")) {
                    // Handle remove flags
                    if (value == true) {
                        formData.append(key, '1');
                    }
                } else {
                    // Handle other fields
                    if (value !== undefined && value !== null) {
                        formData.append(key, value.toString());
                    }
                }
            });

let res;
            if (initialData) {
                await updateHeroSection(initialData.id, formData);
            } else {
               res= await createHeroSection(formData);
            }
            console.log(res)
            toast.success(
                initialData
                    ? "Hero section updated successfully"
                    : "Hero section created successfully"
            );
            router.push("/admin/hero");
            router.refresh();

        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Form {...form}>
            <div onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text Fields */}
                    <div className="space-y-6 bg-white p-5 shadow-md">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title" {...field} />
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
                                    <FormLabel>Subtitle</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter subtitle"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="cta_text"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>CTA Text</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Learn More" {...field} />
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
                                        <FormLabel>CTA Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="/path" {...field} />
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
                                        <FormLabel className="text-base">Active</FormLabel>
                                        <FormDescription>
                                            Whether this hero section is visible
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
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
                            const imageUrl = initialData?.[`full_image_${num}` as keyof HeroSection];
                            const preview = previewImages[fieldName] || (imageUrl as string);
                            const error = errors[fieldName];
                            const isDragActive = dragActive[fieldName];

                            return (
                                <Card key={num}>
                                    <CardHeader>
                                        <CardTitle>Image {num}</CardTitle>
                                        <CardDescription>
                                            Upload an image for position {num}. Maximum file size: 5MB.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Error Alert */}
                                            {error && (
                                                <Alert variant="destructive">
                                                    <AlertCircle className="h-4 w-4"/>
                                                    <AlertDescription>{error}</AlertDescription>
                                                </Alert>
                                            )}

                                            {/* Upload Area - Show when no image */}
                                            {!preview && (
                                                <div
                                                    className={`border-2 border-dashed rounded-lg p-8 py-5 transition-colors ${
                                                        isDragActive
                                                            ? "border-primary bg-primary/10"
                                                            : "border-gray-300 hover:border-gray-400"
                                                    }`}
                                                    onDragEnter={(e) => handleDrag(e, fieldName)}
                                                    onDragLeave={(e) => handleDrag(e, fieldName)}
                                                    onDragOver={(e) => handleDrag(e, fieldName)}
                                                    onDrop={(e) => handleDrop(e, fieldName)}
                                                >
                                                    <div className="flex flex-col items-center justify-center gap-3">
                                                        <Upload className="h-5 w-5 text-gray-400"/>
                                                        <div className="text-center">
                                                            <p className="text-sm text-gray-600 mb-1">
                                                                Drag and drop an image here, or
                                                            </p>
                                                            <label
                                                                htmlFor={`file-upload-${num}`}
                                                                className="text-sm text-primary cursor-pointer underline hover:text-primary/80 font-medium"
                                                            >
                                                                browse to upload
                                                            </label>
                                                            <input
                                                                id={`file-upload-${num}`}
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleFileInput(e, fieldName)}
                                                            />
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Supported: JPG, PNG, GIF, WebP • Max: 5MB
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Image Preview */}
                                            {preview && (
                                                <div className="relative">
                                                    <AspectRatio ratio={16 / 9}>
                                                        <img
                                                            src={preview}
                                                            alt={`Image ${num} preview`}
                                                            className="h-full w-full rounded-lg object-cover border border-gray-200"
                                                        />
                                                    </AspectRatio>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => clearImage(fieldName)}
                                                    >
                                                        <X className="h-2 w-2"/>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                        {initialData ? "Update" : "Create"} Hero Section
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/hero-sections")}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Form>
    );
}