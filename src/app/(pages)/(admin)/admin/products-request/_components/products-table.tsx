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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formaters";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {ProductRequest,ProductRequestPagination} from "@/types/admin"
import {approveProduct, getProductRequests} from "@/lib/actions/admin/products";
import { toast } from "react-hot-toast";
import {Switch} from "@/components/ui/switch";

interface Props {
  products: ProductRequest[];
  pagination?: ProductRequestPagination;
}

export const ProductsTable: React.FC<Props> = ({ products, pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const query: Record<string, string> = {};
  // Get current filters from URL
  const currentSearch = searchParams.get("keyword") || "";
  const currentStatus = searchParams.get("status") || "all";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("keyword", value);
      params.set("page", "1");
    } else {
      params.delete("keyword");
    }

    router.push(`?${params.toString()}`);
  };

  const handleStatusFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("status", value);
      params.set("page", "1");
    } else {
      params.delete("status");
    }

    router.push(`?${params.toString()}`);
  };

  const handleApprove = async (productId: string) => {
    setLoadingId(productId);
    try {
      const result = await approveProduct(productId);
      console.log(result);
      if (result.status === "success") {
        toast.success(result.message || "Product approved successfully");
        await getProductRequests(query);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to approve product");
      }
    } catch (error:any) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingId(null);
    }
  };


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
              <CardTitle className="text-lg sm:text-xl">Product Requests</CardTitle>


            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                  placeholder="Search products..."
                  className="pl-10 w-full"
                  value={currentSearch}
                  onChange={(e) => handleSearch(e.target.value)}
              />
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
                        No product requests found
                      </TableCell>
                    </TableRow>
                ) : (
                    products.map((product) => {
                      const isProcessing = loadingId === product.id;

                      return (
                          <TableRow key={product.id}>
                            <TableCell>
                              <AspectRatio ratio={1} className="bg-slate-100 rounded-md">
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
                            {formatCurrency(parseFloat(product.sale_price), "USD")}
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
                            <TableCell>
                              {getStatusBadge(product.status)}
                            </TableCell>
                            <TableCell className="text-right">
                              {isProcessing ? (
                                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                              ) : product.status === "draft" ? (
                                  <div className="flex items-center justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                                        onClick={() => handleApprove(product.id)}
                                        disabled={isProcessing}
                                    >
                                      Approve
                                      <Switch className={'w-8 h-4'} id={'approve'}/>
                                    </Button>
                                  </div>
                              ) : (
                                 <div></div>
                              )}
                            </TableCell>
                          </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </div>

          {pagination && (
              <div className="flex items-center justify-between mt-4 px-4 sm:px-0">
                <p className="text-xs sm:text-sm text-slate-600">
                  Showing {pagination.from} to {pagination.to} of {pagination.total} products
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
                    Next
                  </Button>
                </div>
              </div>
          )}
        </CardContent>
      </Card>
  );
};