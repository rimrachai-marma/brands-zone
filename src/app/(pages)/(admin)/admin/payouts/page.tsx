"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DollarSign, Search } from "lucide-react";
import StatsCard from "@/components/shared/StatsCard";

export default function PayoutsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const payouts = [
    {
      id: 1,
      vendor: "TechGear Store",
      amount: "$12,450.00",
      method: "Bank Transfer",
      date: "Nov 10, 2025",
      status: "Pending",
    },
    {
      id: 2,
      vendor: "Fashion Hub",
      amount: "$8,320.50",
      method: "PayPal",
      date: "Nov 9, 2025",
      status: "Completed",
    },
    {
      id: 3,
      vendor: "Home Essentials",
      amount: "$15,890.25",
      method: "Bank Transfer",
      date: "Nov 8, 2025",
      status: "Completed",
    },
    {
      id: 4,
      vendor: "Sports Pro",
      amount: "$6,740.00",
      method: "Stripe",
      date: "Nov 7, 2025",
      status: "Processing",
    },
    {
      id: 5,
      vendor: "Book Haven",
      amount: "$9,550.75",
      method: "Bank Transfer",
      date: "Nov 6, 2025",
      status: "Completed",
    },
  ];

  const stats = [
    { title: "Pending Payouts", value: "$12,450.00", count: "1 request" },
    { title: "Processing", value: "$6,740.00", count: "1 request" },
    { title: "Completed This Month", value: "$48,561.50", count: "23 payouts" },
  ];

  const filteredPayouts = payouts.filter((payout) => {
    const matchesStatus =
      statusFilter === "all" || payout.status === statusFilter;
    const matchesDate = dateFilter === "all" || payout.date === dateFilter;
    const matchesSearch =
      searchQuery === "" ||
      payout.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.method.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesDate && matchesSearch;
  });

  // Get unique dates for the date filter
  const uniqueDates = [...new Set(payouts.map((p) => p.date))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <main className="bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payouts</h1>
          <p className="text-slate-500 mt-1">Manage vendor payout requests</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, idx) => {
            return (
              <StatsCard
                key={idx}
                title={stat.title}
                icon={<DollarSign className="h-4 w-4 text-slate-400" />}
              >
                <div className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 mt-1">{stat.count}</p>
              </StatsCard>
            );
          })}
        </div>
        <Card className="rounded-md">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <CardTitle>Payout Requests</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by vendor, amount, or method..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      {uniqueDates.map((date) => (
                        <SelectItem key={date} value={date}>
                          {date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">
                      {payout.vendor}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {payout.amount}
                    </TableCell>
                    <TableCell>{payout.method}</TableCell>
                    <TableCell className="text-slate-500">
                      {payout.date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payout.status === "Completed"
                            ? "default"
                            : payout.status === "Processing"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {payout.status === "Pending" && (
                        <Button size="sm">Approve</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPayouts.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-slate-500"
                    >
                      No payouts found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// have todo
