import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Download,
  Eye,
  FileText,
  Calendar,
  Package,
} from "lucide-react";
import { PurchaseOrder, PurchaseOrderItem } from "@/types";
import { formatCurrency, formatDate } from "@/utils/formaters";
import { Button } from "@/components/ui/button";
import TableHeader from "./table-header";
import Link from "next/link";

interface Props {
  purchaseOrders: PurchaseOrder[];
}

const PurchaseOrderList: React.FC<Props> = ({ purchaseOrders }) => {
  const calculateItemsCount = (items: PurchaseOrderItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader />
        <TableBody>
          {purchaseOrders.length > 0 ? (
            purchaseOrders.map((po) => {
              return (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">
                    <Button
                      asChild
                      variant="link"
                      className="px-0 text-blue-500"
                    >
                      <Link href={`/brands/purchase-orders/${po.id}`}>
                        {po.po_number}
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {po.supplier.company_name}
                      </div>
                      {po.supplier.contact_person && (
                        <div className="text-sm text-slate-500">
                          {po.supplier.contact_person}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      {formatDate(po.order_date)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-slate-400" />
                      {po.items.length} ({calculateItemsCount(po.items)} units)
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(Number(po.total_amount), "USD")}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Print PO
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-slate-500"
              >
                No purchase orders found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseOrderList;
