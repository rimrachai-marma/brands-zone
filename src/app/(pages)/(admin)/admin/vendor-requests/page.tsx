"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function VendorRequestsPage() {
  const [expandedRequests, setExpandedRequests] = useState(new Set());

  const requests = [
    {
      id: "1",
      name: "Digital Store",
      email: "admin@digitalstore.com",
      categories: ["Electronics", "Computers", "Mobile Phones"],
      date: "2 hours ago",
      status: "Pending",
    },
    {
      id: "2",
      name: "Organic Market",
      email: "contact@organicmarket.com",
      categories: [
        "Food & Grocery",
        "Organic Products",
        "Fresh Produce",
        "Dairy",
      ],
      date: "5 hours ago",
      status: "Pending",
    },
    {
      id: "3",
      name: "Pet Paradise",
      email: "info@petparadise.com",
      categories: ["Pet Supplies", "Pet Food", "Pet Accessories"],
      date: "1 day ago",
      status: "Pending",
    },
    {
      id: "4",
      name: "Gadget World",
      email: "hello@gadgetworld.com",
      categories: ["Electronics", "Smart Home", "Wearables", "Audio"],
      date: "2 days ago",
      status: "Approved",
    },
    {
      id: "5",
      name: "Art Gallery",
      email: "support@artgallery.com",
      categories: ["Art & Crafts", "Paintings", "Handmade"],
      date: "3 days ago",
      status: "Rejected",
    },
    {
      id: "6",
      name: "Fashion Hub",
      email: "info@fashionhub.com",
      categories: ["Clothing", "Accessories", "Footwear", "Jewelry", "Watches"],
      date: "4 days ago",
      status: "Pending",
    },
  ];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedRequests);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRequests(newExpanded);
  };

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Requests</h1>
          <p className="text-gray-600 mt-1">
            Review and approve vendor applications
          </p>
        </div>

        <div className="space-y-4">
          {requests.map((request) => {
            const isExpanded = expandedRequests.has(request.id);

            const displayCategories = isExpanded
              ? request.categories
              : request.categories.slice(0, 3);

            const hasMore = request.categories.length > 3;

            return (
              <Card key={request.id} className="rounded-md">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {request.name}
                        </h3>
                        <p className="text-sm text-gray-500">{request.email}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{request.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {request.status !== "Pending" && (
                          <Badge
                            variant={
                              request.status === "Approved"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {request.status}
                          </Badge>
                        )}

                        <Button variant="ghost" size="icon-sm" asChild>
                          <Link href="#">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {displayCategories.map((category, idx) => (
                        <Badge key={idx} variant="outline">
                          {category}
                        </Badge>
                      ))}

                      {hasMore && !isExpanded && (
                        <button
                          className="text-sm text-blue-600 hover:text-blue-700"
                          onClick={() => toggleExpand(request.id)}
                        >
                          +{request.categories.length - 3} more
                        </button>
                      )}

                      {isExpanded && (
                        <button
                          className="text-sm text-blue-600 hover:text-blue-700"
                          onClick={() => toggleExpand(request.id)}
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
