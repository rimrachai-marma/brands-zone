// ==================================================
// FILE: app/vendor/dashboard/page.tsx
// ==================================================
"use client";

import React, { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/shared/card";
import StatsCard from "@/components/shared/StatsCard";

export default function VendorDashboardPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    {
      title: "My Revenue",
      value: "$12,450.89",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "My Orders",
      value: "342",
      change: "+10.5%",
      trend: "up",
      icon: ShoppingCart,
      description: "This month",
    },
    {
      title: "My Products",
      value: "87",
      change: "+5",
      trend: "up",
      icon: Package,
      description: "Active products",
    },
    {
      title: "My Customers",
      value: "1,234",
      change: "+12.8%",
      trend: "up",
      icon: Users,
      description: "Total customers",
    },
  ];

  const salesData = [
    { name: "Jan", sales: 4200, orders: 145 },
    { name: "Feb", sales: 3800, orders: 132 },
    { name: "Mar", sales: 5000, orders: 178 },
    { name: "Apr", sales: 4500, orders: 156 },
    { name: "May", sales: 6000, orders: 198 },
    { name: "Jun", sales: 5500, orders: 187 },
  ];

  const myProducts = [
    {
      name: "Wireless Headphones Pro",
      sales: 234,
      revenue: "$29,250",
      stock: 45,
    },
    { name: "Smart Watch Series 5", sales: 187, revenue: "$56,100", stock: 23 },
    { name: "USB-C Fast Charger", sales: 156, revenue: "$4,680", stock: 89 },
    { name: "Phone Case Premium", sales: 145, revenue: "$4,350", stock: 156 },
    { name: "Laptop Stand Aluminum", sales: 123, revenue: "$6,150", stock: 67 },
  ];

  const recentOrders = [
    {
      id: "#3210",
      customer: "Olivia Martin",
      product: "Wireless Headphones",
      amount: "$129.99",
      status: "Processing",
    },
    {
      id: "#3209",
      customer: "Noah Williams",
      product: "Smart Watch",
      amount: "$299.99",
      status: "Shipped",
    },
    {
      id: "#3208",
      customer: "Emma Brown",
      product: "USB-C Charger",
      amount: "$29.99",
      status: "Delivered",
    },
    {
      id: "#3207",
      customer: "Liam Jones",
      product: "Phone Case",
      amount: "$29.99",
      status: "Processing",
    },
    {
      id: "#3206",
      customer: "Ava Davis",
      product: "Laptop Stand",
      amount: "$49.99",
      status: "Delivered",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Vendor Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your store and track performance
          </p>
        </div>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <StatsCard
              key={index}
              title={stat.title}
              icon={<Icon className="h-5 w-5 text-slate-700" />}
            >
              <div className="text-2xl font-bold text-slate-900">
                {stat.value}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs font-medium text-emerald-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.change}
                </span>
                <span className="text-xs text-slate-500 ml-2">
                  {stat.description}
                </span>
              </div>
            </StatsCard>
          );
        })}
      </div>

      <Card
        title="Sales Overview"
        description="Your store performance over time"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="sales" fill="#8b5cf6" name="Sales ($)" />
            <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Recent Orders" description="Latest orders from your store">
          <div className="space-y-4">
            {recentOrders.map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-4 border-b last:border-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900">
                    {order.customer}
                  </p>
                  <p className="text-xs text-slate-500">
                    {order.id} • {order.product}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium text-slate-900">
                    {order.amount}
                  </p>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Shipped"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top Products" description="Your best selling items">
          <div className="space-y-4">
            {myProducts.map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between pb-4 border-b last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 font-semibold text-sm">
                    #{i + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {product.sales} sales • Stock: {product.stock}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {product.revenue}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
