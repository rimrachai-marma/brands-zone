"use client";

import React, { useState, useEffect } from "react";
import { ProductsTable } from "./_components/products-table";
import { getProductRequests } from "@/lib/actions/admin/products";
import { ProductRequest, ProductRequestPagination } from "@/types/admin";
import { useSearchParams, useRouter } from "next/navigation";

export default function VendorProductsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductRequest[]>([]);
  const [pagination, setPagination] = useState<ProductRequestPagination | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current params from URL
  const currentKeyword = searchParams.get("keyword") || "";
  const currentPage = searchParams.get("page") || "1";
  const currentLimit = searchParams.get("limit") || "10";
  const status = searchParams.get("status") || "published";
  // Fetch products when URL params change
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const query: Record<string, string> = {};

        if (currentKeyword) {
          query.keyword = currentKeyword;
        }

        if (currentPage) {
          query.page = currentPage;
        }
        if (status) {
          query.status = status;
        }

        if (currentLimit) {
          query.limit = currentLimit;
        }

        console.log("Fetching with query:", query);

        const result = await getProductRequests(query);
        console.log(result);
        if (result) {
          setProducts(result.data || []);
          setPagination(result.pagination);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("An error occurred while fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentKeyword, currentPage, currentLimit]);


  // if (isLoading) {
  //   return (
  //       <div className="max-w-7xl mx-auto space-y-8">
  //         <div className="flex justify-between items-end">
  //           <div>
  //             <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
  //             <p className="text-slate-500 mt-1">Review And Manage All Products</p>
  //           </div>
  //         </div>
  //         <div className="animate-pulse space-y-4">
  //           <div className="h-12 bg-slate-200 rounded"></div>
  //           <div className="h-64 bg-slate-200 rounded"></div>
  //         </div>
  //       </div>
  //   );
  // }

  if (error) {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
              <p className="text-slate-500 mt-1">Review And Manage All Products</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
            <p className="text-slate-500 mt-1">Review And Manage All Products</p>
          </div>
        </div>

        <ProductsTable
            products={products}
            pagination={pagination}
            // Pass handlers if needed, or modify ProductsTable to read from URL
        />
      </div>
  );
}