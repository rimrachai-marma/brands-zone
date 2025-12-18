"use client";

import { Product } from "@/types";
import { Button } from "../ui/button";
import { Eye, Heart, HeartCrack, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ImageGallery from "../product/image-gallary";
import ProductInfo from "../product/product-info";
import toast from "react-hot-toast";
import { toggleWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface Props {
  product: Product;
}

const ProductActionButtons: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

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
    <div className="absolute py-1 bottom-0 w-full flex items-center justify-center gap-1 bg-black/5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 show-on-touch">
      <Button size="icon-sm" variant="ghost">
        <ShoppingBag />
      </Button>
      <Dialog>
        <Button asChild size="icon-sm" variant="ghost">
          <DialogTrigger>
            <Eye />
          </DialogTrigger>
        </Button>
        <DialogContent className="w-[95vw] sm:max-w-6xl max-h-[85vh] rounded overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quick view</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ImageGallery images={product.images} />
            <ProductInfo product={product} />
          </div>
        </DialogContent>
      </Dialog>

      <Button onClick={handleToggleWishlist} size="icon-sm" variant="ghost">
        <Icon className={inWishlist ? "fill-red-500" : "fill-none stroke-2"} />
      </Button>
    </div>
  );
};

export default ProductActionButtons;
