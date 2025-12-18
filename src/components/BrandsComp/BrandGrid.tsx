// "use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { VendorListItem } from "@/types";
import { Store } from "lucide-react";

const BrandGrid = ({ vendors }: { vendors: VendorListItem[] }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {vendors.map((vendor, idx) => (
        <Link
          href={`/brands-list/${vendor.id}`}
          key={vendor.id}
          className="group"
        >
          <motion.div
            className="relative h-[380px] bg-white hover:bg-neutral-50 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {/* Banner Section */}
            <div className="relative h-32 bg-neutral-100 overflow-hidden">
              {vendor.banner ? (
                <Image
                  src={vendor.banner}
                  alt={`${vendor.shop_name} banner`}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-neutral-50 to-neutral-100" />
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-[248px]">
              {/* Header with Logo */}
              <div className="flex items-start justify-between mb-6 -mt-2">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="font-medium text-xl text-neutral-900 tracking-tight mb-1 truncate">
                    {vendor.shop_name}
                  </h3>
                  {vendor.business_address && (
                    <p className="text-xs text-neutral-500 uppercase tracking-wide truncate">
                      {vendor.business_address}
                    </p>
                  )}
                </div>

                <div className="relative w-14 h-14 shrink-0 bg-white border border-neutral-200 flex items-center justify-center">
                  {vendor.logo ? (
                    <Image
                      src={vendor.logo}
                      alt={vendor.shop_name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <Store className="h-8 w-8 text-neutral-400" />
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-neutral-200">
                <div>
                  <div className="text-2xl font-light text-neutral-900 tracking-tight">
                    {vendor.average_rating > 0
                      ? vendor.average_rating.toFixed(1)
                      : "—"}
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
                    Rating
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-light text-neutral-900 tracking-tight">
                    {vendor.products_count}
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
                    Products
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-light text-neutral-900 tracking-tight">
                    {vendor.avg_ship_time || "—"}
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
                    Ship Time
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2 mt-auto">
                {vendor.business_phone && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 uppercase tracking-wider">
                      Phone
                    </span>
                    <span className="text-neutral-700 font-mono">
                      {vendor.business_phone}
                    </span>
                  </div>
                )}

                {vendor.business_email && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 uppercase tracking-wider">
                      Email
                    </span>
                    <span className="text-neutral-700 font-mono truncate ml-2">
                      {vendor.business_email}
                    </span>
                  </div>
                )}

                {vendor.reviews_count > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 uppercase tracking-wider">
                      Reviews
                    </span>
                    <span className="text-neutral-700 font-mono">
                      {vendor.reviews_count}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default BrandGrid;
