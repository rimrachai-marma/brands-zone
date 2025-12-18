"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Package } from "lucide-react";

export default function VendorOrdersPage() {
  const orders = [
    {
      id: "#ORD-3210",
      customer: "Olivia Martin",
      product: "Wireless Headphones",
      amount: "$129.99",
      status: "Processing",
      date: "Nov 10, 2025",
    },
    {
      id: "#ORD-3209",
      customer: "Noah Williams",
      product: "Smart Watch",
      amount: "$299.99",
      status: "Shipped",
      date: "Nov 10, 2025",
    },
    {
      id: "#ORD-3208",
      customer: "Emma Brown",
      product: "USB-C Charger",
      amount: "$29.99",
      status: "Delivered",
      date: "Nov 9, 2025",
    },
    {
      id: "#ORD-3207",
      customer: "Liam Jones",
      product: "Phone Case",
      amount: "$24.99",
      status: "Processing",
      date: "Nov 9, 2025",
    },
    {
      id: "#ORD-3206",
      customer: "Ava Davis",
      product: "Laptop Stand",
      amount: "$49.99",
      status: "Delivered",
      date: "Nov 8, 2025",
    },
    {
      id: "#ORD-3205",
      customer: "James Wilson",
      product: "Wireless Mouse",
      amount: "$39.99",
      status: "Shipped",
      date: "Nov 8, 2025",
    },
    {
      id: "#ORD-3204",
      customer: "Sophia Garcia",
      product: "Cable Organizer",
      amount: "$14.99",
      status: "Delivered",
      date: "Nov 7, 2025",
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-500 mt-1">Manage your store orders</p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Orders</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search orders..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Date
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
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {order.customer}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {order.product}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {order.amount}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{order.date}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === "Processing" && (
                            <Button size="sm">
                              <Package className="h-4 w-4 mr-2" />
                              Ship
                            </Button>
                          )}
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
