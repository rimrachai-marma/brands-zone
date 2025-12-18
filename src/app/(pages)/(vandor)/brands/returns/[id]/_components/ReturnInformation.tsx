import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductReturn } from "@/types";
import { formatDate } from "@/utils/formaters";

interface Props {
  productReturn: ProductReturn;
}

const ReturnInformation: React.FC<Props> = ({ productReturn }) => {
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

  const calculateTotalQuantity = () => {
    return productReturn.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Return Information</CardTitle>
          <Badge className={getReasonBadgeClass(productReturn.reason)}>
            {formatReasonText(productReturn.reason)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Return Number
            </p>
            <p className="text-lg font-semibold mt-1">
              {productReturn.return_number}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Return Date
            </p>
            <p className="text-lg font-semibold mt-1">
              {formatDate(productReturn.return_date)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Purchase Order
            </p>
            <p className="text-lg font-semibold mt-1">
              {productReturn.purchase_order?.po_number || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Supplier
            </p>
            <p className="text-lg font-semibold mt-1">
              {productReturn.supplier?.company_name}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {productReturn.supplier?.email}
            </p>

            <p className="text-sm text-muted-foreground">
              {productReturn.supplier?.phone}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Items
            </p>
            <p className="text-lg font-semibold mt-1">
              {productReturn.items.length} items
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Quantity
            </p>
            <p className="text-lg font-semibold mt-1">
              {calculateTotalQuantity()} units
            </p>
          </div>
        </div>
        {productReturn.notes && (
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Notes
            </p>
            <p className="text-sm">{productReturn.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReturnInformation;
