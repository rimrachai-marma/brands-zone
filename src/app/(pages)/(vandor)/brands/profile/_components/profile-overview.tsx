/* eslint-disable @next/next/no-img-element */
"use client";

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { User } from "@/types";
import { StatusState, Vendor, VendorRating, VendorStats } from "@/types/vendor";
import { formatDate } from "@/utils/formaters";
import { Avatar } from "@radix-ui/react-avatar";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Slash,
  Star,
  Store,
  TrendingUp,
  Upload,
  XCircle,
  Loader2,
  X,
} from "lucide-react";
import React, { useActionState, useRef, useState } from "react";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useRouter } from "next/navigation";
import { clientEnv } from "@/data/env";
import { updateAvatar } from "@/lib/actions/vendor";

type StatusBadge = {
  variant: "default" | "secondary" | "destructive";
  className: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

interface Props {
  user: User;
  vendor: Vendor;
  vendorRating: VendorRating;
  VendorStats: VendorStats;
  statusState: StatusState;
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

const ProfileOverview: React.FC<Props> = ({
  user,
  vendor,
  vendorRating,
  VendorStats,
  statusState,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(updateAvatar, null);

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

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadState((prev) => ({ ...prev, progress: percentComplete }));
        }
      });

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

      xhr.addEventListener("error", () => {
        xhrRef.current = null;
        reject(
          new Error("Network error occurred. Please check your connection.")
        );
      });

      xhr.addEventListener("abort", () => {
        xhrRef.current = null;
        reject(new Error("Upload cancelled"));
      });

      xhr.addEventListener("timeout", () => {
        xhrRef.current = null;
        reject(new Error("Upload timeout. Please try again."));
      });

      xhr.open(
        "POST",
        `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/upload/avatar-image`
      );
      xhr.timeout = 60000 * 2;

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

    setUploadState({
      uploading: true,
      progress: 0,
      error: null,
    });

    try {
      const image = await uploadImage(file);

      setPreviewUrl(image.url);
      setUploadedImageId(image.id);

      setUploadState({
        uploading: false,
        progress: 100,
        error: null,
      });

      setTimeout(() => {
        setUploadState({
          uploading: false,
          progress: 0,
          error: null,
        });
      }, 2000);
    } catch (error) {
      if (error instanceof Error && error.message !== "Upload cancelled") {
        setUploadState({
          uploading: false,
          progress: 0,
          error: error.message,
        });
      }
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      React.startTransition(() => {
        formAction({ logo: previewUrl });
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
      console.log(`Deleting image: ${imageId}`);
      // await fetch(`/api/upload/${imageId}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const clearError = () => {
    setUploadState((prev) => ({ ...prev, error: null }));
  };

  const getStatusBadge = (
    status: "verified" | "pending" | "suspended" | "rejected"
  ): StatusBadge => {
    const variants: Record<string, StatusBadge> = {
      verified: {
        variant: "default",
        className: "bg-green-600",
        icon: CheckCircle,
      },
      pending: {
        variant: "secondary",
        className: "bg-yellow-600",
        icon: Clock,
      },
      suspended: {
        variant: "destructive",
        className: "bg-red-600",
        icon: AlertCircle,
      },
      rejected: {
        variant: "destructive",
        className: "bg-red-800",
        icon: Slash,
      },
    };
    return variants[status] ?? variants.pending;
  };

  const StatusIcon = getStatusBadge(vendor.status).icon;

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex gap-4 w-full lg:w-auto justify-center lg:justify-start">
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
                <div className="relative group/avatar h-24 w-24 rounded-full overflow-hidden cursor-pointer">
                  <Avatar className="h-24 w-24 rounded-full overflow-hidden">
                    <AvatarImage src={vendor.logo || undefined} />
                    <AvatarFallback>
                      <Store className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <button
                    className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center"
                    aria-label="Change logo"
                  >
                    <Upload className="h-6 w-6 text-white" />
                  </button>
                </div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                  <DialogTitle>Change Logo</DialogTitle>
                  <DialogDescription>
                    Upload a new logo for your shop. Maximum file size: 5MB.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
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

                  <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                    {previewUrl || vendor.logo ? (
                      <>
                        <div className="w-full h-48 flex items-center justify-center bg-gray-50">
                          <img
                            src={previewUrl || vendor.logo || ""}
                            alt="Logo preview"
                            className="max-w-full max-h-48 object-contain"
                          />
                        </div>
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
                            uploadState.uploading
                              ? cancelUpload
                              : handleButtonClick
                          }
                          disabled={uploadState.uploading}
                          size="sm"
                          variant={
                            uploadState.uploading ? "destructive" : "default"
                          }
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
                            {uploadState.uploading
                              ? "Uploading..."
                              : "Upload Image"}
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
                    <LoadingSwap isLoading={isPending}>
                      Save Changes
                    </LoadingSwap>
                  </Button>
                </DialogFooter>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload logo image"
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex-1 w-full text-center lg:text-left">
            <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
              <h2 className="text-2xl font-bold text-slate-900">
                {vendor.shop_name}
              </h2>
              {vendor.submitted_at && (
                <Badge
                  variant={getStatusBadge(vendor.status).variant}
                  className={getStatusBadge(vendor.status).className}
                >
                  <StatusIcon className="h-3 w-3 mr-1" />
                  <span className="capitalize">{vendor.status}</span>
                </Badge>
              )}

              {!vendor.submitted_at && (
                <Badge variant="secondary" className="bg-yellow-600">
                  <span className="capitalize">Not verified</span>
                  <XCircle className="h-3 w-3 mr-1" />
                </Badge>
              )}

              <VendorBadge state={statusState} />
            </div>
            <p className="text-slate-600 mt-1">{user.name}</p>
            <p className="text-slate-600">{user.email}</p>
            <div className="flex items-center gap-4 mt-3 flex-wrap justify-center lg:justify-start">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{vendorRating.average}</span>
                <span className="text-sm text-slate-500">rating</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-semibold">
                  {VendorStats.products_sold}
                </span>
                <span className="text-sm text-slate-500">sales</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Vendor since {formatDate(vendor.created_at)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;

function VendorBadge({ state }: { state: string }) {
  if (state === "top_rated") {
    return (
      <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
        ★ Top Rated
      </Badge>
    );
  }

  if (state === "hot_vendor") {
    return (
      <Badge className="bg-red-500 text-white hover:bg-red-600">
        🔥 Hot Vendor
      </Badge>
    );
  }

  return (
    <Badge className="bg-gray-300 text-gray-800 hover:bg-gray-400">
      Standard Vendor
    </Badge>
  );
}
