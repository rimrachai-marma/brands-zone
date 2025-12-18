"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Navbar } from "@/components/shared/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical } from "lucide-react";

export default function CustomersPage() {
  const customers = [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      orders: 24,
      spent: "$3,450.00",
      status: "Active",
      joined: "Jan 2024",
    },
    {
      id: 2,
      name: "Noah Williams",
      email: "noah.williams@email.com",
      orders: 18,
      spent: "$2,890.00",
      status: "Active",
      joined: "Feb 2024",
    },
    {
      id: 3,
      name: "Emma Brown",
      email: "emma.brown@email.com",
      orders: 32,
      spent: "$4,120.00",
      status: "Active",
      joined: "Jan 2024",
    },
    {
      id: 4,
      name: "Liam Jones",
      email: "liam.jones@email.com",
      orders: 12,
      spent: "$1,560.00",
      status: "Active",
      joined: "Mar 2024",
    },
    {
      id: 5,
      name: "Ava Davis",
      email: "ava.davis@email.com",
      orders: 8,
      spent: "$980.00",
      status: "Inactive",
      joined: "Apr 2024",
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 mt-1">Manage all platform customers</p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Customers</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search customers..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Orders
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Total Spent
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Joined
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {customer.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {customer.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-900">
                        {customer.orders}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {customer.spent}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            customer.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {customer.joined}
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
