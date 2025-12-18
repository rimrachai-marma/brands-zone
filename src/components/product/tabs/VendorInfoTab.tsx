import React from "react";
import {
  MapPin,
  Calendar,
  Store,
  ExternalLink,
  Shield,
  Phone,
  Mail,
} from "lucide-react";
import Rating from "@/components/common/Rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getVendorProfileById } from "@/lib/actions/vendor";

interface Props {
  vendorId: string;
}

const VendorInfoTab: React.FC<Props> = async ({ vendorId }) => {
  const result = await getVendorProfileById(vendorId);

  if (!result.data) return null;

  const { vendor, rating, stats, status_state } = result.data;

  return (
    <div className="space-y-6">
      {/* Header with Logo and Rating */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={vendor.logo ?? undefined} />
            <AvatarFallback>
              {vendor.shop_name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{vendor.shop_name}</h3>
              {vendor.status === "verified" && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
              )}

              <VendorBadge state={status_state} />
            </div>
            <p className="text-sm text-gray-500">Trusted Seller</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Rating rating={4.6} />
          <span className="text-sm font-semibold text-gray-700">
            {rating.average}
          </span>
          <span className="text-sm text-gray-500">
            ({rating.total_reviews} review
            {rating.total_reviews > 1 ? "s" : ""})
          </span>
        </div>
      </div>

      <div className="leading-relaxed text-gray-600">{vendor.description}</div>

      {/* Business Information */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">
          Business Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Store className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Business Type</p>
              <p className="text-sm text-gray-600 capitalize">
                {vendor.business_type?.replace("_", " ")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Years in Business
              </p>
              <p className="text-sm text-gray-600">
                {vendor.years_in_business} years
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Location</p>
              <p className="text-sm text-gray-600">{vendor.business_address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Verified Since
              </p>
              <p className="text-sm text-gray-600">
                {vendor.verified_at
                  ? new Date(vendor.verified_at).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">
          Contact Information
        </h4>
        <div className="space-y-2">
          <a
            href={`tel:${vendor.business_phone}`}
            className="flex items-center gap-3 p-3 border rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            {vendor.business_phone}
          </a>
          <a
            href={`mailto:${vendor.business_email}`}
            className="flex items-center gap-3 p-3 border rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            {vendor.business_email}
          </a>
          {vendor.website_url && (
            <a
              href={vendor.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 border rounded-lg text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Store Website
            </a>
          )}
        </div>
      </div>

      {/* Store Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
          <p className="text-3xl font-bold text-green-600">
            {rating.positive_percentage}
          </p>
          <p className="text-sm text-gray-600 mt-1">Positive Feedback</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-3xl font-bold text-blue-600">
            {stats.products_sold}
          </p>
          <p className="text-sm text-gray-600 mt-1">Products Sold</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
          <p className="text-3xl font-bold text-purple-600">
            {stats.avg_ship_time}
          </p>
          <p className="text-sm text-gray-600 mt-1">Avg. Ship Time</p>
        </div>
      </div>
    </div>
  );
};

export default VendorInfoTab;

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
