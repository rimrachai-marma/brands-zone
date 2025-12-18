"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PublicVendor, VendorRating, VendorStats } from "@/types";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Store,
  ShoppingBag,
  Award,
  CheckCircle,
} from "lucide-react";

interface BrandDetailsProps {
  brand: PublicVendor;
  rating: VendorRating;
  stats: VendorStats;
  status_state: string;
}

const BrandDetails = ({
  brand,
  rating,
  stats,
  status_state,
}: BrandDetailsProps) => {
  return (
    <div>
      {/* Banner Section */}
      <div className="mb-12 flex justify-center">
        <div className="relative w-full overflow-hidden shadow">
          {brand.banner ? (
            <>
              <Image
                className="w-full"
                width={1256}
                height={942}
                src={brand.banner}
                alt={brand.shop_name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </>
          ) : (
            <div className="w-full h-[400px] md:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Store className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">Banner Image</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Brand Info Card */}
      <motion.div
        className="border border-primary/20 shadow overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top Section - Logo & Name  */}
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-6">
            {/* Logo on Left */}
            <div className="shrink-0">
              <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.shop_name}
                    fill
                    className="object-contain p-3"
                  />
                ) : (
                  <Store className="w-12 h-12 text-gray-400" />
                )}
              </div>
            </div>

            {/* Brand Info on Right */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                  {brand.shop_name}
                </h2>
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    status_state === "active"
                      ? "bg-amber-100 text-amber-800"
                      : status_state === "inactive"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {status_state}
                </span>
              </div>

              {brand.description && (
                <p className="text-gray-600 text-base mb-3 leading-relaxed">
                  {brand.description}
                </p>
              )}

              {/* Verified Badge */}
              {stats.verified_since && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Verified since{" "}
                    {new Date(stats.verified_since).getFullYear()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Stats Section*/}
        <div className="p-6 md:p-8 bg-gray-50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Rating & Reviews Combined */}
            <motion.div
              className="bg-white border border-gray-200 p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <div className="mb-1">
                <div className="text-3xl font-bold text-gray-900">
                  {rating.average > 0 ? rating.average.toFixed(1) : "N/A"}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {rating.total_reviews}{" "}
                  {rating.total_reviews === 1 ? "Review" : "Reviews"}
                </div>
              </div>
              <div className="text-sm text-gray-600">Rating</div>
            </motion.div>

            {/* Avg Ship Time */}
            <motion.div
              className="bg-white border border-gray-200 p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats.avg_ship_time || "N/A"}
              </div>
              <div className="text-sm text-gray-600">Avg Ship</div>
            </motion.div>

            {/* Products Sold */}
            <motion.div
              className="bg-white border border-gray-200 p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats.products_sold.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Products Sold</div>
            </motion.div>

            {/* Positive Percentage */}
            <motion.div
              className="bg-white border border-gray-200 p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <Award className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {rating.positive_percentage > 0
                  ? `${rating.positive_percentage.toFixed(0)}%`
                  : "N/A"}
              </div>
              <div className="text-sm text-gray-600">Positive</div>
            </motion.div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Contact Section */}
        <div className="p-6 md:p-8">
          <div className="space-y-4">
            {brand.business_address && (
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Address
                  </p>
                  <p className="text-gray-600">{brand.business_address}</p>
                </div>
              </div>
            )}

            {brand.business_phone && (
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Phone
                  </p>
                  <p className="text-gray-600">{brand.business_phone}</p>
                </div>
              </div>
            )}

            {brand.business_email && (
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Email
                  </p>
                  <p className="text-gray-600">{brand.business_email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandDetails;
