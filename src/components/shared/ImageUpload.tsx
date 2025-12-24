// components/ui/image-upload.tsx
"use client";

import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
    value?: File | string;
    onChange: (file: File | undefined) => void;
    onRemove?: () => void;
    previewUrl?: string;
    error?: string;
    disabled?: boolean;
    label?: string;
    description?: string;
    required?: boolean;
    maxSize?: number; // in MB
    accept?: string;
}

export default function ImageUpload({
                                        value,
                                        onChange,
                                        onRemove,
                                        previewUrl,
                                        error,
                                        disabled = false,
                                        label = "Upload Image",
                                        description = "",
                                        required = false,
                                        maxSize = 5,
                                        accept = "image/*",
                                    }: ImageUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFile = (file: File) => {
        setIsLoading(true);

        // Validate file type
        if (!file.type.startsWith("image/")) {
            onChange(undefined);
            setIsLoading(false);
            toast.error("Please select an image file")
            return ;
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            onChange(undefined);
            setIsLoading(false);
            toast.error(`File size must be less than ${maxSize}MB`)
            return ;
        }

        // Validate specific image types if needed
        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type.toLowerCase())) {
            onChange(undefined);
            setIsLoading(false);
            return "File must be a JPEG, PNG, JPG, WebP, or GIF image";
        }

        onChange(file);
        setIsLoading(false);
        return undefined;
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (disabled) return;

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
        e.target.value = "";
    };

    const handleRemove = () => {
        onChange(undefined);
        if (onRemove) onRemove();
    };

    return (
        <div className="space-y-4">
            {/* Label */}
            {label && (
                <div className="space-y-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </label>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
            )}

            {/* Error Display */}
            {error && (
                <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
            )}

            {/* Upload Area */}
            {(!value && !previewUrl) && (
                <div
                    className={`
            relative border-2 border-dashed rounded-lg p-8 transition-all duration-200
            ${dragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => !disabled && document.getElementById(`file-input-${label}`)?.click()}
                >
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                        {isLoading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        ) : (
                            <Upload className={`h-8 w-8 ${
                                dragActive ? "text-primary" : "text-muted-foreground"
                            }`} />
                        )}
                        <div>
                            <p className="text-sm font-medium text-foreground mb-1">
                                {isLoading ? "Processing..." : description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Supported: JPEG, PNG, JPG, WebP, GIF • Max: {maxSize}MB
                            </p>
                        </div>
                        {!isLoading && !disabled && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    document.getElementById(`file-input-${label}`)?.click();
                                }}
                            >
                                Browse Files
                            </Button>
                        )}
                    </div>
                    <input
                        id={`file-input-${label}`}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={handleFileInput}
                        disabled={disabled}
                    />
                </div>
            )}

            {/* Image Preview */}
            {(value || previewUrl) && (
                <div className="relative group">
                    <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden border">
                        <img
                            src={previewUrl || (value instanceof File ? URL.createObjectURL(value) : value)}
                            alt="Preview"
                            className="h-full w-full object-cover"
                        />
                        {!disabled && (
                            <>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={handleRemove}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <div className="absolute bottom-3 left-3 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click X to remove
                                </div>
                            </>
                        )}
                    </AspectRatio>
                </div>
            )}
        </div>
    );
}