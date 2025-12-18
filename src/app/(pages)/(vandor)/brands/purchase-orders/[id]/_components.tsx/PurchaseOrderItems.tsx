import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PurchaseOrderItem } from "@/types";
import { formatCurrency } from "@/utils/formaters";

interface Props {
  items: PurchaseOrderItem[];
  totalAmount: string;
}

const PurchaseOrderItems: React.FC<Props> = ({ items, totalAmount }) => {
  const subtotal = (items: PurchaseOrderItem[]) => {
    return items.reduce(
      (sum, item) => sum + parseFloat(item.unit_cost) * item.quantity,
      0
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.variant.product?.name}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {item.variant.sku}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      parseFloat(item.unit_cost),
                      item.variant.product!.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(
                      item.quantity * parseFloat(item.unit_cost),
                      item.variant.product!.currency
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">
                {formatCurrency(subtotal(items), "USD")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax:</span>
              <span className="font-medium">{formatCurrency(0, "USD")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping:</span>
              <span className="font-medium">{formatCurrency(0, "USD")}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total Amount:</span>
              <span className="text-green-600">
                {formatCurrency(parseFloat(totalAmount), "USD")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderItems;
