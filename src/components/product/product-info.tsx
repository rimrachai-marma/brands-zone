import { Product } from "@/types";
import React from "react";
import Rating from "../common/Rating";
import { formatCurrency } from "@/utils/formaters";
import Action from "./action";

interface Props {
  product: Product;
}

const ProductInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="space-y-4">
      {/* brand and title  */}
      <div className="space-x-1">
        <p className="font-medium text-gray-600 text-sm tracking-wide">
          {product.brandName}
        </p>
        <h2 className="font-bold text-2xl tracking-wide">{product.title}</h2>
      </div>

      {/* category  */}
      <div className="space-x-1 capitalize">
        <span className="text-gray-700">Category:</span>
        <span className="text-blue-500">{product.category}</span>
      </div>

      {/* rating */}
      <div className="flex items-center gap-1.5">
        <Rating rating={product.rating} />
        <span className="text-gray-500">
          ({product.reviews.length} customer{" "}
          {product.reviews.length > 1 ? "reviews" : "review"})
        </span>
      </div>

      {/* description */}
      <p className="leading-relaxed">{product.description}</p>

      {/* price */}
      <div className="space-x-1.5">
        {/* final price */}
        <span className="font-bold text-lime-500 text-4xl">
          {formatCurrency(product.price, "USD")}
        </span>
        {/* orginal price */}
        <span className="font-semibold text-xl line-through text-gray-400">
          {formatCurrency(1000, "USD")}
        </span>
      </div>

      {/* Product stock and action */}
      <Action product={product} />
    </div>
  );
};

export default ProductInfo;
