import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProducrReturnList from "./_components/product-return-list";
import { getProductReturns } from "@/lib/actions/inventory";

export default async function VendorproductReturnsPage(props: {
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

  const result = await getProductReturns(query);

  return (
    <div className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Returns</h1>
            <p className="text-slate-500 mt-1">
              Your product returns to suppliers
            </p>
          </div>
          <Button asChild>
            <Link href="/brands/returns/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Returns
            </Link>
          </Button>
        </div>

        <ProducrReturnList
          product_returns={result.data?.product_returns || []}
        />
      </div>
    </div>
  );
}
