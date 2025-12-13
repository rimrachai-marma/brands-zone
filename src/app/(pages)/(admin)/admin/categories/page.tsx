"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      products: 1245,
      subcategories: 12,
      icon: "📱",
    },
    {
      id: 2,
      name: "Fashion & Apparel",
      products: 2890,
      subcategories: 18,
      icon: "👕",
    },
    {
      id: 3,
      name: "Home & Garden",
      products: 1567,
      subcategories: 15,
      icon: "🏠",
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      products: 987,
      subcategories: 10,
      icon: "⚽",
    },
    {
      id: 5,
      name: "Books & Media",
      products: 2340,
      subcategories: 8,
      icon: "📚",
    },
    {
      id: 6,
      name: "Food & Grocery",
      products: 1120,
      subcategories: 14,
      icon: "🍎",
    },
    {
      id: 7,
      name: "Beauty & Personal Care",
      products: 1876,
      subcategories: 11,
      icon: "💄",
    },
    {
      id: 8,
      name: "Toys & Games",
      products: 892,
      subcategories: 9,
      icon: "🎮",
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
            <p className="text-slate-500 mt-1">Manage product categories</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {category.products} products
                      </p>
                      <p className="text-xs text-slate-400">
                        {category.subcategories} subcategories
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit2 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
