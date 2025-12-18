"use client";

import ProductVariants from "./product-variants";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Package,
  AlertTriangle,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { getStockStatus } from "../_lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { InventoryProduct } from "@/types/inventory";
import { formatCurrency } from "@/utils/formaters";

interface Props {
  products: InventoryProduct[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  const [expandedProducts, setExpandedProducts] = React.useState(
    new Set<string>()
  );

  const toggleProduct = (productId: string) => {
    const newExpanded = new Set(expandedProducts);

    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-sm font-semibold text-slate-900">
          No products found
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Get started by creating a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const isExpanded = expandedProducts.has(product.id);

        const totalStock = product.variants.reduce(
          (sum, variant) => sum + (variant.inventory?.quantity_in_stock ?? 0),
          0
        );

        const reservedQuantity = product.variants.reduce(
          (sum, variant) => sum + (variant.inventory?.reserved_quantity ?? 0),
          0
        );

        const availableStock = totalStock - reservedQuantity;

        const needsReorder = product.variants.some(
          (variant) =>
            (variant.inventory?.quantity_in_stock ?? 0) <=
            (variant.inventory?.reorder_level ?? 0)
        );

        const stockStatus = getStockStatus(
          totalStock,
          product.low_stock_threshold
        );

        const totalValue = product.variants.reduce(
          (sum, variant) =>
            sum +
            Number(variant.sale_price ?? variant.price) *
              (variant.inventory?.quantity_in_stock ?? 0),
          0
        );

        const totalPurchased = product.purchase_stats?.total_quantity ?? 0;
        const totalSold = product.sales_stats?.total_quantity ?? 0;
        const totalReturned = product.return_stats?.total_quantity ?? 0;
        const totalDamaged = product.damage_stats?.total_quantity ?? 0;

        return (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden bg-white"
          >
            <div
              className="p-4 hover:bg-slate-50 cursor-pointer"
              onClick={() => toggleProduct(product.id)}
            >
              <div className="flex items-start sm:items-center justify-between gap-">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 shrink-0 mt-1 sm:mt-0"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                        {product.name}
                      </h3>

                      {product.brand && (
                        <Badge
                          variant="outline"
                          className="text-xs whitespace-nowrap"
                        >
                          {product.brand.name}
                        </Badge>
                      )}

                      {product.campaign && (
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs whitespace-nowrap">
                          {product.campaign.name}
                        </Badge>
                      )}

                      {needsReorder && (
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs whitespace-nowrap">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Needs Reorder
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs sm:text-sm text-slate-500 mt-1">
                      <span className="whitespace-nowrap">
                        {product.variants.length} variant
                        {product.variants.length !== 1 ? "s" : ""}
                      </span>
                      <span className="whitespace-nowrap">
                        Stock: {totalStock}
                      </span>
                      {reservedQuantity > 0 && (
                        <span className="whitespace-nowrap text-amber-600">
                          Reserved: {reservedQuantity}
                        </span>
                      )}
                      <span className="whitespace-nowrap">
                        Available: {availableStock}
                      </span>
                      <span className="whitespace-nowrap font-medium text-slate-700">
                        Value: {formatCurrency(totalValue, product.currency)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-600 mt-2 border-t border-slate-200 pt-2">
                      <span className="whitespace-nowrap flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-green-600 font-medium">
                          Purchased:
                        </span>{" "}
                        {totalPurchased}
                      </span>

                      <span className="whitespace-nowrap flex items-center gap-1">
                        <ShoppingCart className="h-3 w-3 text-blue-600" />
                        <span className="text-blue-600 font-medium">
                          Sold:
                        </span>{" "}
                        {totalSold}
                      </span>

                      <span className="whitespace-nowrap flex items-center gap-1">
                        <TrendingDown className="h-3 w-3 text-orange-600" />
                        <span className="text-orange-600 font-medium">
                          Returns:
                        </span>{" "}
                        {totalReturned}
                      </span>

                      <span className="whitespace-nowrap flex items-center gap-1">
                        <XCircle className="h-3 w-3 text-red-600" />
                        <span className="text-red-600 font-medium">
                          Damaged:
                        </span>{" "}
                        {totalDamaged}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                      <span className="whitespace-nowrap">
                        Low Stock Alert: {product.low_stock_threshold}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 shrink-0">
                  <Badge
                    className={cn(
                      "text-xs whitespace-nowrap",
                      stockStatus === "In Stock" &&
                        "bg-green-100 text-green-800 hover:bg-green-100",
                      stockStatus === "Low Stock" &&
                        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                      stockStatus === "Out of Stock" &&
                        "bg-red-100 text-red-800 hover:bg-red-100"
                    )}
                  >
                    {stockStatus}
                  </Badge>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    onClick={(e) => e.stopPropagation()}
                    className="whitespace-nowrap text-xs sm:text-sm"
                  >
                    <Link href={`/vendor/products/${product.id}`}>
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {isExpanded && <ProductVariants product={product} />}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
