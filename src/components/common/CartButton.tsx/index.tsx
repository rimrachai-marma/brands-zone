"use client";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "@/types";
import { RootState } from "@/lib/store";
import { addToCart } from "@/lib/features/cart/cartSlice";

const CartButton = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const item = cartItems.find((i) => i.id === product.id);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(addToCart({ product }))}
      className="flex items-center space-x-2 bg-primary text-white text-sm font-medium px-4 py-2 shadow-md hover:bg-primary/80 transition-colors duration-200"
    >
      <FaShoppingCart size={16} />
      <span>{item ? `More` : "Add"}</span>
    </motion.button>
  );
};

export default CartButton;
