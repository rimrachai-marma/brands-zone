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
import { ProductDamage, ProductDamageItem } from "@/types/product-loss-damage";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  productDamages: ProductDamage[];
}

const ProductDamageList: React.FC<Props> = ({ productDamages }) => {
  const getDamageTypeBadgeClass = (type: string) => {
    const classes: Record<string, string> = {
      physical: "bg-red-100 text-red-800 hover:bg-red-100",
      water: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      fire: "bg-red-100 text-red-800 hover:bg-red-100",
      expired: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      manufacturing_defect:
        "bg-orange-100 text-orange-800 hover:bg-orange-100 border border-orange-300",
      other:
        "bg-gray-100 text-gray-800 hover:bg-gray-100 border border-gray-300",
    };
    return classes[type] || "bg-blue-100 text-blue-800 hover:bg-blue-100";
  };

  const formatDamageType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const calculateTotalLoss = (items: ProductDamageItem[]) => {
    return items.reduce(
      (sum, item) => sum + item.quantity * parseFloat(item.unit_cost),
      0
    );
  };

  const calculateTotalQuantity = (items: ProductDamageItem[]) => {
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
          <CardTitle>Loss & Damage Records</CardTitle>
          <SearchTableData placeholder="Search by Damage ID" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Damage Number</TableHead>
                <TableHead>Damage Date</TableHead>
                <TableHead>Damage Type</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Qty</TableHead>
                <TableHead className="text-right">Total Loss</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productDamages.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground py-8"
                  >
                    No damage records found
                  </TableCell>
                </TableRow>
              ) : (
                productDamages.map((damage) => (
                  <TableRow key={damage.id}>
                    <TableCell className="font-medium">
                      <Button
                        asChild
                        variant="link"
                        className="px-0 text-blue-500"
                      >
                        <Link href={`/brands/losses-damages/${damage.id}`}>
                          {damage.damage_number}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>{formatDate(damage.damage_date)}</TableCell>
                    <TableCell>
                      <Badge
                        className={getDamageTypeBadgeClass(damage.damage_type)}
                      >
                        {formatDamageType(damage.damage_type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {damage.items.length} item
                        {damage.items.length !== 1 ? "s" : ""}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {calculateTotalQuantity(damage.items)} units
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium text-destructive">
                      ${calculateTotalLoss(damage.items).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {damage.description ? (
                        <span className="text-sm text-muted-foreground truncate max-w-xs block">
                          {damage.description}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
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

export default ProductDamageList;
