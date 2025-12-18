"use client";

import React, { useCallback, useState, useRef } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Upload,
  Loader2,
  AlertCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProductFormData } from "@/schema/products/create";

interface Props {
  form: UseFormReturn<ProductFormData>;
  uploadEndpoint: string;
  token?: string;
}

interface UploadedImage {
  url: string;
  alt_text: string;
  publicId?: string;
}

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  xhr?: XMLHttpRequest;
}

export function ProductImagesSection({
  form,
  uploadEndpoint,
  token = "",
}: Props) {
  const [dragActive, setDragActive] = useState<number | null>(null);
  const [uploadStates, setUploadStates] = useState<Record<number, UploadState>>(
    {}
  );

  const {
    fields: imageFields,
    append: appendImage,
    update: updateImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const abortControllersRef = useRef<Record<number, XMLHttpRequest>>({});

  const updateUploadState = useCallback(
    (index: number, state: Partial<UploadState>) => {
      setUploadStates((prev) => ({
        ...prev,
        [index]: { ...prev[index], ...state } as UploadState,
      }));
    },
    []
  );

  const uploadImage = useCallback(
    (file: File, index: number): Promise<UploadedImage> => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        abortControllersRef.current[index] = xhr;
        const formData = new FormData();
        formData.append("image", file);

        // Upload progress
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            updateUploadState(index, { progress: percentComplete });
          }
        });

        // Upload complete
        xhr.addEventListener("load", () => {
          delete abortControllersRef.current[index];

          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              const image = response.data;

              if (!image) {
                reject(new Error("No image in response"));
                return;
              }

              resolve({
                url: image.url,
                alt_text: image.filename,
                publicId: image.id,
              });
            } catch (error) {
              console.log("Error parsing JSON response:", error);

              reject(new Error("Invalid JSON response from server"));
            }
          } else {
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              console.log(errorResponse);

              reject(new Error(errorResponse.message));
            } catch (error) {
              console.log("Error parsing JSON error response:", error);
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        });

        // Network error
        xhr.addEventListener("error", () => {
          delete abortControllersRef.current[index];
          reject(
            new Error("Network error occurred. Please check your connection.")
          );
        });

        // Upload aborted
        xhr.addEventListener("abort", () => {
          delete abortControllersRef.current[index];
          reject(new Error("Upload cancelled"));
        });

        // Timeout
        xhr.addEventListener("timeout", () => {
          delete abortControllersRef.current[index];
          reject(new Error("Upload timeout. Please try again."));
        });

        // Configure request
        xhr.open("POST", uploadEndpoint);
        xhr.timeout = 60000 * 2; // 2 minutes timeout
        if (token) {
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        }
        xhr.send(formData);
      });
    },
    [uploadEndpoint, updateUploadState, token]
  );

  const cancelUpload = (index: number) => {
    const xhr = abortControllersRef.current[index];
    if (xhr) {
      xhr.abort();
      delete abortControllersRef.current[index];
    }

    setUploadStates((prev) => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  const handleFile = useCallback(
    async (file: File, index: number) => {
      // Initialize upload state
      updateUploadState(index, {
        uploading: true,
        progress: 0,
        error: null,
      });

      try {
        // Upload file with progress tracking
        const image = await uploadImage(file, index);

        // Update form with uploaded image URL
        const currentImage = imageFields[index];
        updateImage(index, {
          ...currentImage,
          url: image.url,
          alt_text: image.alt_text,
          publicId: image.publicId,
        });

        // Set final state
        updateUploadState(index, {
          uploading: false,
          progress: 100,
          error: null,
        });

        // Clear progress after delay
        setTimeout(() => {
          setUploadStates((prev) => {
            const newState = { ...prev };
            delete newState[index];
            return newState;
          });
        }, 2000);
      } catch (error) {
        // Only show error if it wasn't cancelled
        if (error instanceof Error && error.message !== "Upload cancelled") {
          updateUploadState(index, {
            uploading: false,
            progress: 0,
            error: error.message,
          });
        }
      }
    },
    [imageFields, updateImage, uploadImage, updateUploadState]
  );

  const handleDrag = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(index);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(null);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0], index);
      }
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0], index);
      }
      e.target.value = "";
    },
    [handleFile]
  );

  const clearError = (index: number) => {
    setUploadStates((prev) => {
      const newState = { ...prev };
      if (newState[index]) {
        newState[index] = { ...newState[index], error: null };
      }
      return newState;
    });
  };

  const handleRemove = (index: number) => {
    const currentImages = form.getValues("images");

    const updatedImages = currentImages
      .filter((_, idx) => idx !== index)
      .map((img, idx) => ({
        ...img,
        order: idx,
      }));

    form.setValue("images", updatedImages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Add images for your product. Upload files or enter URLs. Maximum file
          size: 2MB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {imageFields.map((field, index) => {
            const uploadState = uploadStates[index];

            return (
              <div key={field.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-medium">Image - {index + 1}</span>

                  {imageFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (uploadState?.uploading) {
                          cancelUpload(index);
                        }
                        handleRemove(index);
                      }}
                      disabled={uploadState?.uploading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Error Alert */}
                {uploadState?.error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex justify-between">
                      <span>{uploadState.error}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearError(index)}
                        className="cursor-pointer"
                      >
                        Dismiss
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Drag and Drop Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors ${
                    uploadState?.uploading
                      ? "border-primary bg-primary/5"
                      : dragActive === index
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={(e) =>
                    !uploadState?.uploading && handleDrag(e, index)
                  }
                  onDragLeave={(e) =>
                    !uploadState?.uploading && handleDrag(e, index)
                  }
                  onDragOver={(e) =>
                    !uploadState?.uploading && handleDrag(e, index)
                  }
                  onDrop={(e) =>
                    !uploadState?.uploading && handleDrop(e, index)
                  }
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    {uploadState?.uploading && (
                      <>
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        <p className="text-sm text-gray-600 font-medium">
                          Uploading...
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => cancelUpload(index)}
                          className="mt-2 cursor-pointer"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Upload
                        </Button>
                      </>
                    )}

                    {!uploadState?.uploading && (
                      <>
                        <Upload className="h-8 w-8 text-gray-400" />
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            Drag and drop an image here, or
                          </p>
                          <Button asChild type="button" variant="link">
                            <label
                              htmlFor={`file-upload-${index}`}
                              className="text-sm text-primary cursor-pointer underline hover:text-blue-600 font-medium"
                            >
                              browse to upload
                            </label>
                          </Button>
                          <input
                            id={`file-upload-${index}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileInput(e, index)}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Supported: JPG, PNG, GIF, WebP • Max: 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {uploadState?.uploading && (
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 font-medium">
                        Upload Progress
                      </span>
                      <span className="text-xs text-gray-600 font-medium">
                        {Math.round(uploadState.progress)}%
                      </span>
                    </div>
                    <Progress value={uploadState.progress} className="h-2" />
                  </div>
                )}
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  {form.watch(`images.${index}.url`) &&
                    !uploadState?.uploading && (
                      <div className="w-full h-full flex-1">
                        <AspectRatio>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={form.watch(`images.${index}.url`)}
                            alt={
                              form.watch(`images.${index}.alt_text`) ??
                              "Preview"
                            }
                            className="h-full w-full rounded-lg object-cover border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage Error%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </AspectRatio>
                      </div>
                    )}

                  <div className=" md:flex-5 lg:flex-7 space-y-4">
                    <FormField
                      control={form.control}
                      name={`images.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/image.jpg"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <FormField
                        control={form.control}
                        name={`images.${index}.alt_text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alt Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Image description"
                                {...field}
                                disabled={uploadState?.uploading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`images.${index}.publicId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image Id</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="cloudinary-public-id"
                                {...field}
                                value={field.value ?? ""}
                                disabled={uploadState?.uploading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendImage({
                url: "",
                alt_text: "",
              })
            }
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
