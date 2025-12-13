import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types";
import { getStockStatus } from "../_lib/utils";
import { formatCurrency } from "@/utils/formaters";
import { cn } from "@/lib/utils";

interface Props {
  product: Omit<Product, "reviews">;
}
const ProductVariants: React.FC<Props> = ({ product }) => {
  return (
    <div className="border-t bg-slate-50">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="whitespace-nowrap">SKU</TableHead>
              <TableHead className="whitespace-nowrap">Attributes</TableHead>
              <TableHead className="whitespace-nowrap">Barcode</TableHead>
              <TableHead className="whitespace-nowrap">Price</TableHead>
              <TableHead className="whitespace-nowrap">Sale Price</TableHead>
              <TableHead className="whitespace-nowrap">Stock</TableHead>
              <TableHead className="whitespace-nowrap text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.variants.map((variant) => {
              const variantStatus = getStockStatus(
                variant.inventory?.quantity_in_stock ?? 0,
                product.low_stock_threshold
              );

              return (
                <TableRow key={variant.id} className="hover:bg-white">
                  <TableCell className="font-mono text-xs sm:text-sm text-slate-900 whitespace-nowrap">
                    {variant.sku}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(variant.attributes).map(
                        ([key, value]) => (
                          <Badge
                            key={key}
                            variant="outline"
                            className="text-xs whitespace-nowrap capitalize"
                          >
                            {key}: {value}
                          </Badge>
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600 whitespace-nowrap">
                    {variant.barcode}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(Number(variant.price), product.currency)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {variant.sale_price ? (
                      <span className="font-medium text-green-600">
                        {formatCurrency(
                          Number(variant.sale_price),
                          product.currency
                        )}
                      </span>
                    ) : (
                      <span className="font-medium text-slate-700">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                    {variant.inventory?.quantity_in_stock ?? 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={cn(
                        "text-xs whitespace-nowrap",
                        variantStatus === "In Stock" &&
                          "bg-green-100 text-green-800",
                        variantStatus === "Low Stock" &&
                          "bg-yellow-100 text-yellow-800",
                        variantStatus === "Out of Stock" &&
                          "bg-red-100 text-red-800"
                      )}
                    >
                      {variantStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductVariants;
