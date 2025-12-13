"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar } from "lucide-react";

export default function VendorPayoutsPage() {
  const payouts = [
    {
      id: 1,
      amount: "$2,450.00",
      method: "Bank Transfer",
      date: "Nov 1, 2025",
      status: "Completed",
    },
    {
      id: 2,
      amount: "$2,120.50",
      method: "Bank Transfer",
      date: "Oct 1, 2025",
      status: "Completed",
    },
    {
      id: 3,
      amount: "$1,890.25",
      method: "Bank Transfer",
      date: "Sep 1, 2025",
      status: "Completed",
    },
    {
      id: 4,
      amount: "$2,340.00",
      method: "Bank Transfer",
      date: "Aug 1, 2025",
      status: "Completed",
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payouts</h1>
          <p className="text-slate-500 mt-1">Track your payment history</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Available Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$4,800.00</div>
              <p className="text-xs text-slate-500 mt-1">Ready for payout</p>
              <Button className="w-full mt-4">Request Payout</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
              <Calendar className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                Dec 1, 2025
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Scheduled payout date
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Paid Out
              </CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$8,800.75</div>
              <p className="text-xs text-slate-500 mt-1">Lifetime earnings</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Method
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className="border-b last:border-0 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {payout.amount}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {payout.method}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {payout.date}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="default">{payout.status}</Badge>
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
