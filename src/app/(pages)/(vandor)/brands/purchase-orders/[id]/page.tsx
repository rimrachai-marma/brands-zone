import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Printer, Download } from "lucide-react";
import Link from "next/link";
import { fetchPurchaseOrder } from "@/lib/actions/inventory";
import { PurchaseOrderItem } from "@/types";
import Summary from "./_components.tsx/Summary";
import { notFound } from "next/navigation";
import PurchaseOrderInformation from "./_components.tsx/PurchaseOrderInformation";
import SupplierInformation from "./_components.tsx/SupplierInformation";
import PurchaseOrderItems from "./_components.tsx/PurchaseOrderItems";
import { formatDate } from "@/utils/formaters";

export default async function VendorPurchaseOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await fetchPurchaseOrder(id);

  if (!result.data) notFound();

  const subtotal = (items: PurchaseOrderItem[]) => {
    return items.reduce(
      (sum, item) => sum + parseFloat(item.unit_cost) * item.quantity,
      0
    );
  };

  const totalQuantity = (items: PurchaseOrderItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/brands/purchase-orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Purchase Orders
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            {/* <Button variant="default" size="sm" asChild>
              <Link href={`/vendor/purchase-orders/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button> */}
          </div>
        </div>

        <Summary
          totalQuantity={totalQuantity(result.data?.purchaseOrder.items)}
          orderDate={result.data?.purchaseOrder.order_date}
          totalAmount={subtotal(result.data.purchaseOrder.items)}
        />
        <PurchaseOrderInformation purchaseOrder={result.data.purchaseOrder} />
        <SupplierInformation supplier={result.data.purchaseOrder.supplier} />

        {result.data.purchaseOrder.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {result.data.purchaseOrder.notes}
              </p>
            </CardContent>
          </Card>
        )}

        <PurchaseOrderItems
          totalAmount={result.data.purchaseOrder.total_amount}
          items={result.data.purchaseOrder.items}
        />

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-0.5 h-full bg-border"></div>
                </div>
                <div className="pb-4">
                  <p className="font-medium">Order Created</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(result.data.purchaseOrder.created_at)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Purchase order was created in the system
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                </div>
                <div>
                  <p className="font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(result.data.purchaseOrder.order_date)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Order was placed with supplier
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
