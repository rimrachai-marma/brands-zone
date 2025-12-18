"use client";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "@/types";
import { RootState } from "@/lib/store";
import { toggleWishlist } from "@/lib/features/wishlist/wishlistSlice";

// Import the toast library
import toast from "react-hot-toast";

// Import a filled heart for a better visual feedback
import { Heart, HeartCrack } from "lucide-react"; 

const WishlistButton = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
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
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg  pointer-events-auto flex ring-1 ring-primary ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <HeartCrack className="w-6 h-6 text-red-500" />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium ">
                    Removed from Wishlist
                  </p>
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
      toast.success(
        `${product.title} added to your Wishlist!`,
        {
          icon: '💖',
          style: {
            border: '1px solid #ef4444', // Tailwind red-500
            padding: '12px',
            color: '#1f2937', // Dark text
          },
        }
      );
    }
  };

  // Determine the icon to display
  const Icon = inWishlist ? Heart : HeartCrack; // Using lucide-react icons

  return (
    <span
      className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm cursor-pointer transition-all duration-300 shadow-md ${
        inWishlist 
          ? "text-red-500 hover:scale-[1.15] hover:bg-white" 
          : "text-gray-500 hover:text-red-500 hover:scale-[1.15]"
      }`}
      onClick={handleToggleWishlist}
    >
      {/* Use a filled heart when in the wishlist, and a hollow/crack heart otherwise */}
      <Icon size={20} className={inWishlist ? "fill-red-500" : "fill-none stroke-2"} />
    </span>
  );
};

export default WishlistButton;