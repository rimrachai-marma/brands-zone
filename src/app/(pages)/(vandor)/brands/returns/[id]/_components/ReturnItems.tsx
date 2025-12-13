import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductReturnItem } from "@/types";
import { formatCurrency } from "@/utils/formaters";

interface Props {
  items: ProductReturnItem[];
}

const ReturnItems: React.FC<Props> = ({ items }) => {
  const calculateGrandTotal = (items: ProductReturnItem[]) => {
    return items.reduce(
      (sum, item) => sum + parseFloat(item.unit_cost) * item.quantity,
      0
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Returned Items</CardTitle>
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
                <TableHead>Reason</TableHead>
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
                      {item.variant.sku || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      parseFloat(item.unit_cost),
                      item.variant.product!.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(
                      parseFloat(item.unit_cost) * item.quantity,
                      item.variant.product!.currency
                    )}
                  </TableCell>
                  <TableCell>
                    {item.reason ? (
                      <span className="text-sm text-muted-foreground text-wrap max-w-xs block">
                        {item.reason}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total Return Value:</span>
              <span> {calculateGrandTotal(items)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnItems;
