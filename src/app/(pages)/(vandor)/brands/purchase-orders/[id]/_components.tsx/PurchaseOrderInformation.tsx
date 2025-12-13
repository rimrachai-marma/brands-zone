import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseOrder } from "@/types";
import { formatDate } from "@/utils/formaters";

interface Props {
  purchaseOrder: PurchaseOrder;
}

const PurchaseOrderInformation: React.FC<Props> = ({ purchaseOrder }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Purchase Order Information</CardTitle>
          {/* <Badge variant="outline" className="text-sm">
            Active
          </Badge> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              PO Number
            </p>
            <p className="text-lg font-semibold mt-1">
              {purchaseOrder.po_number}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Order Date
            </p>
            <p className="text-lg font-semibold mt-1">
              {formatDate(purchaseOrder.order_date)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Created Date
            </p>
            <p className="text-lg font-semibold mt-1">
              {formatDate(purchaseOrder.created_at)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderInformation;
