import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Trash2 } from "lucide-react";
import SearchTableData from "@/components/shared/SearchTableData";
import Link from "next/link";
import { ProductReturn, ProductReturnItem } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
  product_returns: ProductReturn[];
}

const ProducrReturnList: React.FC<Props> = ({ product_returns }) => {
  const getReasonBadgeClass = (reason: string) => {
    const classes: Record<string, string> = {
      defective: "bg-red-100 text-red-800 hover:bg-red-100",
      wrong_item: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      excess_stock: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      expired: "bg-red-100 text-red-800 hover:bg-red-100",
      other:
        "bg-gray-100 text-gray-800 hover:bg-gray-100 border border-gray-300",
    };
    return classes[reason] || "bg-blue-100 text-blue-800 hover:bg-blue-100";
  };

  const formatReasonText = (reason: string) => {
    return reason
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const calculateTotalAmount = (items: ProductReturnItem[]) => {
    return items.reduce(
      (sum, item) => sum + item.quantity * parseFloat(item.unit_cost),
      0
    );
  };

  const calculateTotalQuantity = (items: ProductReturnItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>All Returns</CardTitle>
          <SearchTableData placeholder="Search by Return ID" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>PO Number</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Qty</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product_returns.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground py-8"
                  >
                    No product returns found
                  </TableCell>
                </TableRow>
              ) : (
                product_returns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">
                      <Button
                        asChild
                        variant="link"
                        className="px-0 text-blue-500"
                      >
                        <Link href={`/brands/returns/${returnItem.id}`}>
                          {returnItem.return_number}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>{returnItem.supplier?.company_name}</TableCell>
                    <TableCell>
                      {returnItem.purchase_order ? (
                        <span className="text-sm">
                          {returnItem.purchase_order?.po_number}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          N/A
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(returnItem.return_date)}</TableCell>
                    <TableCell>
                      <Badge className={getReasonBadgeClass(returnItem.reason)}>
                        {formatReasonText(returnItem.reason)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {returnItem.items.length} item
                        {returnItem.items.length !== 1 ? "s" : ""}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {calculateTotalQuantity(returnItem.items)} units
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${calculateTotalAmount(returnItem.items).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2.5">
                      <Trash2 className="h-4 w-4" />
                      <Edit className="h-4 w-4" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProducrReturnList;
