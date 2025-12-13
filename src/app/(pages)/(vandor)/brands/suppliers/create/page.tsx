import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Form from "./_components/form";
import Link from "next/link";

export default function CreateSupplierPage() {
  return (
    <div className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/vendor/suppliers">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Add New Supplier
            </h1>
            <p className="text-slate-500 mt-1">Create a new supplier profile</p>
          </div>
        </div>

        <Form />
      </div>
    </div>
  );
}
