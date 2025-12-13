"use client";
import { HotProduct } from "@/types/products";
import calculateTimeLeft from "@/utils/calculateTimeLeft";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Progress } from "../ui/progress";
import TimeBox from "@/utils/TimeBox";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product }: { product: HotProduct }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(product.offerEnds));
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(product.offerEnds));
        }, 1000);
        return () => clearInterval(timer);
    }, [product.offerEnds]);

    const totalStock = product.totalStock || (product.sold + product.available);
    const soldPercent = (product.sold / totalStock) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card className="overflow-hidden shadow-md border border-primary/20 py-0 hover:shadow-xl transition-all duration-300 hover:border-primary/40">
                <CardContent className="p-4 flex flex-col gap-3">
                    {/* Product Image */}
                    <motion.div
                        className="relative w-full h-48 overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={product.image || '/placeholder.png'}
                            alt={product.title}
                            fill
                            className="object-cover transform transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Discount Badge */}
                        <motion.span
                            className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded shadow-md"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            {product.discount}% OFF
                        </motion.span>

                        {/* Hover Overlay */}
                        {isHovered && (
                            <motion.div
                                className="absolute inset-0 bg-black/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link href={`/products/${product.slug}`} className="group">
                            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                                {product.title}
                            </h3>
                        </Link>

                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-primary font-bold text-xl">
                                ${product.price.toFixed(2)}
                            </p>
                            <p className="text-gray-500 line-through text-sm">
                                ${product.original_price?.toFixed(2) || (product.price / (1 - product.discount/100)).toFixed(2)}
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-sm ${
                                        i < Math.round(product.rating || 0)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                >
                  ★
                </span>
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                ({product.rating?.toFixed(1) || '0.0'})
              </span>
                        </div>
                    </motion.div>

                    {/* Sold Progress */}


                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-r from-red-50 to-orange-50 p-3 mt-2 text-center rounded-lg border border-red-100"
                    >
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <span className="text-xs text-red-500 animate-pulse">⏰</span>
                            <p className="text-sm font-medium text-red-600">
                                Hurry up! Offer ends in:
                            </p>
                        </div>
                        <div className="flex justify-center gap-2 text-sm font-semibold">
                            <TimeBox value={timeLeft.days} label="D" />
                            <span className="text-red-400">:</span>
                            <TimeBox value={timeLeft.hours} label="H" />
                            <span className="text-red-400">:</span>
                            <TimeBox value={timeLeft.minutes} label="M" />
                            <span className="text-red-400">:</span>
                            <TimeBox value={timeLeft.seconds} label="S" />
                        </div>
                    </motion.div>

                    {/* Shop Now Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link href={`/products/${product.slug}`}>
                            <Button
                                variant="default"
                                className={cn(
                                    "mt-3 w-full bg-gradient-to-r from-primary to-red-500 text-white hover:from-primary/90 hover:to-red-600 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                                )}
                            >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Shop Now
                            </Button>
                        </Link>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProductCard;