import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStockStatus } from "../_lib/utils";
import { formatCurrency } from "@/utils/formaters";
import { cn } from "@/lib/utils";
import { InventoryProduct } from "@/types/inventory";
import {
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";

interface Props {
  product: InventoryProduct;
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
              <TableHead className="whitespace-nowrap">Purchase</TableHead>
              <TableHead className="whitespace-nowrap">Sales</TableHead>
              <TableHead className="whitespace-nowrap">Returns</TableHead>
              <TableHead className="whitespace-nowrap">Damage</TableHead>
              <TableHead className="whitespace-nowrap">Stock</TableHead>
              <TableHead className="whitespace-nowrap">Available</TableHead>
              <TableHead className="whitespace-nowrap">Value</TableHead>
              <TableHead className="whitespace-nowrap">Weight</TableHead>
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

                  <TableCell className="font-semibold text-green-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span>{variant.purchase_stats.total_quantity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-blue-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <ShoppingCart className="h-3 w-3 text-blue-600" />
                      <span>{variant.sales_stats.total_quantity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-orange-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-orange-600" />
                      <span>{variant.return_stats.total_quantity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-red-700 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <XCircle className="h-3 w-3 text-red-600" />
                      <span className="text-sm font-medium">
                        {variant.damage_stats.total_quantity}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">
                        {variant.inventory?.quantity_in_stock ?? 0}
                      </span>
                      <>
                        <span className="text-xs text-amber-600">
                          Reserved:
                        </span>
                        <span className="text-sm font-medium text-amber-600">
                          {variant.inventory?.reserved_quantity ?? 0}
                        </span>
                      </>
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                    {(variant.inventory?.quantity_in_stock ?? 0) -
                      (variant.inventory?.reserved_quantity ?? 0)}
                  </TableCell>

                  <TableCell className="font-semibold text-slate-900 whitespace-nowrap">
                    {formatCurrency(
                      Number(variant.sale_price ?? variant.price) *
                        (variant.inventory?.quantity_in_stock ?? 0),
                      product.currency
                    )}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-slate-700">
                    {variant.weight ? (
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {variant.weight}
                        {variant.weight_unit}
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
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
