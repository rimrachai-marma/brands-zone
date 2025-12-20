"use client";
import Image from "next/image";
import {motion} from "framer-motion";
import WishlistButton from "../common/WishlistButton";
import Link from "next/link";
import {getUserRandomProducts} from "@/lib/actions/user/products";
import {useEffect, useState} from "react";
import {UserProduct} from "@/types";

const ExtraProductsItems = () => {
    const [products, setProducts] = useState<UserProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getUserRandomProducts({is_new: false});
                console.log(result);
                if (result.status === "success" && result.data) {
                    setProducts(result.data as UserProduct[]);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                setProducts([]);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (!products.length && loading) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No products found</p>
            </div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {transition: {staggerChildren: 0.1}},
            }}
        >
            {
                loading ?
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white px-5 py-10 flex items-center overflow-hidden border border-primary/20"
                            >
                                <div className="relative w-40 h-40 bg-gray-200 animate-pulse"/>
                                <div className="p-4 space-y-2 flex-1">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"/>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"/>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="h-4 w-4 bg-gray-200 rounded animate-pulse"/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> : (products.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: {opacity: 0, y: 30},
                                visible: {opacity: 1, y: 0},
                            }}
                            transition={{duration: 0.4, ease: "easeOut"}}
                            className="bg-white px-5 py-10 flex items-center overflow-hidden group relative cursor-pointer border border-primary/20 "
                        >
                            {/* Image */}
                            <div className="relative w-40 h-40 overflow-hidden">
                                <Link href={`/products/${item.slug}`} className="w-full h-full block">
                                    {" "}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </Link>
                            </div>

                            <WishlistButton product={item}/>

                            {/* Content */}
                            <div className="p-4 text-leftspace-y-2">
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                                    <Link
                                        href={`/products/${item.slug}`}
                                        className="w-full h-full block"
                                    >
                                        {" "}
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                <div className="flex justify-start items-center gap-1">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-sm ${
                                                i < Math.round(item.rating)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        >
                  ★ </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )))
            }
        </motion.div>
    );
};

export default ExtraProductsItems;
