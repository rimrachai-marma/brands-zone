"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  TableHeader as ShadcnTableHead,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const TableHeader: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || undefined;
  const currentOrder = searchParams.get("order") || undefined;

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentSort === field) {
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      params.set("order", newOrder);
    } else {
      params.set("sort", field);
      params.set("order", "asc");
    }

    router.push(`?${params.toString()}`);
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) return <ArrowUpDown className="h-4 w-4" />;

    return currentOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <ShadcnTableHead>
      <TableRow>
        <TableHead>PO Number</TableHead>
        <TableHead>Supplier</TableHead>
        <TableHead>
          <div className="inline-flex items-center gap-0.5">
            Order Date
            <Button
              variant="ghost"
              size="icon-sm"
              className="hover:bg-transparent"
              onClick={() => handleSort("ordered")}
            >
              {getSortIcon("ordered")}
            </Button>
          </div>
        </TableHead>
        <TableHead>Items</TableHead>
        <TableHead>Total Amount</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </ShadcnTableHead>
  );
};

export default TableHeader;
