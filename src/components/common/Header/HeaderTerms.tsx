"use client";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

const HeaderTerms = () => {
  return (
    <ul className="text-xs sm:text-sm flex items-center gap-2 sm:gap-4 md:gap-6">
      <li>
        <Link href="#" className="py-1 hover:text-primary">
          Order Tracking
        </Link>
      </li>
      <li>
        <Link
          href="tel:+16092569162"
          className="py-1 hover:text-primary flex items-center"
        >
          <HelpCircle className="w-3.5 mr-1 block lg:hidden" />
          <span className="hidden lg:block">Support</span> 24/7: +1
          (609)-256-9162
        </Link>
      </li>
    </ul>
  );
};

export default HeaderTerms;
