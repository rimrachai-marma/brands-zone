"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";

export default function VendorInvoicesPage() {
  const invoices = [
    { id: "INV-001", date: "Nov 1, 2025", amount: "$2,450.00", status: "Paid" },
    { id: "INV-002", date: "Oct 1, 2025", amount: "$2,120.50", status: "Paid" },
    { id: "INV-003", date: "Sep 1, 2025", amount: "$1,890.25", status: "Paid" },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
          <p className="text-slate-500 mt-1">View and download your invoices</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Invoice ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {invoice.id}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {invoice.date}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {invoice.amount}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="default">{invoice.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
