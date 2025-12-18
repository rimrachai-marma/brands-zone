"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, Save } from "lucide-react";
import Card from "@/components/shared/card";
import { Separator } from "@/components/ui/separator";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from "@/components/ui/card";

export default function CommissionPage() {
  const [defaultRate, setDefaultRate] = useState("15");

  const categories = [
    { name: "Electronics", rate: "12" },
    { name: "Fashion & Apparel", rate: "18" },
    { name: "Home & Garden", rate: "15" },
    { name: "Sports & Outdoors", rate: "14" },
    { name: "Books & Media", rate: "10" },
    { name: "Food & Grocery", rate: "8" },
    { name: "Beauty & Personal Care", rate: "20" },
    { name: "Toys & Games", rate: "16" },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Commission Settings
          </h1>
          <p className="text-slate-500 mt-1">
            Manage platform commission rates
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Default Commission Rate">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-rate">Platform Commission (%)</Label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="default-rate"
                      type="number"
                      value={defaultRate}
                      onChange={(e) => setDefaultRate(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
              <p className="text-sm text-slate-500">
                This is the default commission rate applied to all products
                unless a category-specific rate is set.
              </p>
            </div>
          </Card>
          <Card title="Commission Summary">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Commission Earned</span>
                <span className="text-2xl font-bold text-slate-900">
                  $28,450.00
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-slate-600">This Month</span>
                <span className="text-lg font-semibold text-emerald-600">
                  $8,320.50
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Last Month</span>
                <span className="text-lg font-semibold text-slate-900">
                  $7,145.75
                </span>
              </div>
            </div>
          </Card>
        </div>
        <ShadcnCard>
          <CardHeader>
            <CardTitle>Category-Specific Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {categories.map((category, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <Label htmlFor={`category-${i}`}>{category.name}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`category-${i}`}
                      type="number"
                      value={category.rate}
                      className="w-20"
                    />
                    <span className="text-slate-500">%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Save All Changes</Button>
          </CardFooter>
        </ShadcnCard>
      </div>
    </main>
  );
}
