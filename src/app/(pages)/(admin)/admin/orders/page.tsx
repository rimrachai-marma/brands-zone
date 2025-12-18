"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Navbar } from "@/components/shared/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";

export default function AdminOrdersPage() {
  const orders = [
    {
      id: "#ORD-3210",
      customer: "Olivia Martin",
      vendor: "TechGear Store",
      product: "Wireless Headphones",
      amount: "$129.99",
      status: "Delivered",
      date: "Nov 10, 2025",
    },
    {
      id: "#ORD-3209",
      customer: "Noah Williams",
      vendor: "TechGear Store",
      product: "Smart Watch",
      amount: "$299.99",
      status: "Shipped",
      date: "Nov 10, 2025",
    },
    {
      id: "#ORD-3208",
      customer: "Emma Brown",
      vendor: "Fashion Hub",
      product: "Cotton T-Shirt",
      amount: "$24.99",
      status: "Processing",
      date: "Nov 9, 2025",
    },
    {
      id: "#ORD-3207",
      customer: "Liam Jones",
      vendor: "Sports Pro",
      product: "Yoga Mat",
      amount: "$39.99",
      status: "Pending",
      date: "Nov 9, 2025",
    },
    {
      id: "#ORD-3206",
      customer: "Ava Davis",
      vendor: "Home Essentials",
      product: "Coffee Maker",
      amount: "$79.99",
      status: "Delivered",
      date: "Nov 8, 2025",
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Orders</h1>
          <p className="text-slate-500 mt-1">Manage all platform orders</p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Orders</CardTitle>
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
                      Vendor
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
                        {order.vendor}
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
                              : order.status === "Processing"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
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
