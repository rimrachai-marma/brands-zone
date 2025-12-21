"use client";

import React, { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProductFormData } from "@/schema/products/create";

interface Props {
    form: UseFormReturn<ProductFormData>;
}

export function ProductImagesSection({ form }: Props) {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string>("");
    const [preview, setPreview] = useState<string>("");

    const handleFile = useCallback((file: File) => {
        // Validate file
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB");
            return;
        }

        // Clear any existing error
        setError("");

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        // Store in form
        form.setValue("image", file);
    }, [form]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
            }
        },
        [handleFile]
    );

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
            }
            e.target.value = "";
        },
        [handleFile]
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>
                    Upload an image for your product. Maximum file size: 5MB.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Upload Area - Show when no image */}
                    {!preview && (
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 py-5 transition-colors ${
                                dragActive
                                    ? "border-primary bg-primary/10"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center gap-3">
                                <Upload className="h-5 w-5 text-gray-400" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-1">
                                        Drag and drop an image here, or
                                    </p>
                                    <label
                                        htmlFor="file-upload"
                                        className="text-sm text-primary cursor-pointer underline hover:text-primary/80 font-medium"
                                    >
                                        browse to upload
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileInput}
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
                        <AspectRatio ratio={16 / 9}>
                            <img
                                src={preview}
                                alt="Product preview"
                                className="h-full w-full rounded-lg object-cover border border-gray-200"
                            />
                        </AspectRatio>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}