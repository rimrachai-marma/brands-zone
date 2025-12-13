/* eslint-disable @next/next/no-img-element */
"use client";

import { Camera, Upload, X, Loader2, AlertCircle } from "lucide-react";
import React, { useActionState, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { updateCover } from "@/lib/actions/vendor";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useRouter } from "next/navigation";

interface BannerUploadProps {
  currentBanner?: string | null;
  uploadEndpoint: string;
}

interface UploadedImage {
  url: string;
  id?: string;
}

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
}

export default function BannerUpload({
  currentBanner,
  uploadEndpoint,
}: BannerUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const router = useRouter();

  const [state, formAction, isPending] = useActionState(updateCover, null);

  console.log(state);

  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageId, setUploadedImageId] = useState<string | undefined>(
    undefined
  );
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = (file: File): Promise<UploadedImage> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

      const formData = new FormData();
      formData.append("image", file);

      // Upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadState((prev) => ({ ...prev, progress: percentComplete }));
        }
      });

      // Upload complete
      xhr.addEventListener("load", () => {
        xhrRef.current = null;

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
              id: image.id,
            });
          } catch (error) {
            console.log(error);
            reject(new Error("Invalid JSON response from server"));
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(
              new Error(
                errorResponse.message ||
                  `Upload failed with status ${xhr.status}`
              )
            );
          } catch (error) {
            console.log(error);

            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      });

      // Network error
      xhr.addEventListener("error", () => {
        xhrRef.current = null;
        reject(
          new Error("Network error occurred. Please check your connection.")
        );
      });

      // Upload aborted
      xhr.addEventListener("abort", () => {
        xhrRef.current = null;
        reject(new Error("Upload cancelled"));
      });

      // Timeout
      xhr.addEventListener("timeout", () => {
        xhrRef.current = null;
        reject(new Error("Upload timeout. Please try again."));
      });

      // Configure request
      xhr.open("POST", uploadEndpoint);
      xhr.timeout = 60000 * 2; // 2 minutes timeout

      // Send request
      xhr.send(formData);
    });
  };

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }

    setUploadState({
      uploading: false,
      progress: 0,
      error: null,
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Initialize upload state
    setUploadState({
      uploading: true,
      progress: 0,
      error: null,
    });

    try {
      // Upload file with progress tracking
      const image = await uploadImage(file);

      // Create preview URL
      setPreviewUrl(image.url);
      setUploadedImageId(image.id);

      // Set final state
      setUploadState({
        uploading: false,
        progress: 100,
        error: null,
      });

      // Clear progress after delay
      setTimeout(() => {
        setUploadState({
          uploading: false,
          progress: 0,
          error: null,
        });
      }, 2000);
    } catch (error) {
      // Only show error if it wasn't cancelled
      if (error instanceof Error && error.message !== "Upload cancelled") {
        setUploadState({
          uploading: false,
          progress: 0,
          error: error.message,
        });
      }
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      React.startTransition(() => {
        formAction({ banner: previewUrl });
      });
    }
  };

  React.useEffect(() => {
    if (state?.status === "success") {
      router.push("/brands/profile");
      setPreviewUrl(null);
      setIsOpen(false);
    }
  }, [state, router]);

  const handleClose = () => {
    // If there's an uploaded image that wasn't saved, delete it
    if (uploadedImageId && previewUrl) {
      deleteImage(uploadedImageId);
    }

    setPreviewUrl(null);
    setUploadedImageId(undefined);
    setUploadState({
      uploading: false,
      progress: 0,
      error: null,
    });
    setIsOpen(false);
  };

  const deleteImage = async (imageId: string) => {
    try {
      // Replace with your actual delete endpoint
      console.log(`Deleting image: ${imageId}`);
      // await fetch(`/api/upload/${imageId}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const clearError = () => {
    setUploadState((prev) => ({ ...prev, error: null }));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        } else {
          setIsOpen(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all opacity-0 group-hover/cover:opacity-100"
          aria-label="Change banner image"
        >
          <Camera className="w-4 h-4" />
          <span className="text-sm font-medium">Change Banner</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Change Banner Image</DialogTitle>
          <DialogDescription>
            Upload a new banner image for your profile. Maximum file size: 5MB.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Error Alert */}
          {uploadState.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex justify-between items-center">
                <span>{uploadState.error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="h-auto p-1"
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Progress Bar */}
          {uploadState.uploading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-medium">
                  Upload Progress
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  {Math.round(uploadState.progress)}%
                </span>
              </div>
              <Progress value={uploadState.progress} className="h-2" />
            </div>
          )}

          {/* Preview Area with Upload Button */}
          <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
            {previewUrl || currentBanner ? (
              <>
                <img
                  src={previewUrl || currentBanner || ""}
                  alt="Banner preview"
                  className="w-full h-48 object-cover"
                />
                {previewUrl && !uploadState.uploading && (
                  <button
                    onClick={() => {
                      if (uploadedImageId) {
                        deleteImage(uploadedImageId);
                      }
                      setPreviewUrl(null);
                      setUploadedImageId(undefined);
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <Button
                  onClick={
                    uploadState.uploading ? cancelUpload : handleButtonClick
                  }
                  disabled={uploadState.uploading}
                  size="sm"
                  variant={uploadState.uploading ? "destructive" : "default"}
                  className="absolute bottom-3 right-3 gap-2 shadow-lg"
                >
                  {uploadState.uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Cancel</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">
                        {previewUrl ? "Change" : "Upload"}
                      </span>
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="h-48 flex items-center justify-center bg-gray-50">
                <Button
                  onClick={handleButtonClick}
                  disabled={uploadState.uploading}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">
                    {uploadState.uploading ? "Uploading..." : "Upload Image"}
                  </span>
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center">
            Supported: JPG, PNG, GIF, WebP • Max: 5MB
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={uploadState.uploading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={!previewUrl || uploadState.uploading || isPending}
          >
            <LoadingSwap isLoading={isPending}>Save Changes</LoadingSwap>
          </Button>
        </DialogFooter>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload banner image"
        />
      </DialogContent>
    </Dialog>
  );
}
