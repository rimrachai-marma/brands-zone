"use client";

import {motion} from "framer-motion";
import {PublicVendor, UserProduct} from "@/types";
import React, {useEffect, useState} from "react";
import {getUserRandomProducts} from "@/lib/actions/user/products";
import ProductItem from "@/components/Products/product-item";

interface Props {
    brand: PublicVendor;
}

const BrandProducts = ({brand}: Props) => {

    const [products, setProducts] = useState<UserProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getUserRandomProducts({brand_id: brand.id, is_new: true});

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
    }, [brand.id]);


    if (products.length === 0 || loading) {
        return (
            <motion.div
                className="text-center text-gray-500 border  p-10"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
            >
                No products found for <span className="font-semibold">{brand.shop_name}</span>
                .
            </motion.div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {transition: {staggerChildren: 0.1}},
            }}
        >
            {products?.map((product, idex) => (
                <ProductItem product={product} key={idex}/>
            ))}

        </motion.div>
    );
};

export default BrandProducts;
