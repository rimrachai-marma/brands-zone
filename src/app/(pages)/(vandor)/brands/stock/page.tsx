import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductList from "./_components/product-list";
import SearchTableData from "@/components/shared/SearchTableData";
import { getProducts } from "@/lib/actions/products";
import { getInventoryProducts } from "@/lib/actions/inventory";

export default async function Page(props: {
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

  const result = await getInventoryProducts(query);

  console.log(result);

  return (
    <main className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Inventory Management
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Manage products, variants, and stock levels
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl">
                Product Inventory
              </CardTitle>
              <SearchTableData placeholder="Search" />
            </div>
          </CardHeader>

          <CardContent className="p-0 sm:p-6">
            <ProductList products={result.data?.products ?? []} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
