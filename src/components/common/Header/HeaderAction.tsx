"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import Link from "next/link";

const HeaderAction = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items);
  return (
    <div className="flex items-center justify-end gap-6 sm:gap-8 w-auto">
      <Link href="/wishlist" className="relative cursor-pointer">
        <CiHeart size={35} />
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          {wishlistCount && wishlistCount.length}
        </span>
      </Link>
      <Link href="/cart" className="relative cursor-pointer">
        <CiShoppingCart size={35} />
        <span className="absolute top-0 right-0 bg-primary text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
          {cartCount && cartCount.length}
        </span>
      </Link>
    </div>
  );
};

export default HeaderAction;
