"use client";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import Rating from "@/components/common/Rating";
import ReviewForm from "../review-form";
import Link from "next/link";

interface Props {
  product: Product;
  isLoggedIn?: boolean;
}

const Reviews: React.FC<Props> = ({ product, isLoggedIn = false }) => {
  return (
    <div className="space-y-6">
      {isLoggedIn ? (
        <ReviewForm productId={product.id} />
      ) : (
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <span>
              Please
              <Button asChild variant="link" className="p-1">
                <Link href={`/login?redirect=/products/${product.slug}`}>
                  login
                </Link>
              </Button>
              to write a review for this product.
            </span>
          </AlertDescription>
        </Alert>
      )}

      {/* Reviews summary */}
      <div className="flex gap-4 flex-col sm:flex-row sm:items-center bg-gray-100 p-4 rounded-xs">
        {/* rating summary */}
        <div className="space-y-1.5">
          <Rating rating={product.reviews_avg_rating ?? 0} size="w-6 h-6" />
          <p className="font-semibold tracking-wide text-gray-500">
            Avarage Star Rating{" "}
            <span className="text-primary">
              {product.reviews_avg_rating ?? 0} out of 5{" "}
            </span>
            ({product.reviews_count} reviews)
          </p>
        </div>

        {/* rating destribution */}
        <div className="w-full flex-1 space-y-2">
          <h4 className="font-medium text-gray-800">Rating Distribution</h4>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = product.reviews.filter(
              (review) => review.rating === star
            ).length;
            const percentage =
              product.reviews.length > 0
                ? (count / product.reviews_count) * 100
                : 0;
            return (
              <div key={star} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600 w-8">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* user review list */}
      <div className="space-y-5">
        <h3 className="font-medium text-lg text-gray-800">
          {product.reviews.length} reviews for {product.name}
        </h3>

        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={review.user?.avatar ?? undefined}
                    alt={review.user.name}
                  />
                  <AvatarFallback>
                    {review.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-700">
                      {review.user.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Rating rating={review.rating} size="w-4 h-4" />-
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
