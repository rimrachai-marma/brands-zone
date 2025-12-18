"use client";
import { HotProduct } from "@/types";
import calculateTimeLeft from "@/utils/calculateTimeLeft";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Progress } from "../ui/progress";
import TimeBox from "@/utils/TimeBox";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ProductCard = ({ product }: { product: HotProduct }) => {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(product.offerEnds)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(product.offerEnds));
    }, 1000);
    return () => clearInterval(timer);
  }, [product.offerEnds]);

  const totalStock = product.sold + product.available;
  const soldPercent = (product.sold / totalStock) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full"
    >
      <Card className="overflow-hidden shadow-md border border-primary/20 py-0 hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-4 flex flex-col gap-3">
         
          <motion.div
            className="relative w-full h-50 overflow-hidden "
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product?.image}
              alt={product?.title}
              fill
              className="object-cover transform transition-transform duration-500 hover:scale-110"
            />
            <motion.span
              className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 "
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {product?.discount}% OFF
            </motion.span>
          </motion.div>
        
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg line-clamp-1">
              {product.title}
            </h3>
            <p className="text-primary font-bold text-xl">${product?.price}</p>
          </motion.div>

     
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              Sold:{" "}
              <span className="font-semibold text-black">{product.sold}</span> /{" "}
              {totalStock}
            </p>
            <Progress value={soldPercent} className="h-2 mt-1" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-secondary/10 p-3 mt-2 text-center "
          >
            <p className="text-sm font-medium text-secondary mb-1">
              Hurry up! Offer ends in:
            </p>
            <div className="flex justify-center gap-2 text-sm font-semibold">
              <TimeBox value={timeLeft.days} label="D" />
              <TimeBox value={timeLeft.hours} label="H" />
              <TimeBox value={timeLeft.minutes} label="M" />
              <TimeBox value={timeLeft.seconds} label="S" />
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="default"
              className={cn(
                "mt-3 w-full bg-primary text-white hover:bg-secondary transition-all"
              )}
            >
              Shop Now
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
