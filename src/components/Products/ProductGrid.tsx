"use client";
import { UserProduct } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import WishlistButton from "@/components/common/WishlistButton";
import Link from "next/link";

interface ProductGridProps {
    products: UserProduct[] | null;
}

const ProductGrid = ({ products }: ProductGridProps) => {

    if (!products || products.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">No products available</p>
            </div>
        );
    }

    return (
        <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
            }}
        >
            {products.map((item, index) => (
                <motion.div
                    key={item.id || index}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white flex items-center overflow-hidden group relative cursor-pointer border border-transparent hover:border-primary/20 "
                >
                       <div className="relative w-32 h-32 overflow-hidden">
                           <Link href={`/products/${item.slug}`} className="w-full h-full block">
                               <Image
                                   src={item.image || "/placeholder.png"}
                                   alt={item.title}
                                   fill
                                   className="object-cover group-hover:scale-110 transition-transform duration-500"
                                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                               />
                           </Link>
                       </div>

                       <WishlistButton product={item} />

                       {/* Content */}
                       <div className="p-4 space-y-2">
                           <h3 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                               <Link
                                   href={`/products/${item.slug}`}
                                   className="w-full h-full block"
                               >
                                   {item.title}
                               </Link>
                           </h3>

                           {/* Price with discount */}
                           <div className="flex items-center justify-start gap-2">
                               {item.discount?.campaign && item.discount.percentage > 0 ? (
                                   <>
                                       <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                                       <span className="text-sm text-gray-500 line-through">
                                        ${item.original_price?.toFixed(2) || (item.price * (1 + item.discount.percentage / 100)).toFixed(2)}
                                    </span>
                                       <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                        -{item.discount.percentage}%
                                    </span>
                                   </>
                               ) : (
                                   <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                               )}
                           </div>

                           {/* Rating */}
                           <div className="flex justify-start items-center gap-1">
                               {Array.from({ length: 5 }).map((_, i) => (
                                   <span
                                       key={i}
                                       className={`text-sm ${
                                           i < Math.round(item.rating || 0)
                                               ? "text-yellow-400"
                                               : "text-gray-300"
                                       }`}
                                   >
                                    ★
                                </span>
                               ))}
                           </div>
                       </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ProductGrid;