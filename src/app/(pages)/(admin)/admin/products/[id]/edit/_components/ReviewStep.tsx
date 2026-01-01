import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ProductFormData } from "@/schema/products/create";
import { Brand, Campaign, Category } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AlertCircle, Edit, Package, Globe, Tag } from "lucide-react";

interface Props {
  form: UseFormReturn<ProductFormData>;
  brands: Brand[];
  categories: Category[];
  campaigns: Campaign[];
  onEdit: (step: number) => void;
}

const ReviewStep: React.FC<Props> = ({
  form,
  brands,
  categories,
  campaigns,
  onEdit,
}) => {
  const values = form.getValues();

  const brand = brands.find((b) => b.id === values.brand_id);
  const selectedCategories = categories.filter((c) =>
    values.category_ids.includes(c.id)
  );
  const campaign = campaigns.find((c) => c.id === values.campaign_id);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined || price === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: values.currency || "USD",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Review Your Product</CardTitle>
            <Badge variant="outline" className="text-blue-600">
              Final Step
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">Basic Information</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(1)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Name: </span>
                <span className="font-medium">{values.name || "Not set"}</span>
              </div>
              <div>
                <span className="text-gray-600">Brand: </span>
                <span className="font-medium">{brand?.name || "Not set"}</span>
              </div>
              <div>
                <span className="text-gray-600">Categories: </span>
                <div className="font-medium inline-flex gap-1.5 flex-wrap">
                  {selectedCategories.length > 0
                    ? selectedCategories.map((c) => {
                        return (
                          <Badge variant="outline" key={c.id}>
                            {c.name}
                          </Badge>
                        );
                      })
                    : "Not set"}
                </div>
              </div>
              {/* SHORT DESCRIPTION */}
              {values.short_description && (
                <div>
                  <span className="text-gray-600">Short Description: </span>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {values.short_description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">Product Images</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(2)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            {values.images &&
            values.images.length > 0 &&
            values.images[0].url ? (
              <div className="grid grid-cols-4 gap-3">
                {values.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square relative rounded-lg overflow-hidden border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt_text}
                      className="w-full h-full object-cover"
                    />
                    {/* PUBLIC ID - MISSING */}
                    {img.publicId && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                        ID: {img.publicId}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No images added</div>
            )}
          </div>

          {/* Description */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">Description</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(3)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {values.description || "No description provided"}
            </p>
          </div>

          {/* Attributes */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">Attributes</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(4)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm">
              {values.attributes && values.attributes?.length > 0 ? (
                <div className="space-y-2">
                  {values.attributes.map((attr, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-md">
                      <div className="font-medium text-gray-900 mb-1">
                        {attr.name}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {attr.options?.map((option, optIdx) => (
                          <Badge
                            key={optIdx}
                            variant="outline"
                            className="text-xs"
                          >
                            {option.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No attributes defined</span>
              )}
            </div>
          </div>

          {/* Variants - Section */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Variants
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(4)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            {values.variants && values.variants.length > 0 ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-4">
                  Total Variants:nbsp;
                  <span className="font-semibold text-gray-900">
                    {values.variants.length}
                  </span>
                </div>

                {values.variants.map((variant, idx) => (
                  <Card key={idx} className="bg-gray-50">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-3">
                          <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                              SKU
                            </span>
                            <p className="text-sm font-medium mt-0.5">
                              {variant.sku || "Not set"}
                            </p>
                          </div>

                          {variant.barcode && (
                            <div>
                              <span className="text-xs text-gray-500 uppercase tracking-wide">
                                Barcode
                              </span>
                              <p className="text-sm font-medium mt-0.5">
                                {variant.barcode}
                              </p>
                            </div>
                          )}

                          {/* Variant Attributes */}
                          {variant.attributes &&
                            Object.keys(variant.attributes).length > 0 && (
                              <div>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">
                                  Attributes
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {Object.entries(variant.attributes).map(
                                    ([key, value]) => (
                                      <Badge
                                        key={key}
                                        variant="outline"
                                        className="text-xs capitalize"
                                      >
                                        {key}: {value}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3">
                          {/* Pricing */}
                          <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                              Pricing
                            </span>
                            <div className="mt-1 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">
                                  Price:
                                </span>
                                <span className="text-sm font-semibold">
                                  {formatPrice(variant.price)}
                                </span>
                              </div>
                              {variant.sale_price !== undefined &&
                                variant.sale_price !== null && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">
                                      Sale Price:
                                    </span>
                                    <span className="text-sm font-semibold text-green-600">
                                      {formatPrice(variant.sale_price)}
                                    </span>
                                  </div>
                                )}
                              {variant.cost_price !== undefined &&
                                variant.cost_price !== null && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-600">
                                      Cost Price:
                                    </span>
                                    <span className="text-sm">
                                      {formatPrice(variant.cost_price)}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>

                          {/* Weight & Dimensions */}
                          <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                              Shipping
                            </span>
                            <div className="mt-1 space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">
                                  Weight:
                                </span>
                                <span className="text-sm">
                                  {variant.weight || 0} {variant.weight_unit}
                                </span>
                              </div>
                              {(variant.length ||
                                variant.width ||
                                variant.height) && (
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">
                                    Dimensions:
                                  </span>
                                  <span className="text-sm">
                                    {variant.length || 0} × {variant.width || 0}{" "}
                                    × {variant.height || 0}{" "}
                                    {variant.dimension_unit}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No variants added yet</p>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">Specifications</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(5)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm">
              {values.specifications &&
              Object.keys(values.specifications).length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(values.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between bg-gray-50 p-2 rounded text-xs"
                    >
                      <span className="text-gray-600 font-medium">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No specifications added</span>
              )}
            </div>
          </div>

          {/* SEO/Meta Information SECTION */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Globe className="h-5 w-5" />
                SEO & Meta Information
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(6)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              {values.meta_title ? (
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Meta Title
                  </span>
                  <p className="text-gray-900">{values.meta_title}</p>
                </div>
              ) : null}

              {values.meta_description ? (
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Meta Description
                  </span>
                  <p className="text-gray-700">{values.meta_description}</p>
                </div>
              ) : null}

              {values.meta_keywords && values.meta_keywords.length > 0 ? (
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Meta Keywords
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {values.meta_keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {values.canonical_url ? (
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
                    Canonical URL
                  </span>
                  <p className="text-blue-600 text-xs break-all">
                    {values.canonical_url}
                  </p>
                </div>
              ) : null}

              {!values.meta_title &&
                !values.meta_description &&
                !values.canonical_url &&
                values.meta_keywords?.length === 0 && (
                  <span className="text-gray-500">
                    No SEO information added
                  </span>
                )}
            </div>
          </div>

          {/* Inventory & Campaign */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">Additional Settings</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Currency: </span>
                <span className="font-medium">{values.currency}</span>
              </div>
              <div>
                <span className="text-gray-600">Low Stock Threshold: </span>
                <span className="font-medium">
                  {values.low_stock_threshold}
                </span>
              </div>

              {campaign && (
                <div>
                  <span className="text-gray-600">Campaign: </span>
                  <span className="font-medium">{campaign.name}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please review all information carefully before publishing. You can go
          back to any step to make changes.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ReviewStep;
