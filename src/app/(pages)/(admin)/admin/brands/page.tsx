"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BrandsPage() {
  const brands = [
    { id: 1, name: "Samsung", products: 234, status: "Active", vendors: 12 },
    { id: 2, name: "Nike", products: 456, status: "Active", vendors: 18 },
    { id: 3, name: "Apple", products: 189, status: "Active", vendors: 8 },
    { id: 4, name: "Adidas", products: 312, status: "Active", vendors: 15 },
    { id: 5, name: "Sony", products: 178, status: "Active", vendors: 10 },
    { id: 6, name: "Dell", products: 145, status: "Active", vendors: 9 },
    { id: 7, name: "Puma", products: 267, status: "Active", vendors: 14 },
    { id: 8, name: "HP", products: 198, status: "Inactive", vendors: 7 },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Brands</h1>
            <p className="text-slate-500 mt-1">Manage product brands</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Brand
          </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Brands</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search brands..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Brand Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Products
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Vendors
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
                  {brands.map((brand) => (
                    <tr
                      key={brand.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {brand.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {brand.products}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {brand.vendors}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            brand.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {brand.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
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
