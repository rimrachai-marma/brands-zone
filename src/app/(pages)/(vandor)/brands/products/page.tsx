import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductsTable } from "./_components/products-table";
import { getProducts } from "./_lib/actions";

export default async function VendorProductsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const keyword = searchParams?.keyword as string | undefined;
  const page = searchParams?.page as string | undefined;
  const sort = searchParams?.sort as string | undefined;
  const order = searchParams?.order as string | undefined;
  const brands = searchParams?.brands as string | undefined;
  const status = searchParams?.status as string | undefined;

  const query: Record<string, string> = {};
  if (keyword) {
    query.keyword = keyword;
  }

  if (page) {
    query.page = page;
  }

  if (sort) {
    query.sort = sort;
  }

  if (order) {
    query.order = order;
  }

  if (brands) {
    query.brands = brands;
  }

  if (status) {
    query.status = status;
  }

  const result = await getProducts(query);


    return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">Manage all platform products</p>
        </div>
        <Button asChild>
          <Link href="/vendor/products/create">
            <Plus className="h-4 w-4 mr-2" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      <ProductsTable products={result.data?.products || []} />
    </div>
  );
}
