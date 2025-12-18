import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import SupplierList from "./_components/supplier-list";
import { getCurrentStocks } from "@/lib/actions/stock";

export default async function VendorSuppliersPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const keyword = searchParams?.keyword as string | undefined;
  const page = searchParams?.page as string | undefined;

  const query: Record<string, string> = {};

  if (keyword) {
    query.keyword = keyword;
  }

  if (page) {
    query.page = page;
  }

  const result = await getCurrentStocks(query);

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Current Stock</h1>
            <p className="text-slate-500 mt-1"></p>
          </div>
        </div>

        <SupplierList result={result} />
      </div>

      <pre className="hidden">{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
