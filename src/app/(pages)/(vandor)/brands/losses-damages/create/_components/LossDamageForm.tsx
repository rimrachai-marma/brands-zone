"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Plus, Trash2, Info } from "lucide-react";
import { Product } from "@/types";

import { formatCurrency } from "@/utils/formaters";
import { getVendorProducts } from "@/lib/actions/products";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DatePicker from "@/components/shared/DatePicker";
import AsyncCombobox from "@/components/shared/AsyncCombobox";
import VariantCombobox from "@/components/shared/VariantCombobox";
import { LossDamageFormData, lossDamageSchema } from "../_lib/schema";
import { createProductDamage } from "@/lib/actions/inventory";

// Schema with fixed stock validation

const LossDamageForm: React.FC = () => {
  const router = useRouter();
  const [productResult, setProductResult] = React.useState<
    Omit<Product, "reviews">[]
  >([]);
  const [productLoading, setProductLoading] = useState(false);

  const [products, setProducts] = useState<
    Record<string, Omit<Product, "reviews">>
  >({});

  const [state, formAction, isPending] = React.useActionState(
    createProductDamage,
    null
  );

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<LossDamageFormData>({
    resolver: zodResolver(lossDamageSchema),
    mode: "onChange",
    defaultValues: {
      damage_date: new Date().toISOString().split("T")[0],
      damage_type: undefined,
      description: "",
      items: [
        {
          product_id: "",
          variant_id: "",
          quantity: 0,
          unit_cost: 0,
          condition_notes: "",
          total: 0,
          current_stock: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = useWatch({
    control,
    name: "items",
  });

  const damageType = useWatch({
    control,
    name: "damage_type",
  });

  const calculateTotalLoss = (): number => {
    return items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const calculateTotalQuantity = (): number => {
    return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  async function handleProductSearch(query: string) {
    if (!query) {
      setProductResult([]);
      return;
    }
    setProductLoading(true);
    const result = await getVendorProducts({ keyword: query });
    setProductResult(result.data?.products || []);
    setProductLoading(false);
  }

  const onSubmit = (data: LossDamageFormData): void => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  React.useEffect(() => {
    if (state?.status) {
      if (state.status === "success") {
        toast.success(state.message);
        router.push("/brands/losses-damages");
      }
      if (state.status === "error") {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const getDamageTypeBadgeClass = (type: string) => {
    const classes: Record<string, string> = {
      physical: "bg-red-100 text-red-800",
      water: "bg-blue-100 text-blue-800",
      fire: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
      manufacturing_defect:
        "bg-orange-100 text-orange-800 border border-orange-300",
      other: "bg-gray-100 text-gray-800 border border-gray-300",
    };
    return classes[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Damage Details</CardTitle>
          <CardDescription>Basic loss and damage information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="damage_date">Damage Date *</Label>
              <Controller
                name="damage_date"
                control={control}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.damage_date && (
                <p className="text-sm text-red-500">
                  {errors.damage_date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="damage_type">Damage Type *</Label>
              <Controller
                name="damage_type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select damage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Physical Damage</SelectItem>
                      <SelectItem value="water">Water Damage</SelectItem>
                      <SelectItem value="fire">Fire Damage</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="manufacturing_defect">
                        Manufacturing Defect
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.damage_type && (
                <p className="text-sm text-red-500">
                  {errors.damage_type.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Describe the circumstances of the damage or loss..."
                  rows={3}
                  {...field}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Damaged Items</CardTitle>
              <CardDescription>
                Add products and variants affected by this damage
              </CardDescription>
            </div>
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() =>
                append({
                  product_id: "",
                  variant_id: "",
                  quantity: 0,
                  unit_cost: 0,
                  condition_notes: "",
                  total: 0,
                  current_stock: 0,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => {
            const productId = items[index]?.product_id;
            const variantId = items[index]?.variant_id;

            const product = products[productId];
            const variant = product?.variants?.find((v) => v.id === variantId);

            const currentStock = items[index]?.current_stock || 0;

            return (
              <Card key={field.id} className="bg-red-50 border-red-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-600 text-white font-medium">
                          Item #{index + 1}
                        </Badge>
                        {damageType && (
                          <Badge
                            className={getDamageTypeBadgeClass(damageType)}
                          >
                            {damageType.replace("_", " ").toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-red-200 text-red-600"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Product *</Label>
                        <Controller
                          name={`items.${index}.product_id`}
                          control={control}
                          render={({ field }) => (
                            <AsyncCombobox<Omit<Product, "reviews">>
                              value={field.value}
                              onSelect={async (id) => {
                                field.onChange(id);
                                setValue(`items.${index}.variant_id`, "");
                                setValue(`items.${index}.quantity`, 0);
                                setValue(`items.${index}.unit_cost`, 0);
                                setValue(`items.${index}.total`, 0);
                                setValue(`items.${index}.current_stock`, 0);

                                const selectedProduct = productResult.find(
                                  (p) => p.id === id
                                );
                                if (selectedProduct) {
                                  setProducts((prev) => ({
                                    ...prev,
                                    [id]: selectedProduct,
                                  }));
                                }
                              }}
                              onSearch={handleProductSearch}
                              placeholder="Select product..."
                              label="Product"
                              results={productResult}
                              isLoading={productLoading}
                            />
                          )}
                        />
                        {errors.items?.[index]?.product_id && (
                          <p className="text-sm text-red-500">
                            {errors.items[index]?.product_id?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Variant *</Label>
                        <Controller
                          name={`items.${index}.variant_id`}
                          control={control}
                          render={({ field }) => (
                            <VariantCombobox
                              value={field.value}
                              onSelect={(id) => {
                                field.onChange(id);
                                const selectedVariant = product?.variants?.find(
                                  (v) => v.id === id
                                );
                                const stock =
                                  selectedVariant?.inventory
                                    ?.quantity_in_stock ?? 0;

                                setValue(`items.${index}.quantity`, 0);
                                setValue(
                                  `items.${index}.unit_cost`,
                                  parseFloat(selectedVariant?.cost_price || "0")
                                );
                                setValue(`items.${index}.total`, 0);
                                setValue(
                                  `items.${index}.current_stock`,
                                  stock,
                                  { shouldValidate: true }
                                );
                              }}
                              variants={product?.variants || []}
                              disabled={!productId}
                            />
                          )}
                        />
                        {errors.items?.[index]?.variant_id && (
                          <p className="text-sm text-red-500">
                            {errors.items[index]?.variant_id?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {variant && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Info className="h-4 w-4 text-slate-400" />
                          <span className="font-medium">Product:</span>
                          <span className="text-slate-900">
                            {product?.name}
                          </span>
                          <span className="text-slate-400">|</span>
                          <span className="font-medium">SKU:</span>
                          <span className="text-slate-900">{variant.sku}</span>
                        </div>
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="space-y-2">
                        <Label className="text-slate-700">Current Stock</Label>
                        <div
                          className={`h-10 px-3 flex items-center border rounded-md font-medium transition-colors bg-slate-100 border-slate-200 text-slate-700`}
                        >
                          {currentStock}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Damage Quantity *</Label>
                        <Controller
                          name={`items.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              min="0"
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                const qty = value === "" ? 0 : parseInt(value);
                                field.onChange(qty);
                                const cost =
                                  getValues(`items.${index}.unit_cost`) || 0;
                                setValue(`items.${index}.total`, qty * cost, {
                                  shouldValidate: true,
                                });
                              }}
                              onBlur={() => {
                                if (!field.value) field.onChange(0);
                              }}
                              placeholder="0"
                              className={
                                errors.items?.[index]?.quantity
                                  ? "border-red-500 focus:ring-red-500"
                                  : ""
                              }
                            />
                          )}
                        />
                        {errors.items?.[index]?.quantity && (
                          <p className="text-sm text-red-500">
                            {errors.items[index]?.quantity?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Unit Cost *</Label>
                        <Controller
                          name={`items.${index}.unit_cost`}
                          control={control}
                          render={({ field }) => (
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                                $
                              </span>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={field.value || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const cost =
                                    value === "" ? 0 : parseFloat(value);
                                  field.onChange(cost);
                                  const qty =
                                    getValues(`items.${index}.quantity`) || 0;
                                  setValue(`items.${index}.total`, qty * cost);
                                }}
                                onBlur={() => {
                                  if (!field.value) field.onChange(0);
                                }}
                                placeholder="0.00"
                                className="pl-7"
                              />
                            </div>
                          )}
                        />
                        {errors.items?.[index]?.unit_cost && (
                          <p className="text-sm text-red-500">
                            {errors.items[index]?.unit_cost?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Total</Label>
                        <div className="h-10 px-3 flex items-center bg-white border border-red-300 rounded-md font-semibold text-red-600">
                          {formatCurrency(items[index]?.total || 0, "USD")}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Condition Notes</Label>
                      <Controller
                        name={`items.${index}.condition_notes`}
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            placeholder="Describe the condition of the damaged item..."
                            rows={2}
                          />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="flex justify-end">
            <Card className="w-80 border-red-200">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Units Damaged:</span>
                  <span className="font-medium text-slate-900">
                    {calculateTotalQuantity()} units
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">
                    Total Loss Amount:
                  </span>
                  <span className="font-bold text-xl text-red-600">
                    {formatCurrency(calculateTotalLoss(), "USD")}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isPending}
                >
                  <LoadingSwap isLoading={isPending} className="inline-flex">
                    <Save className="h-4 w-4 mr-2" />
                    <span>Record Loss & Damage</span>
                  </LoadingSwap>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LossDamageForm;
