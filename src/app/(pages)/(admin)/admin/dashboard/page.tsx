"use client";

import React, { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
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
  Store,
  ArrowUpRight,
} from "lucide-react";
import Card from "@/components/shared/card";
import StatsCard from "@/components/shared/StatsCard";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    {
      title: "Total Revenue",
      value: "$145,231.89",
      change: "+20.1%",
      icon: DollarSign,
      description: "Platform earnings",
    },
    {
      title: "Total Orders",
      value: "8,350",
      change: "+12.5%",
      icon: ShoppingCart,
      description: "Across all vendors",
    },
    {
      title: "Active Vendors",
      value: "234",
      change: "+8.2%",
      icon: Store,
      description: "Registered vendors",
    },
    {
      title: "Total Customers",
      value: "12,567",
      change: "+15.3%",
      icon: Users,
      description: "Platform users",
    },
  ];

  const revenueData = [
    { name: "Jan", revenue: 42000, commission: 8400 },
    { name: "Feb", revenue: 38000, commission: 7600 },
    { name: "Mar", revenue: 50000, commission: 10000 },
    { name: "Apr", revenue: 45000, commission: 9000 },
    { name: "May", revenue: 60000, commission: 12000 },
    { name: "Jun", revenue: 55000, commission: 11000 },
  ];

  const topVendors = [
    { name: "TechGear Store", orders: 1234, revenue: "$160,426", rating: 4.9 },
    { name: "Fashion Hub", orders: 987, revenue: "$142,013", rating: 4.8 },
    { name: "Home Essentials", orders: 856, revenue: "$98,120", rating: 4.7 },
    { name: "Sports Pro", orders: 745, revenue: "$87,350", rating: 4.6 },
    { name: "Book Haven", orders: 623, revenue: "$72,150", rating: 4.8 },
  ];

  const recentActivity = [
    {
      vendor: "TechGear Store",
      action: "New product added",
      time: "5 min ago",
      type: "product",
    },
    {
      vendor: "Fashion Hub",
      action: "Payout requested",
      time: "12 min ago",
      type: "payout",
    },
    {
      vendor: "Home Essentials",
      action: "Order shipped",
      time: "23 min ago",
      type: "order",
    },
    {
      vendor: "New Vendor",
      action: "Registration pending",
      time: "1 hour ago",
      type: "vendor",
    },
    {
      vendor: "Sports Pro",
      action: "Dispute reported",
      time: "2 hours ago",
      type: "dispute",
    },
  ];

  return (
    <main className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Platform overview and vendor management
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
          title="Revenue & Commission"
          description="Platform earnings overview"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
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
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Total Revenue"
              />
              <Line
                type="monotone"
                dataKey="commission"
                stroke="#10b981"
                strokeWidth={2}
                name="Commission"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Recent Activity" description="Latest platform events">
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-3 border-b last:border-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "product"
                        ? "bg-blue-500"
                        : activity.type === "payout"
                        ? "bg-green-500"
                        : activity.type === "order"
                        ? "bg-purple-500"
                        : activity.type === "vendor"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      {activity.vendor}
                    </p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Top Performing Vendors"
            description="Vendors by revenue and orders"
          >
            <div className="space-y-4">
              {topVendors.map((vendor, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between pb-4 border-b last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      #{i + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">
                        {vendor.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {vendor.orders} orders • ⭐ {vendor.rating}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {vendor.revenue}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
