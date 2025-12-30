import React from "react";
import { getProductRequests } from "@/lib/actions/admin/products";
import { ProductsTable } from "./_components/products-table";

export default async function VendorProductsPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;

    const keyword = searchParams?.keyword as string | undefined;
    const page = searchParams?.page as string | undefined;
    const status = searchParams?.status as string | undefined;

    const query: Record<string, string> = {};

    if (keyword) {
        query.keyword = keyword;
    }

    if (page) {
        query.page = page;
    }

    if (status && status !== 'all') {
        query.status = status;
    }

    const result = await getProductRequests(query);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Product Requests</h1>
                    <p className="text-slate-500 mt-1">Review and manage product submissions</p>
                </div>

            </div>

            <ProductsTable
                products={result.data || []}
                pagination={result.pagination}
            />
        </div>
    );
}