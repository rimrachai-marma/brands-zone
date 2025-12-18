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
import { Save, Plus, Trash2, Info, AlertCircle } from "lucide-react";
import { PurchaseOrder, PurchaseOrderItem } from "@/types";

import { formatCurrency } from "@/utils/formaters";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AsyncCombobox from "@/components/shared/AsyncCombobox";
import DatePicker from "@/components/shared/DatePicker";
import { ProductReturnFormData, productReturnSchema } from "../_lib/schema";
import {
  createProductReturn,
  getPurchaseOrders,
} from "@/lib/actions/inventory";

const ProductReturnForm: React.FC = () => {
  const router = useRouter();
  const [purchaseOrderResult, setPurchaseOrdersResult] = useState<
    PurchaseOrder[]
  >([]);
  const [purchaseOrderLoading, setPurchaseOrdersLoading] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  const [state, formAction, isPending] = React.useActionState(
    createProductReturn,
    null
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductReturnFormData>({
    resolver: zodResolver(productReturnSchema),
    defaultValues: {
      supplier_id: "",
      purchase_order_id: "",
      return_date: new Date().toISOString().split("T")[0],
      reason: undefined,
      notes: undefined,
      items: [],
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

  async function handlePurchaseOrderSearch(query: string) {
    if (!query) {
      return;
    }
    setPurchaseOrdersLoading(true);
    const result = await getPurchaseOrders({ keyword: query });
    setPurchaseOrdersResult(result?.data?.purchase_orders || []);
    setPurchaseOrdersLoading(false);
  }

  const handlePurchaseOrderSelect = (poId: string) => {
    const po = purchaseOrderResult.find((p) => p.id === poId);
    if (po) {
      setSelectedPO(po);

      // Clear existing items
      reset({
        purchase_order_id: poId,
        supplier_id: po.supplier.id,
        reason: undefined,
        notes: undefined,
        items: [],
      });
    }
  };

  const handleAddVariantFromPO = (poItem: PurchaseOrderItem) => {
    append({
      product_id: poItem.variant?.product_id,
      variant_id: poItem.variant_id,
      purchase_order_item_id: poItem.id,
      quantity: 0,
      unit_cost: parseFloat(poItem.unit_cost || "0"),
      reason: "",
      total: 0,
      max_quantity: poItem.quantity, // Add max_quantity for Zod validation
    });
  };

  const onSubmit = (data: ProductReturnFormData): void => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  React.useEffect(() => {
    if (state?.status) {
      if (state.status === "success") {
        toast.success(state.message);
        router.push("/brands/returns");
      }
      if (state.status === "error") {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const getReasonBadgeClass = (reason: string) => {
    const classes: Record<string, string> = {
      defective: "bg-red-100 text-red-800",
      wrong_item: "bg-blue-100 text-blue-800",
      excess_stock: "bg-gray-100 text-gray-800",
      expired: "bg-red-100 text-red-800",
      other: "bg-gray-100 text-gray-800 border border-gray-300",
    };
    return classes[reason] || "bg-blue-100 text-blue-800";
  };

  const getAvailableVariantsForSelection = () => {
    if (!selectedPO?.items) return [];

    // Filter out already added variants
    return selectedPO.items.filter(
      (poItem) => !items.some((item) => item.variant_id === poItem.variant_id)
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Return Details</CardTitle>
          <CardDescription>
            Select purchase order and return information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="purchase_order_id">Purchase Order *</Label>
              <Controller
                name="purchase_order_id"
                control={control}
                render={({ field }) => (
                  <AsyncCombobox<PurchaseOrder & { name: string }>
                    value={field.value}
                    onSelect={(id) => {
                      field.onChange(id);
                      handlePurchaseOrderSelect(id);
                    }}
                    onSearch={handlePurchaseOrderSearch}
                    placeholder="Search and select purchase order..."
                    label="Purchase Order"
                    results={purchaseOrderResult.map((p) => ({
                      name: `${p.po_number} - ${
                        p.supplier?.company_name || "N/A"
                      }`,
                      ...p,
                    }))}
                    isLoading={purchaseOrderLoading}
                  />
                )}
              />
              {errors.purchase_order_id && (
                <p className="text-sm text-red-500">
                  {errors.purchase_order_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier_id">Supplier</Label>
              <Controller
                name="supplier_id"
                control={control}
                render={({ field }) => (
                  <Input
                    id="supplier_id"
                    placeholder="Auto-filled from PO"
                    value={
                      selectedPO?.supplier?.company_name || field.value || ""
                    }
                    disabled
                    className="bg-slate-50"
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
              <Label htmlFor="return_date">Return Date *</Label>
              <Controller
                name="return_date"
                control={control}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.return_date && (
                <p className="text-sm text-red-500">
                  {errors.return_date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Return Reason *</Label>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defective">Defective</SelectItem>
                      <SelectItem value="wrong_item">Wrong Item</SelectItem>
                      <SelectItem value="excess_stock">Excess Stock</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.reason && (
                <p className="text-sm text-red-500">{errors.reason.message}</p>
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
                  placeholder="Add any additional information about this return..."
                  rows={3}
                  {...field}
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      {selectedPO && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">
                  Available Variants from PO
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Click &quot;Add to Return&quot; to include variants
                </CardDescription>
              </div>
              <Badge className="bg-blue-600 text-white">
                {getAvailableVariantsForSelection().length} Available
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {getAvailableVariantsForSelection().length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                <p>All variants from this PO have been added to the return</p>
              </div>
            ) : (
              <div className="space-y-3">
                {getAvailableVariantsForSelection().map((poItem) => (
                  <Card key={poItem.id} className="bg-white border-slate-200">
                    <CardContent className="pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 truncate">
                            {poItem.variant?.product?.name || "N/A"}
                          </div>
                          <div className="text-sm text-slate-600 mt-1 flex items-center gap-2 flex-wrap">
                            <span className="shrink-0">
                              SKU:{" "}
                              <span className="font-medium text-slate-700">
                                {poItem.variant?.sku || "N/A"}
                              </span>
                            </span>
                            {poItem.variant?.attributes &&
                              typeof poItem.variant.attributes === "object" && (
                                <>
                                  <span className="text-slate-400 hidden sm:inline">
                                    •
                                  </span>
                                  <div className="flex items-center gap-1 flex-wrap">
                                    {Object.entries(
                                      poItem.variant.attributes
                                    ).map(([key, value]) => (
                                      <Badge
                                        key={key}
                                        variant="outline"
                                        className="text-xs font-normal capitalize"
                                      >
                                        {key}: {String(value)}
                                      </Badge>
                                    ))}
                                  </div>
                                </>
                              )}
                          </div>
                          <div className="text-sm text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span>
                              PO Quantity: <strong>{poItem.quantity}</strong>
                            </span>
                            <span className="text-slate-400 hidden sm:inline">
                              •
                            </span>
                            <span>
                              Unit Cost:{" "}
                              <strong>
                                {formatCurrency(
                                  parseFloat(poItem.unit_cost),
                                  "USD"
                                )}
                              </strong>
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleAddVariantFromPO(poItem)}
                          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto shrink-0"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          <span className="sm:inline">Add to Return</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Return Items</CardTitle>
              <CardDescription>
                Items selected for return from the purchase order
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {fields.length} {fields.length === 1 ? "Item" : "Items"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.length === 0 ? (
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="text-center py-12 text-slate-500">
                <Info className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                <p className="text-lg font-medium">No items added yet</p>
                <p className="text-sm mt-1">
                  Select a purchase order above to add variants to this return
                </p>
              </CardContent>
            </Card>
          ) : (
            fields.map((field, index) => {
              const variantId = items[index]?.variant_id;
              const poItem = selectedPO?.items?.find(
                (item) => item.variant_id === variantId
              );
              const itemReason = items[index]?.reason;
              const maxQuantity = poItem?.quantity || 0;

              return (
                <Card key={field.id} className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600 text-white font-medium">
                            Item #{index + 1}
                          </Badge>
                          {itemReason && (
                            <Badge className={getReasonBadgeClass(itemReason)}>
                              {itemReason.replace("_", " ").toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          type="button"
                          className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-md border">
                        <Info className="h-4 w-4 text-slate-400 shrink-0" />
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-medium">Product:</span>
                          <span className="text-slate-900">
                            {poItem?.variant?.product?.name || "N/A"}
                          </span>
                          <span className="text-slate-400 hidden sm:inline">
                            |
                          </span>
                          <span className="font-medium">SKU:</span>
                          <span className="text-slate-900">
                            {poItem?.variant?.sku || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                        <div className="space-y-2">
                          <Label>PO Quantity</Label>
                          <div className="h-10 px-3 flex items-center bg-white border border-slate-200 rounded-md font-semibold text-slate-900">
                            {maxQuantity}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Return Quantity *</Label>
                          <Controller
                            name={`items.${index}.quantity`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                type="number"
                                min="1"
                                max={maxQuantity}
                                {...field}
                                onChange={(e) => {
                                  const qty = parseInt(e.target.value) || 0;
                                  field.onChange(qty);
                                  const cost = items[index]?.unit_cost || 0;
                                  setValue(`items.${index}.total`, qty * cost);
                                }}
                                placeholder="0"
                                className={
                                  errors.items?.[index]?.quantity
                                    ? "border-red-500"
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
                          <Label>Unit Cost</Label>
                          <div className="h-10 px-3 flex items-center bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-900">
                            {formatCurrency(
                              items[index]?.unit_cost || 0,
                              "USD"
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Total</Label>
                          <div className="h-10 px-3 flex items-center bg-slate-100 border border-slate-200 rounded-md font-semibold text-slate-900">
                            {formatCurrency(items[index]?.total || 0, "USD")}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`items.${index}.reason`}>
                          Item-Specific Reason (Optional)
                        </Label>
                        <Controller
                          name={`items.${index}.reason`}
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              id={`items.${index}.reason`}
                              placeholder="Add specific notes about why this item is being returned..."
                              rows={2}
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}

          <div className="flex justify-end">
            <Card className="w-80">
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(calculateTotal(), "USD")}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">
                    Total Return Amount:
                  </span>
                  <span className="font-bold text-xl text-blue-600">
                    {formatCurrency(calculateTotal(), "USD")}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isPending || fields.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <LoadingSwap isLoading={isPending} className="inline-flex">
                    <Save className="h-4 w-4 mr-2" />
                    <span>Create Return</span>
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

export default ProductReturnForm;
