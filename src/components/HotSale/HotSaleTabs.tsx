"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Campaign } from "@/types";
import React from "react";
import Image from "next/image";

interface Props {
  campaigns: Campaign[];
}

const CampaignShowcase: React.FC<Props> = ({ campaigns }) => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Featured Campaigns
          </h2>
          <p className="text-gray-600 text-lg">
            Exclusive deals on premium footwear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={campaign.slug} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={campaign.banner_image_url ?? ""}
                      alt={campaign.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-100 text-gray-900 text-lg font-bold p-1.5 rounded shadow-md">
                        🔥 {campaign.discount_percentage}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {campaign.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      {campaign.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                        Shop Collection
                      </span>
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/campaigns"
            className="inline-flex items-center text-lg font-semibold text-gray-700 hover:text-primary transition-colors"
          >
            View All Campaigns
            <svg
              className="w-6 h-6 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignShowcase;
