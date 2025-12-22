import { UserProduct } from "@/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowRight, ShoppingBag} from "lucide-react";

interface Props {
  product: UserProduct;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const isOutOfStock = (product?.count_in_stock ?? 0) < 1;
  const hasDiscount = product?.discount?.percentage > 0;

  return (
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Image Container */}
        <div className="relative w-full h-56 bg-gray-50 overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          {/* Discount Badge */}
          {hasDiscount && (
              <div className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
                  product.discount.campaign ? "bg-orange-500" : "bg-red-500"
              }`}>
                -{product.discount.percentage}%
              </div>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold bg-black/70 px-3 py-1 rounded-full">
                            Out of Stock
                        </span>
              </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50">
              <ShoppingBag className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2 h-10 leading-relaxed">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
            {hasDiscount && product.original_price && (
                <span className="text-sm text-gray-400 line-through">
                            ${product.original_price.toFixed(2)}
                        </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                  <span
                      key={i}
                      className={`text-sm ${
                          i < Math.round(product.rating || 0)
                              ? "text-yellow-400"
                              : "text-gray-200"
                      }`}
                  >
                                ★
                            </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
                        ({product.rating?.toFixed(1) || 0})
                    </span>
          </div>

          <Link
              href={`/products/${product.slug}`}
              className="flex items-center justify-center gap-2 w-full mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 group/btn"
          >
            <span>View Product</span>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
  );
};

export default ProductItem;