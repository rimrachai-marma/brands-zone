"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail } from "lucide-react";

export default function VendorCustomersPage() {
  const customers = [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      orders: 12,
      spent: "$1,450.00",
      lastOrder: "2 days ago",
    },
    {
      id: 2,
      name: "Noah Williams",
      email: "noah.williams@email.com",
      orders: 8,
      spent: "$890.00",
      lastOrder: "1 week ago",
    },
    {
      id: 3,
      name: "Emma Brown",
      email: "emma.brown@email.com",
      orders: 15,
      spent: "$2,120.00",
      lastOrder: "3 days ago",
    },
    {
      id: 4,
      name: "Liam Jones",
      email: "liam.jones@email.com",
      orders: 6,
      spent: "$560.00",
      lastOrder: "5 days ago",
    },
    {
      id: 5,
      name: "Ava Davis",
      email: "ava.davis@email.com",
      orders: 4,
      spent: "$380.00",
      lastOrder: "2 weeks ago",
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-500 mt-1">
            Manage your customer relationships
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Customers</CardTitle>
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
                      Last Order
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
                      <td className="py-3 px-4 text-slate-500">
                        {customer.lastOrder}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
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
