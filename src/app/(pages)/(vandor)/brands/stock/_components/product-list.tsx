"use client";

import ProductVariants from "./product-variants";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import React from "react";
import { getStockStatus } from "../_lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Props {
  products: Omit<Product, "reviews">[];
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

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const isExpanded = expandedProducts.has(product.id);

        const totalStock = product.variants.reduce(
          (sum, variant) => sum + (variant.inventory?.quantity_in_stock ?? 0),
          0
        );

        const stockStatus = getStockStatus(
          totalStock,
          product.low_stock_threshold
        );

        return (
          <div
            key={product.id}
            className="border rounded-lg bg-white overflow-hidden"
          >
            <div
              className="p-4 hover:bg-slate-50 cursor-pointer"
              onClick={() => toggleProduct(product.id)}
            >
              <div className="flex items-start sm:items-center justify-between gap-3">
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
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 flex-wrap">
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

                      {product.status === "draft" && (
                        <Badge
                          variant="secondary"
                          className="text-xs whitespace-nowrap"
                        >
                          Draft
                        </Badge>
                      )}
                      {product.campaign && (
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs whitespace-nowrap">
                          {product.campaign.name}
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 mt-1 whitespace-nowrap">
                      {product.variants.length} variant
                      {product.variants.length !== 1 ? "s" : ""} • Total Stock:{" "}
                      {totalStock}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 shrink-0">
                  <Badge
                    className={cn(
                      "text-xs whitespace-nowrap",
                      stockStatus === "In Stock" &&
                        "bg-green-100 text-green-800",
                      stockStatus === "Low Stock" &&
                        "bg-yellow-100 text-yellow-800",
                      stockStatus === "Out of Stock" &&
                        "bg-red-100 text-red-800"
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
                    <Link href={`/brands/products/${product.id}`}>
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
