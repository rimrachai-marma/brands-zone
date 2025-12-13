"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { toggleWishlist } from "@/lib/features/wishlist/wishlistSlice";

// Import lucide-react icons
import { HeartCrack, ShoppingCart, Trash2 } from "lucide-react";

// Import the toast library
import toast from "react-hot-toast";

const WishlistComp = () => {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  // --- Notification Handlers ---

  const handleRemoveItem = (item: (typeof items)[number]) => {
    dispatch(toggleWishlist(item));
    toast.error(`${item.title} has been removed from your Wishlist.`, {
      icon: <Trash2 className="text-red-600" />,
      style: {
        border: '1px solid #f87171', // Tailwind red-400
      },
    });
  };

  const handleMoveToCart = (item: (typeof items)[number]) => {
    // 1. Add to Cart
    dispatch(addToCart(item));
    // 2. Remove from Wishlist
    dispatch(toggleWishlist(item));

    // 3. Show Success Notification
    toast.success(`${item.title} moved to Cart!`, {
        icon: <ShoppingCart className="text-green-600" />,
        style: {
            border: '1px solid #34d399', // Tailwind green-400
            backgroundColor: '#f0fff4', // Light green background
        },
    });
  };

 

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  if (items.length === 0)
    return (
      // Enhanced Empty State
      <div className="flex flex-col items-center justify-center p-20 text-center bg-gray-50 min-h-[40vh] m-10 shadow-lg">
        <HeartCrack className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold  mb-2">
          Your heart is empty
        </h3>
        <p className="">
          It looks like you have not added anything to your wishlist yet.
        </p>
      </div>
    );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
          Your Personal Wishlist
        </h2>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="
                shadow-xl 
                py-0 gap-3
                overflow-hidden 
                h-full 
                flex flex-col
                transition-all duration-300
                border border-primary/20 hover:border-primary/50
              ">
                <CardHeader className="p-0 relative">
                  <div className="relative w-full h-60">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Remove button (Top Right) */}
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="absolute top-4 right-4 
                      text-red-500 bg-white/90 dark:bg-black/80 backdrop-blur-sm 
                      rounded-full p-2 shadow-lg 
                      transition-all duration-300 
                      hover:bg-red-500 hover:text-white hover:scale-110"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </CardHeader>

                <CardContent className="grow p-4 pt-6">
                  <CardTitle className="text-xl font-bold mb-1  line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <p className="text-2xl font-extrabold text-primary">
                    ${Number(item.price).toFixed(2)}
                  </p>
                </CardContent>

                <CardFooter className="flex gap-3 p-4 border-t ">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-500 border-red-200 hover:border-red-500 hover:bg-red-50"
                    onClick={() => handleRemoveItem(item)} // Uses the handler with toast
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-secondary text-white"
                    onClick={() => handleMoveToCart(item)} // Uses the handler with toast
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Move to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WishlistComp;