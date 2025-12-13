"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, TrendingUp, CreditCard } from "lucide-react";

export default function EarningsPage() {
  const earningsData = [
    { name: "Jan", earnings: 3800, commission: 570 },
    { name: "Feb", earnings: 3400, commission: 510 },
    { name: "Mar", earnings: 4500, commission: 675 },
    { name: "Apr", earnings: 4000, commission: 600 },
    { name: "May", earnings: 5200, commission: 780 },
    { name: "Jun", earnings: 4800, commission: 720 },
  ];

  const stats = [
    {
      title: "Total Earnings",
      value: "$25,700.00",
      icon: DollarSign,
      description: "All time",
    },
    {
      title: "This Month",
      value: "$4,800.00",
      icon: TrendingUp,
      description: "+15% from last month",
    },
    {
      title: "Commission Paid",
      value: "$3,855.00",
      icon: CreditCard,
      description: "Platform fees",
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Earnings</h1>
          <p className="text-slate-500 mt-1">Track your store revenue</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Earnings"
                />
                <Line
                  type="monotone"
                  dataKey="commission"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Commission"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
