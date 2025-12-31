"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye, Pencil } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formaters";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProductRequest, ProductRequestPagination } from "@/types/admin";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce"; // Create this hook

interface Props {
  products: ProductRequest[];
  pagination?: ProductRequestPagination;
}

export const ProductsTable: React.FC<Props> = ({ products, pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Get current search from URL
  const currentSearch = searchParams.get("keyword") || "";

  // Initialize search value from URL
  React.useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  // Create debounced search
  const debouncedSearch = useDebounce(searchValue, 500);

  // Handle debounced search changes
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch.trim()) {
      params.set("keyword", debouncedSearch.trim());
      params.set("page", "1");
    } else {
      params.delete("keyword");
    }

    if (params.toString() !== searchParams.toString()) {
      setIsSearching(true);
      router.push(`?${params.toString()}`);
      // The parent component will refetch data when URL changes
    }
  }, [debouncedSearch, router, searchParams]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-300",
      published: "bg-green-50 text-green-700 border-green-300",
      rejected: "bg-red-50 text-red-700 border-red-300",
      draft: "bg-gray-50 text-gray-700 border-gray-300",
    };

    return (
      <Badge
        className={cn(
          "capitalize border text-xs",
          variants[status as keyof typeof variants] || variants.draft
        )}
      >
        {status}
      </Badge>
    );
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-lg sm:text-xl">
              All Products List
            </CardTitle>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search products by name..."
              className="pl-10 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-24">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sale Price</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length < 1 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-slate-500"
                  >
                    {currentSearch
                      ? `No products found for "${currentSearch}"`
                      : "No products found"}
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <AspectRatio
                        ratio={1}
                        className="bg-slate-100 rounded-md"
                      >
                        {product.banner_image ? (
                          <Image
                            src={product.banner_image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-400">
                            No Image
                          </div>
                        )}
                      </AspectRatio>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-slate-900 truncate max-w-[200px]">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {product.slug}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-700">
                        {product.brand_name || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.campaign_name ? (
                        <div className="text-sm font-medium text-slate-900">
                          {product.campaign_name}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(parseFloat(product.price), "USD")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {product.sale_price ? (
                        <span className="font-medium text-green-600">
                          {formatCurrency(
                            parseFloat(product.sale_price),
                            "USD"
                          )}
                        </span>
                      ) : (
                        <span className="font-medium text-slate-700">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">
                        {formatCurrency(parseFloat(product.cost_price), "USD")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">
                        {new Date(product.created_at).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-4 justify-end">
                        <Link href={`/admin/products/${product.slug}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <Link
                          target={"_blank"}
                          href={`/products/${product.slug}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {pagination && pagination.total > 0 && (
          <div className="flex items-center justify-between mt-4 px-4 sm:px-0">
            <p className="text-xs sm:text-sm text-slate-600">
              Showing {pagination.from} to {pagination.to} of {pagination.total}{" "}
              products
              {currentSearch && (
                <span className="ml-2 text-slate-500">
                  for "<span className="font-medium">{currentSearch}</span>"
                </span>
              )}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-3 text-sm">
                Page {pagination.current_page} of {pagination.last_page}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
              >
                Nextd
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
