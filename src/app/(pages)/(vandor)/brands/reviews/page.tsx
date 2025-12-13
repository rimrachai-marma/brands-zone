"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp } from "lucide-react";

export default function VendorReviewsPage() {
  const reviews = [
    {
      id: 1,
      customer: "Olivia Martin",
      product: "Wireless Headphones Pro",
      rating: 5,
      comment:
        "Excellent quality! Sound is crystal clear and battery lasts forever.",
      date: "2 days ago",
      helpful: 12,
    },
    {
      id: 2,
      customer: "Noah Williams",
      product: "Smart Watch Series 5",
      rating: 4,
      comment: "Great product, but delivery took longer than expected.",
      date: "5 days ago",
      helpful: 8,
    },
    {
      id: 3,
      customer: "Emma Brown",
      product: "USB-C Fast Charger",
      rating: 5,
      comment: "Charges my phone super fast. Highly recommend!",
      date: "1 week ago",
      helpful: 15,
    },
    {
      id: 4,
      customer: "Liam Jones",
      product: "Phone Case Premium",
      rating: 3,
      comment: "Good quality but color was slightly different from photo.",
      date: "1 week ago",
      helpful: 4,
    },
    {
      id: 5,
      customer: "Ava Davis",
      product: "Laptop Stand",
      rating: 5,
      comment: "Perfect for my workspace. Very sturdy and adjustable.",
      date: "2 weeks ago",
      helpful: 20,
    },
  ];

  return (
    <main className="flex-1 bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reviews</h1>
          <p className="text-slate-500 mt-1">Customer feedback and ratings</p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">4.4</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Based on 156 reviews
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                5 Star Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-slate-500 mt-1">57% of all reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                4 Star Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-slate-500 mt-1">29% of all reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Response Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-slate-500 mt-1">
                Avg response time: 2 hours
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="pb-6 border-b last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium text-slate-900">
                          {review.customer}
                        </p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">
                        {review.product}
                      </p>
                      <p className="text-slate-700">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.helpful} helpful</span>
                        </button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
