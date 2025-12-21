"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PublicVendor, StatusState, VendorRating, VendorStats } from "@/types";
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
import { Badge } from "../ui/badge";

interface BrandDetailsProps {
  vendor: PublicVendor;
  vendorRating: VendorRating;
  vendorStats: VendorStats;
  statusState: StatusState;
}

const BrandDetails = ({
  vendor,
  vendorRating,
  vendorStats,
  statusState,
}: BrandDetailsProps) => {
  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Banner Section */}
      <div className="mb-12 flex justify-center">
        <div className="relative w-full overflow-hidden shadow">
          {vendor.banner ? (
            <>
              <Image
                className="w-full h-[300px] md:h-[500px] object-cover"
                width={1256}
                height={942}
                src={vendor.banner}
                alt={vendor.shop_name}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </>
          ) : (
            <div className="w-full h-[300px] md:h-[500px] bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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
        className="border border-gray-200 shadow overflow-hidden bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top Section - Logo & Name  */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo on Left */}
            <div className="shrink-0">
              <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                {vendor.logo ? (
                  <Image
                    src={vendor.logo}
                    alt={vendor.shop_name}
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
                  {vendor.shop_name}
                </h2>
                {/* Status Badge */}
                <VendorBadge state={statusState} />
              </div>

              {vendor.description && (
                <p className="text-gray-600 text-base mb-4 leading-relaxed">
                  {vendor.description}
                </p>
              )}

              {/* Verified Badge */}
              {vendorStats.verified_since && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Verified since{" "}
                    {new Date(vendorStats.verified_since).getFullYear()}
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
            {/* Rating & Reviews */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div className="mb-1">
                <div className="text-3xl font-bold text-gray-900">
                  {vendorRating.average > 0
                    ? vendorRating.average.toFixed(1)
                    : "N/A"}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {vendorRating.total_reviews}{" "}
                  {vendorRating.total_reviews === 1 ? "Review" : "Reviews"}
                </div>
              </div>
              <div className="text-sm text-gray-600">Rating</div>
            </motion.div>

            {/* Avg Ship Time */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {vendorStats.avg_ship_time || "N/A"}
              </div>
              <div className="text-sm text-gray-600">Avg Ship Time</div>
            </motion.div>

            {/* Products Sold */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {vendorStats.products_sold.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Products Sold</div>
            </motion.div>

            {/* Positive Percentage */}
            <motion.div
              className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-center mb-3">
                <Award className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {vendorRating.positive_percentage > 0
                  ? `${vendorRating.positive_percentage.toFixed(0)}%`
                  : "N/A"}
              </div>
              <div className="text-sm text-gray-600">Positive Feedback</div>
            </motion.div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Contact Section */}
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Information
          </h3>
          <div className="space-y-4">
            {vendor.business_address && (
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Address
                  </p>
                  <p className="text-gray-600">{vendor.business_address}</p>
                </div>
              </div>
            )}

            {vendor.business_phone && (
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${vendor.business_phone}`}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {vendor.business_phone}
                  </a>
                </div>
              </div>
            )}

            {vendor.business_email && (
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${vendor.business_email}`}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {vendor.business_email}
                  </a>
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

function VendorBadge({ state }: { state: string }) {
  if (state === "top_rated") {
    return (
      <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
        ★ Top Rated
      </Badge>
    );
  }

  if (state === "hot_vendor") {
    return (
      <Badge className="bg-red-500 text-white hover:bg-red-600">
        🔥 Hot Saler
      </Badge>
    );
  }

  return (
    <Badge className="bg-gray-300 text-gray-800 hover:bg-gray-400">
      Standard
    </Badge>
  );
}
