"use client";

import { Product } from "@/types";
import React from "react";
import {
  Heart,
  HeartCrack,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addToCart } from "@/lib/features/cart/cartSlice";
import toast from "react-hot-toast";
import { toggleWishlist } from "@/lib/features/wishlist/wishlistSlice";

interface Props {
  product: Product;
  currentVariantStock: number;
    variantId: string;
}

const Action: React.FC<Props> = ({ product, currentVariantStock ,variantId}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(
    currentVariantStock > 0 ? 1 : 0
  );

  React.useEffect(() => {
    setQuantity(currentVariantStock > 0 ? 1 : 0);
  }, [currentVariantStock]);

  const handleIncrement = () => {
    if (quantity < currentVariantStock) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity(1);
      return;
    }

    const numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue > 0) {
      setQuantity(Math.min(numValue, currentVariantStock));
    }
  };

  const isOutOfStock = currentVariantStock === 0;

  // wistlist
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleToggleWishlist = () => {
    // Determine the current status *before* dispatching the action
    const wasInWishlist = inWishlist;

    // Dispatch the toggle action
    dispatch(toggleWishlist(product));

    // Display the notification based on the *new* status (which is the opposite of the old status)
    if (wasInWishlist) {
      // It was in the wishlist, so it's now removed
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg  pointer-events-auto flex ring-1 ring-primary ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <HeartCrack className="w-6 h-6 text-red-500" />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium ">Removed from Wishlist</p>
                  <p className="mt-1 text-sm  truncate">
                    {product.name} has been removed.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-primary/20 ">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none  p-4 flex items-center justify-center text-sm font-medium text-primary/50 hover:text-primary "
              >
                Close
              </button>
            </div>
          </div>
        ),
        { duration: 3000 }
      );
    } else {
      // It was NOT in the wishlist, so it's now added
      toast.success(`${product.name} added to your Wishlist!`, {
        icon: "💖",
        style: {
          border: "1px solid #ef4444", // Tailwind red-500
          padding: "12px",
          color: "#1f2937", // Dark text
        },
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this product",
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {currentVariantStock > 0 ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium text-green-600">
                {currentVariantStock > product.low_stock_threshold
                  ? "In stock"
                  : `Only ${currentVariantStock} left in stock`}
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-red-600 font-medium">Out of stock</span>
            </>
          )}
        </div>

        <div className="h-11 w-45 flex rounded-xs overflow-hidden">
          <Button
            onClick={handleDecrement}
            className="rounded-none h-full w-11"
            variant="outline"
            disabled={quantity <= 1 || isOutOfStock}
          >
            <Minus />
          </Button>
          <Input
            type="text"
            value={quantity}
            className="h-full border-y text-center"
            onChange={handleInputChange}
            disabled={isOutOfStock}
          />
          <Button
            onClick={handleIncrement}
            className="rounded-none h-full w-11"
            variant="outline"
            disabled={quantity >= currentVariantStock || isOutOfStock}
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => dispatch(addToCart({ id:product.id, quantity,variantId }))}
          disabled={isOutOfStock}
          className="cursor-pointer flex-1 bg-primary text-white px-6 py-3 font-medium hover:opacity-80 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleToggleWishlist}
          className={`cursor-pointer px-6 py-3 border-2 font-medium transition-colors flex items-center justify-center gap-2 ${
            inWishlist
              ? "border-red-500 text-red-500 bg-red-50 hover:bg-red-100"
              : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
          <span className="hidden sm:inline">
            {inWishlist ? "Wishlisted" : "Wishlist"}
          </span>
        </button>

        <button
          onClick={handleShare}
          className="cursor-pointer px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </div>
  );
};

export default Action;
