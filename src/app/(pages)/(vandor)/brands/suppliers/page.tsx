import SupplierList from "./_components/supplier-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getSuppliers } from "@/lib/actions/supplier";
import Link from "next/link";

export default async function VendorSuppliersPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const keyword = searchParams?.keyword as string | undefined;
  const page = searchParams?.page as string | undefined;

  const query: Record<string, string> = {};

  if (keyword) {
    query.keyword = keyword;
  }

  if (page) {
    query.page = page;
  }

  const result = await getSuppliers(query);

  return (
    <div className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Suppliers</h1>
            <p className="text-slate-500 mt-1">
              Manage your supplier relationships
            </p>
          </div>
          <Button asChild>
            <Link href="/brands/suppliers/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Link>
          </Button>
        </div>

        <SupplierList suppliers={result?.data?.suppliers || []} />
      </div>
    </div>
  );
}
