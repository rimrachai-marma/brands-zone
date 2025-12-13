"use client";

import { Product } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CartButton from "../common/CartButton.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CollectionCard = ({ product }: { product: Product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
      layout
    >
      <Card className="bg-white p-4 gap-3 backdrop-blur-sm border border-primary/20 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative">
        {/* Luminous border on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            boxShadow:
              "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.3)",
          }}
        />

        <CardHeader className="flex flex-col h-full p-0">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-50 ">
            <Link href={`/products/${product.id}`} className="group">
              <Image
                width={120}
                height={120}
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (
                    e.target as HTMLImageElement
                  ).src = `/images/products/placeholder-error.svg`;
                }}
              />
            </Link>
          </div>
        </CardHeader>

        <CardContent className="grow pt-0 px-0">
          <CardTitle className="text-lg font-semibold truncate">
            <Link href={`/products/${product.id}`} className="group">
              {product.title}
            </Link>
          </CardTitle>
        </CardContent>

        <CardFooter className="flex justify-between items-center p-0!">
          <p className="text-xl font-bold">
            ${product.price.toFixed(2)}
          </p>
          <CartButton product={product} />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CollectionCard;
