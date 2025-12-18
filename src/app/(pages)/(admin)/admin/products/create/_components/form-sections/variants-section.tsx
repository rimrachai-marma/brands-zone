"use client";
import React from "react";
import { UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import { ProductFormData } from "@/schema/products/create";

interface Props {
  form: UseFormReturn<ProductFormData>;
  brandName: string;
}

export function VariantsSection({ form, brandName }: Props) {
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Use useWatch to properly track attributes changes
  const attributes = useWatch({
    control: form.control,
    name: "attributes",
    defaultValue: [],
  });

  const hasMultipleVariants = variantFields.length > 1;

  const generateSku = (variantIndex: number, brand: string) => {
    const name = form.getValues("name");
    const attributes = form.getValues(`variants.${variantIndex}.attributes`);

    if (name && brand) {
      const nameAbbr = name
        .split(" ")
        .slice(0, 2)
        .map((word) => word.slice(0, 3))
        .join("");

      const brandAbbr = brand.slice(0, 3);

      // Add attribute abbreviations if available
      let attrPart = "";
      if (attributes && Object.keys(attributes).length > 0) {
        attrPart = Object.values(attributes)
          .map((val) => String(val).slice(0, 3))
          .join("-");
        attrPart = `-${attrPart}`;
      }

      const generatedSku = `${brandAbbr}-${nameAbbr}${attrPart}`.toUpperCase();

      form.setValue(`variants.${variantIndex}.sku`, generatedSku);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Product Variants
        </CardTitle>
        <CardDescription>
          {hasMultipleVariants
            ? "Configure pricing and inventory for each variant. Each variant must have unique attributes."
            : "Configure pricing and inventory for this product. Add more variants if you have different sizes, colors, etc."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {variantFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="border-2 rounded-lg p-6 space-y-6 bg-linear-to-br from-gray-50 to-white"
              >
                {/* Variant Header */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Variant {index + 1}
                      </h3>
                      {hasMultipleVariants && (
                        <Badge variant="outline" className="text-xs">
                          Attributes Required
                        </Badge>
                      )}
                    </div>
                  </div>

                  {variantFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-50 hover:text-red-600 shrink-0"
                      onClick={() => {
                        removeVariant(index);
                        form.trigger("variants");
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Attribute Selection */}
                {hasMultipleVariants && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-gray-700 border-b pb-2">
                      Variant Attributes <span className="text-red-500">*</span>
                    </h4>

                    {attributes && attributes.length > 0 ? (
                      <div className="space-y-4">
                        {attributes?.map((attr) => (
                          <FormField
                            key={attr.slug}
                            control={form.control}
                            name={`variants.${index}.attributes.${attr.slug}`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  {attr.name}{" "}
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  value={field.value || ""}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    form.trigger(
                                      `variants.${index}.attributes`
                                    );
                                  }}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue
                                        placeholder={`Select ${attr.name.toLowerCase()}`}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {attr.options.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        <div className="flex items-center gap-2">
                                          {attr.type === "color" &&
                                            option.metadata?.hex && (
                                              <div
                                                className="w-4 h-4 rounded-full border"
                                                style={{
                                                  backgroundColor:
                                                    option.metadata.hex,
                                                }}
                                              />
                                            )}
                                          <span>{option.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-amber-700 bg-amber-50 border border-amber-300 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <p>
                          Please add attributes in the Product Attributes
                          section above before configuring variants.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* SKU Field */}
                <FormField
                  control={form.control}
                  name={`variants.${index}.sku`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SKU <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            placeholder="e.g., AAR-POLO-NAV-M"
                            {...field}
                            className="font-mono text-sm"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="shrink-0"
                            onClick={() => generateSku(index, brandName)}
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Unique stock keeping unit identifier
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Barcode */}
                <FormField
                  control={form.control}
                  name={`variants.${index}.barcode`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ISBN, UPC, GTIN, etc."
                          {...field}
                          className="font-mono text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pricing Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-700 border-b pb-2">
                    Pricing
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Regular Price{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                $
                              </span>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="pl-7"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sale_price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sale Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                $
                              </span>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="pl-7"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || undefined
                                  )
                                }
                              />
                            </div>
                          </FormControl>
                          <FormDescription>Discounted price</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.cost_price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                $
                              </span>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="pl-7"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || undefined
                                  )
                                }
                              />
                            </div>
                          </FormControl>
                          <FormDescription>Your cost</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Inventory & Weight */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-700 border-b pb-2">
                    Inventory & Physical Properties
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.stock_quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="0"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>Available inventory</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`variants.${index}.weight`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Weight <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="flex-1"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || undefined
                                  )
                                }
                              />
                              <FormField
                                control={form.control}
                                name={`variants.${index}.weight_unit`}
                                render={({ field: unitField }) => (
                                  <Select
                                    value={unitField.value}
                                    onValueChange={unitField.onChange}
                                  >
                                    <SelectTrigger className="w-20">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent align="end">
                                      <SelectItem value="kg">kg</SelectItem>
                                      <SelectItem value="g">g</SelectItem>
                                      <SelectItem value="lb">lb</SelectItem>
                                      <SelectItem value="oz">oz</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Dimensions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-600">
                    Dimensions (Optional)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.length`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Length</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              className="h-9 text-sm"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  parseFloat(e.target.value) || undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.width`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Width</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              className="h-9 text-sm"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  parseFloat(e.target.value) || undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.height`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Height</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              className="h-9 text-sm"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  parseFloat(e.target.value) || undefined
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.dimension_unit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Unit</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">cm</SelectItem>
                              <SelectItem value="inch">inch</SelectItem>
                              <SelectItem value="m">m</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add Variant Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendVariant({
                sku: "",
                barcode: "",
                attributes: {},
                price: 0,
                sale_price: undefined,
                cost_price: undefined,
                stock_quantity: 0,
                weight: 5,
                weight_unit: "kg",
                length: undefined,
                width: undefined,
                height: undefined,
                dimension_unit: "cm",
              })
            }
            className="w-full h-12 border-2 border-dashed hover:border-solid hover:bg-gray-50 transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Another Variant
          </Button>

          {attributes?.length === 0 && hasMultipleVariants && (
            <div className="text-sm text-amber-700 bg-amber-50 border-2 border-amber-300 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Missing Attributes</p>
                <p className="text-xs leading-relaxed">
                  You have multiple variants but no attributes defined. Please
                  add attributes (like color, size) in the Product Attributes
                  section above, then assign them to each variant.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
