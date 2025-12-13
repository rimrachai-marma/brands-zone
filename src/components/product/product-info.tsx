"use client";

import { Product } from "@/types";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formaters";
import Action from "./action";
import Rating from "../common/Rating";

interface Props {
  product: Product;
}

const ProductInfo: React.FC<Props> = ({ product }) => {
  const [selectedAttributes, setSelectedAttributes] = React.useState<
    Record<string, string>
  >(() => {
    return product.variants[0]?.attributes;
  });

  // Find current variant based on selected attributes
  const currentVariant = React.useMemo(() => {
    return product.variants.find((v) => {
      return Object.entries(selectedAttributes).every(
        ([key, value]) => v.attributes[key] === value
      );
    })!;
  }, [selectedAttributes, product.variants]);
    console.log(currentVariant)
  // Helper: Check if an option is available in any valid combination
  const isOptionAvailable = (attributeSlug: string, value: string) => {
    return product.variants.some((v) => {
      return (
        // Match the rest of selected attributes
        Object.entries(selectedAttributes).every(([key, val]) => {
          if (key === attributeSlug) return true;
          return v.attributes[key] === val;
        }) &&
        // Match this option
        v.attributes[attributeSlug] === value
      );
    });
  };

  // Handle attribute selection
  const handleAttributeChange = (attributeSlug: string, value: string) => {
    const newAttributes = {
      ...selectedAttributes,
      [attributeSlug]: value,
    };

    // Try exact match
    let matchingVariant = product.variants.find((v) => {
      return Object.entries(newAttributes).every(
        ([key, val]) => v.attributes[key] === val
      );
    });

    // Fallback: match only selected attribute
    if (!matchingVariant) {
      matchingVariant = product.variants.find((v) => {
        return v.attributes[attributeSlug] === value;
      });
    }

    if (matchingVariant) setSelectedAttributes(matchingVariant.attributes);
  };

  // Check if option is currently selected
  const isAttributeMatching = (attributeSlug: string, value: string) => {
    return currentVariant?.attributes[attributeSlug] === value;
  };

  const isOnSale = React.useMemo(() => {
    if (!product.campaign) return false;
    if (!product.campaign.is_active) return false;

    const now = new Date();
    const startDate = new Date(product.campaign.starts_at);
    const endDate = new Date(product.campaign.ends_at);

    if (now < startDate || now > endDate) return false;

    return product.campaign.discount_percentage > 0;
  }, [product.campaign]);

  // Price Calculation
  const priceInfo = React.useMemo(() => {
    const price = parseFloat(currentVariant?.price || "0");
    const salePrice = currentVariant?.sale_price
      ? parseFloat(currentVariant.sale_price)
      : null;

    let finalPrice = price;
    let originalPrice = price;
    let discountPercent = 0;
    let hasDiscount = false;
    let isCampaignDiscount = false;

    if (salePrice && salePrice < price) {
      finalPrice = salePrice;
      originalPrice = price;
      discountPercent = Math.round(((price - salePrice) / price) * 100);
      hasDiscount = true;
    }

    if (isOnSale && product.campaign) {
      const campaignDiscount = product.campaign.discount_percentage;
      finalPrice = finalPrice * (1 - campaignDiscount / 100);
      discountPercent = Math.round(
        ((originalPrice - finalPrice) / originalPrice) * 100
      );
      hasDiscount = true;
      isCampaignDiscount = true;
    }

    return {
      finalPrice: Math.max(0, finalPrice),
      originalPrice,
      discountPercent,
      hasDiscount,
      isCampaignDiscount,
    };
  }, [currentVariant, product.campaign, isOnSale]);

  const currentVariantStock = React.useMemo(() => {
    return currentVariant?.inventory?.quantity_in_stock ?? 0;
  }, [currentVariant]);

  return (
    <div className="space-y-4">
      {/* Brand + Name */}
      <div className="space-y-1">
        <p className="font-medium text-gray-600 text-sm tracking-wide">
          {product.brand.name}
        </p>
        <h2 className="font-bold text-2xl tracking-wide">{product.name}</h2>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {product.categories.map((category) => (
          <Badge variant="outline" key={category.id}>
            {category.name}
          </Badge>
        ))}
      </div>

      {/* SKU */}
      {currentVariant?.sku && (
        <div className="text-sm text-gray-500">
          SKU: <span className="font-mono">{currentVariant.sku}</span>
        </div>
      )}

      {/* Rating & Reviews Display */}
      {product.reviews_count > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Rating rating={product.reviews_avg_rating ?? 0} />
          </div>
          <span className="font-medium text-gray-900">
            {product.reviews_avg_rating ?? 0}
          </span>
          <span className="text-gray-500">
            ({product.reviews_count} reviews)
          </span>
        </div>
      )}

      {/* Short Description */}
      {product.short_description && (
        <p className="leading-relaxed text-gray-600">
          {product.short_description}
        </p>
      )}

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-end gap-3 flex-wrap">
          <span className="font-light text-gray-900 text-6xl leading-none">
            {formatCurrency(priceInfo.finalPrice, product.currency)}
          </span>

          {priceInfo.hasDiscount && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-xl line-through text-gray-400 leading-none">
                {formatCurrency(priceInfo.originalPrice, product.currency)}
              </span>

              <span
                className={`inline-block px-2 py-1 text-sm font-medium rounded ${
                  priceInfo.isCampaignDiscount
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {priceInfo.isCampaignDiscount && "🔥 "}
                {priceInfo.discountPercent}% OFF
              </span>
            </div>
          )}
        </div>

        {priceInfo.isCampaignDiscount && product.campaign && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-md">
            <span className="text-orange-600 text-sm font-medium">
              🔥 Limited Time Offer - Ends&nbsp;
              {new Date(product.campaign.ends_at).toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </span>
          </div>
        )}
      </div>

      {/* ATTRIBUTE SELECTION */}
      {product.attributes.map((attribute) => {
        const selectedLabel = attribute.options.find(
          (opt) => opt.value === selectedAttributes[attribute.slug]
        )?.label;

        return (
          <div key={attribute.id} className="space-y-3">
            <h3 className="font-medium text-sm text-gray-900 capitalize flex gap-1">
              <span>{attribute.name}</span>
              &#8208;
              <span className="font-normal text-gray-600">{selectedLabel}</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {attribute.options.map((option) => {
                const isMatching = isAttributeMatching(
                  attribute.slug,
                  option.value
                );

                const isAvailable = isOptionAvailable(
                  attribute.slug,
                  option.value
                );

                const baseClasses =
                  "relative group flex items-center gap-1 px-2 py-1 rounded-lg border-2 transition-all";

                const normalClasses = isMatching
                  ? "border-gray-900 bg-gray-300"
                  : "border-gray-300 hover:border-gray-400";

                const unavailableClasses =
                  "opacity-40 border-gray-300 border-dashed";

                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleAttributeChange(attribute.slug, option.value)
                    }
                    className={`${baseClasses} ${
                      isAvailable ? normalClasses : unavailableClasses
                    }`}
                  >
                    {/* Color Swatch */}
                    {attribute.type === "color" && option.metadata?.hex ? (
                      <>
                        <div
                          className="w-4.5 h-4.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: option.metadata.hex }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {option.label}3
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-medium text-gray-700">
                        {option.label}2
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <Action currentVariantStock={currentVariantStock} product={product} variantId={currentVariant.id} />
    </div>
  );
};

export default ProductInfo;
