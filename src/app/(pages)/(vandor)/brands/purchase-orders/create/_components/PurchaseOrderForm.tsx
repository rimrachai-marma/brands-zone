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
import { Save, Plus, Trash2, Info } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/formaters";
import { getVendorProducts } from "@/lib/actions/products";
import { getSuppliers } from "@/lib/actions/supplier";
import { Supplier } from "@/types/supplier";
import { PurchaseOrderFormData, purchaseOrderSchema } from "./_lib/schemas";
import { createPurchaseOrders } from "@/lib/actions/inventory";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AsyncCombobox from "@/components/shared/AsyncCombobox";
import VariantCombobox from "@/components/shared/VariantCombobox";
import DatePicker from "@/components/shared/DatePicker";

const PurchaseOrderForm: React.FC = () => {
  const router = useRouter();
  const [productResult, setProductResult] = React.useState<
    Omit<Product, "reviews">[]
  >([]);
  const [productLoading, setProductLoading] = useState(false);

  const [supplierResult, setSupplierResult] = React.useState<Supplier[]>([]);
  const [supplierLoading, setSupplierLoading] = useState(false);

  const [products, setProducts] = useState<
    Record<string, Omit<Product, "reviews">>
  >({});

  const [state, formAction, isPending] = React.useActionState(
    createPurchaseOrders,
    null
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PurchaseOrderFormData>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplier_id: "",
      order_date: new Date().toISOString().split("T")[0],
      notes: undefined,
      items: [
        {
          product_id: "",
          variant_id: "",
          quantity: 0,
          unit_cost: 0,
          total: 0,
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

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + (item.total || 0), 0);
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

  async function handleSupplierSearch(query: string) {
    if (!query) {
      setSupplierResult([]);
      return;
    }
    setSupplierLoading(true);
    const result = await getSuppliers({ keyword: query });
    setSupplierResult(result?.data?.suppliers || []);
    setSupplierLoading(false);
  }

  const onSubmit = (data: PurchaseOrderFormData): void => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  React.useEffect(() => {
    if (state?.status) {
      if (state.status === "success") {
        toast.success(state.message);
        router.push("/brands/purchase-orders");
      }
      if (state.status === "error") {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Basic purchase order information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Controller
                name="supplier_id"
                control={control}
                render={({ field }) => (
                  <AsyncCombobox<Supplier & { name: string }>
                    value={field.value}
                    onSelect={field.onChange}
                    onSearch={handleSupplierSearch}
                    placeholder="Select supplier..."
                    label="Supplier"
                    results={supplierResult.map((s) => ({
                      name: s.company_name,
                      ...s,
                    }))}
                    isLoading={supplierLoading}
                  />
                )}
              />
              {errors.supplier_id && (
                <p className="text-sm text-red-500">
                  {errors.supplier_id.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="order_date">Order Date *</Label>
              <Controller
                name="order_date"
                control={control}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.order_date && (
                <p className="text-sm text-red-500">
                  {errors.order_date.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="notes"
                  placeholder="Add any special instructions or notes..."
                  rows={3}
                  {...field}
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                Add products and variants to this purchase order
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  product_id: "",
                  variant_id: "",
                  quantity: 0,
                  unit_cost: 0,
                  total: 0,
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

            return (
              <Card key={field.id} className="bg-slate-50 border-slate-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="font-medium">
                        Item #{index + 1}
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    {/* Product & Variant Selection */}
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

                                // Reset quantity and total, set unit_cost from variant
                                setValue(`items.${index}.quantity`, 0);
                                setValue(
                                  `items.${index}.unit_cost`,
                                  parseFloat(selectedVariant?.cost_price || "0")
                                );
                                setValue(`items.${index}.total`, 0);
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
                      <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-md border">
                        <Info className="h-4 w-4 text-slate-400" />
                        <span className="font-medium">SKU:</span>
                        <span className="text-slate-900">{variant.sku}</span>
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Quantity *</Label>
                        <Controller
                          name={`items.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              min="0"
                              {...field}
                              onChange={(e) => {
                                const qty = parseInt(e.target.value) || 0;
                                field.onChange(qty);
                                const cost = items[index]?.unit_cost || 0;
                                setValue(`items.${index}.total`, qty * cost);
                              }}
                              placeholder="0"
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
                                disabled
                                {...field}
                                onChange={(e) => {
                                  const cost = parseFloat(e.target.value) || 0;
                                  field.onChange(cost);
                                  const qty = items[index]?.quantity || 0;
                                  setValue(`items.${index}.total`, qty * cost);
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
                        <div className="h-10 px-3 flex items-center bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-900">
                          {formatCurrency(items[index]?.total || 0, "USD")}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Summary */}
          <div className="flex justify-end">
            <Card className="w-80">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(calculateTotal(), "USD")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax (0%):</span>
                  <span className="font-medium text-slate-900">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Total:</span>
                  <span className="font-bold text-xl text-slate-900">
                    {formatCurrency(calculateTotal(), "USD")}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={handleSubmit(onSubmit)} className="w-full">
                  <LoadingSwap isLoading={isPending} className="inline-flex ">
                    <Save className="h-4 w-4 mr-2" />
                    <span>Create order</span>
                  </LoadingSwap>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOrderForm;
