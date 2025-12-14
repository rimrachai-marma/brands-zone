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
              <TableHead className="whitespace-nowrap">Cost Price</TableHead>
              <TableHead className="whitespace-nowrap">Stock</TableHead>
              <TableHead className="whitespace-nowrap">Reserved</TableHead>
              <TableHead className="whitespace-nowrap">Available</TableHead>

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
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(
                          Number(variant.price),
                          product.currency
                        )}
                      </span>
                      {variant.sale_price && (
                        <>
                          <span className="text-xs text-green-600">Sale:</span>
                          <span className="text-sm font-medium text-green-600">
                            {formatCurrency(
                              Number(variant.sale_price),
                              product.currency
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(
                          Number(variant.cost_price),
                          product.currency
                        )}
                      </span>
                      <span className="text-sm text-teal-600">
                        {(() => {
                          const sellingPrice = variant.sale_price
                            ? Number(variant.sale_price)
                            : Number(variant.price);
                          const costPrice = Number(variant.cost_price);
                          const margin =
                            ((sellingPrice - costPrice) / sellingPrice) * 100;
                          return `${margin.toFixed(1)}% margin`;
                        })()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                    {variant.inventory?.quantity_in_stock ?? 0}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                    {variant.inventory?.reserved_quantity ?? 0}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                    {(variant.inventory?.quantity_in_stock ?? 0) -
                      (variant.inventory?.reserved_quantity ?? 0)}
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
