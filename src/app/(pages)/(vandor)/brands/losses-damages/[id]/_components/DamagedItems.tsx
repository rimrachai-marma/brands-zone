import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductDamageItem } from "@/types/product-loss-damage";
import { formatCurrency } from "@/utils/formaters";

interface Props {
  items: ProductDamageItem[];
}

const DamagedItems: React.FC<Props> = ({ items }) => {
  const calculateGrandTotal = (items: ProductDamageItem[]) => {
    return items.reduce(
      (sum, item) => sum + parseFloat(item.unit_cost) * item.quantity,
      0
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Damaged Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-center">Quantity Lost</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead className="text-right">Total Loss</TableHead>
                <TableHead>Condition Notes</TableHead>
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
                  <TableCell className="text-center font-medium">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      parseFloat(item.unit_cost),
                      item.variant.product!.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium text-destructive">
                    {formatCurrency(
                      parseFloat(item.unit_cost) * item.quantity,
                      item.variant.product!.currency
                    )}
                  </TableCell>
                  <TableCell>
                    {item.condition_notes ? (
                      <span className="text-sm text-muted-foreground text-wrap max-w-xs block">
                        {item.condition_notes}
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

        {/* Loss Summary */}
        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-destructive">
              <span className="text-destructive">Total Financial Loss:</span>
              <span className="text-destructive">
                <span> {calculateGrandTotal(items)}</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-right pt-2">
              * This represents the cost value of damaged inventory
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default DamagedItems;
