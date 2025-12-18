"use client";

import React from "react";
import { Product } from "@/types";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@radix-ui/react-tabs";
import Rating from "../common/Rating";
import Image from "next/image";

interface Props {
  product: Product;
}

const Tabs: React.FC<Props> = ({ product }) => {
  return (
    <ShadcnTabs defaultValue="description">
      <TabsList className="border-b w-full flex gap-6 sm:gap-6 md:gap-8">
        <TabsTrigger
          value="description"
          className="pb-2 text-gray-600 border-b-2 border-transparent hover:text-primary transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Description
        </TabsTrigger>

        <TabsTrigger
          value="reviews"
          className="pb-2 text-gray-600 border-b-2 border-transparent hover:text-primary transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Reviews ({product.reviews.length})
        </TabsTrigger>

        <TabsTrigger
          value="brands"
          className="pb-2 text-gray-600 border-b-2 border-transparent hover:text-primary transition-colors data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Brands
        </TabsTrigger>
      </TabsList>

      {/* description  */}
      <TabsContent value="description" className="pt-4">
        <p className="leading-relaxed">{product.description}</p>
      </TabsContent>

      {/* reviews */}
      <TabsContent value="reviews" className="pt-4">
        <div className="space-y-6">
          {/* Reviews summary */}
          <div className="flex gap-4 flex-col sm:flex-row sm:items-center bg-gray-100 p-4 rounded-xs">
            {/* rating summary */}
            <div className="space-y-1.5">
              <Rating rating={product.rating} size="w-6 h-6" />
              <p className="font-semibold tracking-wide text-gray-500">
                Avarage Star Rating{" "}
                <span className="text-primary">{product.rating} out of 5 </span>
                ({product.reviews.length} reviews)
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
                    ? (count / product.reviews.length) * 100
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
              {product.reviews.length} reviews for {product.title}
            </h3>

            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-6 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      {review.user.avatar ? (
                        <Image
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          fill
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-white font-medium">
                          {review.user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col">
                        <div className="font-medium text-gray-700">
                          {review.user.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Rating rating={review.rating} size="w-4 h-4" />-
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString(
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
      </TabsContent>

      {/* brands */}
      <TabsContent value="brands" className="pt-4">
        <div className="flex flex-col gap-2 sm:flex-row justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Vendor Information</h2>
            <p className="text-gray-500">4.07 rating from 61 reviewsRated</p>
          </div>

          <Rating rating={4.5} />
        </div>
      </TabsContent>
    </ShadcnTabs>
  );
};

export default Tabs;
