import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import Link from "next/link";

interface Props {
  result: any;
}

const SupplierList: React.FC<Props> = ({ result }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Stocks</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search product..." className="pl-10" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Product Code</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Opening</TableHead>
                <TableHead>Purchase</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Return</TableHead>
                <TableHead>Damage</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.data.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <Button
                      asChild
                      variant="link"
                      className="px-0 text-blue-500"
                    >
                      <Link href={`/brands/products/${p.id}`}>{p.id}</Link>
                    </Button>
                  </TableCell>
                  <TableCell>{p.product_name}</TableCell>
                  <TableCell>{p.opening_qty}</TableCell>
                  <TableCell>{p.purchase_qty}</TableCell>
                  <TableCell>{p.sales_qty}</TableCell>
                  <TableCell>{p.return_qty}</TableCell>
                  <TableCell>{p.damage_qty}</TableCell>
                  <TableCell>{p.balance_qty}</TableCell>
                  <TableCell>{p.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierList;
