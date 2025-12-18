"use client";

import React from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import Image from "next/image";

import { getLowestByOriginalPrice } from "@/utils/get-lowest-by-original-price";
import { formatCurrency } from "@/utils/formaters";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types";

interface Props {
  products: Omit<Product, "user" | "reviews">[];
}

export const ProductsTable: React.FC<Props> = ({ products }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current sort and order from URL
  const currentSort = searchParams.get("sort") || undefined;
  const currentOrder = searchParams.get("order") || undefined;
  const currentSearch = searchParams.get("keyword") || "";
  const currentBrand = searchParams.get("brands") || "all";
  const currentStatus = searchParams.get("status") || "all";

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Toggle order if clicking the same field, otherwise default to asc
    if (currentSort === field) {
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      params.set("order", newOrder);
    } else {
      params.set("sort", field);
      params.set("order", "asc");
    }

    params.set("sort", field);
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("keyword", value);
    } else {
      params.delete("keyword");
    }

    router.push(`?${params.toString()}`);
  };

  const handleBrandFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("brands", value);
    } else {
      params.delete("brands");
    }

    router.push(`?${params.toString()}`);
  };

  const handleStatusFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    router.push(`?${params.toString()}`);
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) return <ArrowUpDown className="h-4 w-4" />;

    return currentOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return null;

  // return (
  //   <Card>
  //     <CardHeader className="pb-4">
  //       <div className="space-y-4">
  //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  //           <CardTitle className="text-lg sm:text-xl">All Products</CardTitle>

  //           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
  //             <Select value={currentBrand} onValueChange={handleBrandFilter}>
  //               <SelectTrigger className="w-full sm:w-36">
  //                 <SelectValue placeholder="All Brands" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="all">All Brands</SelectItem>
  //                 <SelectItem value="apple">Apple</SelectItem>
  //                 <SelectItem value="google">Google</SelectItem>
  //               </SelectContent>
  //             </Select>

  //             <Select value={currentStatus} onValueChange={handleStatusFilter}>
  //               <SelectTrigger className="w-full sm:w-36">
  //                 <SelectValue placeholder="All Status" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 <SelectItem value="all">All Status</SelectItem>
  //                 <SelectItem value="published">Published</SelectItem>
  //                 <SelectItem value="archived">Archived</SelectItem>
  //                 <SelectItem value="draft">Draft</SelectItem>
  //               </SelectContent>
  //             </Select>
  //           </div>
  //         </div>

  //         <div className="relative">
  //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
  //           <Input
  //             placeholder="Search products..."
  //             className="pl-10 w-full"
  //             value={currentSearch}
  //             onChange={(e) => handleSearch(e.target.value)}
  //           />
  //         </div>
  //       </div>
  //     </CardHeader>

  //     <CardContent>
  //       <div className="rounded-md border">
  //         <Table>
  //           <TableHeader>
  //             <TableRow>
  //               <TableHead className="min-w-24 whitespace-nowrap">
  //                 Image
  //               </TableHead>
  //               <TableHead className="min-w-[200px] whitespace-nowrap">
  //                 Product
  //               </TableHead>
  //               <TableHead className="whitespace-nowrap">Owner</TableHead>
  //               <TableHead className="whitespace-nowrap">Brand</TableHead>
  //               <TableHead className="min-w-[150px] whitespace-nowrap">
  //                 Campaign
  //               </TableHead>
  //               <TableHead className="whitespace-nowrap">
  //                 <div className="flex items-center gap-1">
  //                   Price
  //                   <Button
  //                     variant="ghost"
  //                     size="icon-sm"
  //                     className="hover:bg-transparent"
  //                     onClick={() => handleSort("price")}
  //                   >
  //                     {getSortIcon("price")}
  //                   </Button>
  //                 </div>
  //               </TableHead>
  //               <TableHead className="whitespace-nowrap">Sale Price</TableHead>
  //               <TableHead className="whitespace-nowrap">Cost Price</TableHead>
  //               <TableHead className="whitespace-nowrap">
  //                 <div className="flex items-center gap-1">
  //                   Stock
  //                   <Button
  //                     variant="ghost"
  //                     size="icon-sm"
  //                     className="hover:bg-transparent"
  //                     onClick={() => handleSort("stock")}
  //                   >
  //                     {getSortIcon("stock")}
  //                   </Button>
  //                 </div>
  //               </TableHead>
  //               <TableHead className="whitespace-nowrap">
  //                 <div className="flex items-center gap-1">
  //                   Created
  //                   <Button
  //                     variant="ghost"
  //                     size="icon-sm"
  //                     className="hover:bg-transparent"
  //                     onClick={() => handleSort("created")}
  //                   >
  //                     {getSortIcon("created_at")}
  //                   </Button>
  //                 </div>
  //               </TableHead>
  //               <TableHead className="whitespace-nowrap">Status</TableHead>
  //               <TableHead className="text-right whitespace-nowrap">
  //                 Actions
  //               </TableHead>
  //             </TableRow>
  //           </TableHeader>
  //           <TableBody>
  //             {products.length < 1 ? (
  //               <TableRow>
  //                 <TableCell
  //                   colSpan={12}
  //                   className="text-center py-8 text-slate-500"
  //                 >
  //                   No products found
  //                 </TableCell>
  //               </TableRow>
  //             ) : (
  //               products.map((product) => {
  //                 const lowestByOriginalPrice = getLowestByOriginalPrice(
  //                   product.variants
  //                 );

  //                 const totalStock = product.variants.reduce(
  //                   (total, v) => total + v.stock_quantity,
  //                   0
  //                 );

  //                 return (
  //                   <TableRow key={product.id}>
  //                     <TableCell>
  //                       <AspectRatio>
  //                         <Image
  //                           src={primaryImage?.url}
  //                           alt={primaryImage?.alt_text}
  //                           fill
  //                           className="w-full h-full object-cover rounded-md border"
  //                         />
  //                       </AspectRatio>
  //                     </TableCell>
  //                     <TableCell>
  //                       <div className="space-y-1">
  //                         <div className="font-medium text-slate-900 max-w-[200px] truncate">
  //                           {product.name}
  //                         </div>
  //                         <Badge variant="outline" className="text-xs">
  //                           {product.variants.length} variants
  //                         </Badge>
  //                       </div>
  //                     </TableCell>
  //                     <TableCell>
  //                       {product.vandor ? (
  //                         <span className="font-medium text-sm text-slate-900 whitespace-nowrap">
  //                           Store Owner
  //                         </span>
  //                       ) : (
  //                         <Badge variant="outline" className="text-xs">
  //                           Platform
  //                         </Badge>
  //                       )}
  //                     </TableCell>
  //                     <TableCell>
  //                       <div className="font-medium text-slate-700 whitespace-nowrap">
  //                         {product.brand?.name ?? "—"}
  //                       </div>
  //                     </TableCell>
  //                     <TableCell>
  //                       {product.campaign ? (
  //                         <div className="space-y-1">
  //                           <div className="text-sm font-medium text-slate-900 max-w-[150px] truncate">
  //                             {product.campaign.name}
  //                           </div>
  //                           <Badge
  //                             variant="default"
  //                             className="text-xs bg-orange-500"
  //                           >
  //                             {product.campaign.discount_percentage}% OFF
  //                           </Badge>
  //                         </div>
  //                       ) : (
  //                         <span className="text-sm text-slate-400">—</span>
  //                       )}
  //                     </TableCell>
  //                     <TableCell>
  //                       <span className="font-semibold text-slate-900 whitespace-nowrap">
  //                         {formatCurrency(lowestByOriginalPrice.price, "USD")}
  //                       </span>
  //                     </TableCell>
  //                     <TableCell>
  //                       {lowestByOriginalPrice.sale_price ? (
  //                         <span className="font-medium text-green-600 whitespace-nowrap">
  //                           {formatCurrency(
  //                             lowestByOriginalPrice.sale_price,
  //                             "USD"
  //                           )}
  //                         </span>
  //                       ) : (
  //                         <span className="font-medium text-slate-700">—</span>
  //                       )}
  //                     </TableCell>
  //                     <TableCell>
  //                       <span className="text-sm text-slate-600 whitespace-nowrap">
  //                         {formatCurrency(
  //                           lowestByOriginalPrice.cost_price,
  //                           "USD"
  //                         )}
  //                       </span>
  //                     </TableCell>
  //                     <TableCell>
  //                       <div className="space-y-1">
  //                         <div className="font-medium text-slate-900">
  //                           {totalStock}
  //                         </div>

  //                         <Badge
  //                           variant={
  //                             totalStock < 1
  //                               ? "destructive"
  //                               : totalStock <= product.low_stock_threshold
  //                               ? "secondary"
  //                               : "default"
  //                           }
  //                           className="text-xs whitespace-nowrap"
  //                         >
  //                           {totalStock < 1
  //                             ? "Out of Stock"
  //                             : totalStock <= product.low_stock_threshold
  //                             ? "Low Stock"
  //                             : "In Stock"}
  //                         </Badge>
  //                       </div>
  //                     </TableCell>
  //                     <TableCell>
  //                       <span className="text-sm text-slate-600 whitespace-nowrap">
  //                         {new Date(product.created_at).toLocaleDateString()}
  //                       </span>
  //                     </TableCell>
  //                     <TableCell>
  //                       <Badge
  //                         variant={
  //                           product.status === "published"
  //                             ? "default"
  //                             : "secondary"
  //                         }
  //                       >
  //                         <span className="capitalize">{product.status}</span>
  //                       </Badge>
  //                     </TableCell>
  //                     <TableCell className="text-right">
  //                       <DropdownMenu>
  //                         <DropdownMenuTrigger asChild>
  //                           <Button variant="ghost" size="icon">
  //                             <MoreVertical className="h-4 w-4" />
  //                           </Button>
  //                         </DropdownMenuTrigger>
  //                         <DropdownMenuContent align="end" className="rounded">
  //                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //                           <DropdownMenuSeparator />
  //                           <DropdownMenuItem>
  //                             <Eye className="h-4 w-4" />
  //                             <span>View Details</span>
  //                           </DropdownMenuItem>
  //                           <DropdownMenuItem>
  //                             <Edit className="h-4 w-4" />
  //                             <span>Edit Product</span>
  //                           </DropdownMenuItem>
  //                           <DropdownMenuSeparator />
  //                           <DropdownMenuItem className="text-red-600">
  //                             <Trash2 className="h-4 w-4" />
  //                             <span>Delete</span>
  //                           </DropdownMenuItem>
  //                         </DropdownMenuContent>
  //                       </DropdownMenu>
  //                     </TableCell>
  //                   </TableRow>
  //                 );
  //               })
  //             )}
  //           </TableBody>
  //         </Table>
  //       </div>

  //       <div className="flex items-center justify-between mt-4 px-4 sm:px-0">
  //         <p className="text-xs sm:text-sm text-slate-600">
  //           Showing {products.length} of {100} products
  //         </p>
  //         <div>Pagination</div>
  //       </div>
  //     </CardContent>
  //   </Card>
  // );
};
