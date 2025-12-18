"use client";

import { Product } from "@/types";
import React from "react";
import { Heart, HeartCrack, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addToCart } from "@/lib/features/cart/cartSlice";
import toast from "react-hot-toast";
import { toggleWishlist } from "@/lib/features/wishlist/wishlistSlice";

interface Props {
  product: Product;
}

const Action: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(
    product.countInStock > 0 ? 1 : 0
  );

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const item = cartItems.find((i) => i.id === product.id);

  const handleIncrement = () => {
    if (quantity < product.countInStock) {
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
      setQuantity(Math.min(numValue, product.countInStock));
    }
  };

  const isOutOfStock = product.countInStock === 0;

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
                    {product.title} has been removed.
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
      toast.success(`${product.title} added to your Wishlist!`, {
        icon: "💖",
        style: {
          border: "1px solid #ef4444", // Tailwind red-500
          padding: "12px",
          color: "#1f2937", // Dark text
        },
      });
    }
  };

  // Determine the icon to display
  const Icon = inWishlist ? Heart : HeartCrack; // Using lucide-react icons

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-primary">
          {product.countInStock > 0
            ? `${product.countInStock} in stock`
            : "Out of stock"}
        </p>
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
            disabled={quantity >= product.countInStock || isOutOfStock}
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
        <Button
          onClick={() => dispatch(addToCart({ product, quantity }))}
          className="sm:flex-1 h-11 rounded-xs"
          disabled={isOutOfStock}
        >
          Add to cart
        </Button>
        <Button
          onClick={handleToggleWishlist}
          variant="outline"
          className="h-11 sm:w-20 rounded-xs"
        >
          <Icon
            className={inWishlist ? "fill-red-500" : "fill-none stroke-2"}
          />
        </Button>
      </div>
    </div>
  );
};

export default Action;
