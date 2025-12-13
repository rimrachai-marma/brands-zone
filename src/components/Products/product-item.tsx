import { Product } from "@/types";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import Rating from "../common/Rating";
import { formatCurrency } from "@/utils/formaters";
import ProductActionButtons from "./product-action-buttons";

interface Props {
  product: Product;
}
const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <div key={product.id} className="relative space-y-2.5 group">
      <AspectRatio className="overflow-hidden border">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.image}
            alt=""
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            priority={true}
          />

          {product.countInStock < 1 && <OutOfStockOverlay />}
        </Link>

        {/* action buttons */}
        <ProductActionButtons product={product} />
      </AspectRatio>

      {product.countInStock > 1 && product.discount && (
        <DiscountBadge
          percentage={product.discount.percentage}
          isCampaign={product.discount.campaign}
        />
      )}

      <div className="flex flex-col gap-1">
        <Button
          variant="link"
          className="p-0 justify-start text-secondary"
          asChild
        >
          <Link href={`/products/${product.id}`}>
            <h3 className="truncate text-base font-semibold">
              {product.title}
            </h3>
          </Link>
        </Button>

        <Rating rating={product.rating} size="w-3.5 h-3.5" />

        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold">
            {formatCurrency(product.price, "USD")}
          </p>

          <p className="text-sm text-gray-500 line-through">
            {formatCurrency(product.original_price, "USD")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

const DiscountBadge = ({
  percentage,
  isCampaign,
}: {
  percentage: number;
  isCampaign: boolean;
}) => (
  <div
    className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full z-10 ${
      isCampaign ? "bg-orange-500" : "bg-red-500"
    }`}
  >
    {isCampaign && "🔥 "}-{percentage}%
  </div>
);

const OutOfStockOverlay = () => (
  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
    <span className="text-white text-lg font-semibold">Out of Stock</span>
  </div>
);
