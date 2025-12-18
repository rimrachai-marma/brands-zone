import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import PurchaseOrderList from "./_components/purchase-order-list";
import { getPurchaseOrders } from "@/lib/actions/inventory";
import SearchTableData from "@/components/shared/SearchTableData";
import Link from "next/link";

interface Props {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PurchaseOrdersPage(props: Props) {
  const searchParams = await props.searchParams;

  const keyword = searchParams?.keyword as string | undefined;
  const page = searchParams?.page as string | undefined;
  const sort = searchParams?.sort as string | undefined;
  const order = searchParams?.order as string | undefined;

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

  const result = await getPurchaseOrders(query);

  return (
    <main className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Purchase Orders
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and track your inventory purchase orders
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/brands/purchase-orders/create">
              <Plus className="h-4 w-4 mr-2" />
              <span>Create Purchase Order</span>
            </Link>
          </Button>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>All Purchase Orders</CardTitle>
              <SearchTableData placeholder="Search by PO or supplier..." />
            </div>
          </CardHeader>
          <CardContent>
            <PurchaseOrderList
              purchaseOrders={result.data?.purchase_orders || []}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

{
  /* Summary Cards */
}
{
  /* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {totalOrders}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {formatCurrency(totalValue.toString())}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {totalItems}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */
}
