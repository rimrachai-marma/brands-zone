"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { TrendingUp, Users, ShoppingCart, Eye } from "lucide-react";
import StatsCard from "@/components/shared/StatsCard";
import Card from "@/components/shared/card";

export default function AdminAnalyticsPage() {
  const categoryData = [
    { name: "Electronics", value: 35, color: "#3b82f6" },
    { name: "Fashion", value: 25, color: "#8b5cf6" },
    { name: "Home", value: 20, color: "#ec4899" },
    { name: "Sports", value: 15, color: "#f59e0b" },
    { name: "Books", value: 5, color: "#10b981" },
  ];

  const trafficData = [
    { name: "Mon", visits: 4200, sales: 1240 },
    { name: "Tue", visits: 3800, sales: 1398 },
    { name: "Wed", visits: 5000, sales: 1680 },
    { name: "Thu", visits: 4500, sales: 1520 },
    { name: "Fri", visits: 6000, sales: 2100 },
    { name: "Sat", visits: 5500, sales: 1890 },
    { name: "Sun", visits: 4800, sales: 1670 },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 mt-1">
            Detailed platform analytics and insights
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          <StatsCard
            title="Conversion Rate"
            icon={<TrendingUp className="h-4 w-4 text-slate-400" />}
          >
            <div className="text-2xl font-bold">3.24%</div>
            <p className="text-xs text-slate-500">+0.5% from last month</p>
          </StatsCard>

          <StatsCard
            title="Total Visits"
            icon={<Eye className="h-4 w-4 text-slate-400" />}
          >
            <div className="text-2xl font-bold">152.4K</div>
            <p className="text-xs text-slate-500">+12.3% from last month</p>
          </StatsCard>

          <StatsCard
            title="Avg Order Value"
            icon={<ShoppingCart className="h-4 w-4 text-slate-400" />}
          >
            <div className="text-2xl font-bold">$87.50</div>
            <p className="text-xs text-slate-500">+8.1% from last month</p>
          </StatsCard>

          <StatsCard
            title="Customer Retention"
            icon={<Users className="h-4 w-4 text-slate-400" />}
          >
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-slate-500">+3.2% from last month</p>
          </StatsCard>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Traffic & Sales">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="visits" fill="#3b82f6" />
                <Bar dataKey="sales" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Sales by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </main>
  );
}
