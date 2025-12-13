import React from "react";
import ProductItem from "./product-item";
import {Product} from "@/types";

interface Props {
    result: Product[];
}

const ProductList: React.FC<Props> = async ({result}) => {
    if (result?.length < 1) {
        return (
            <div className="pt-8">
                <p className="text-2xl font-semibold text-center text-gray-500">
                    No Products found! Try adjusting your search.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {result?.map((product: Product) => (
                    <ProductItem product={product} key={product.id}/>
                ))}
            </div>

            {/* <Pagination page={3} pages={50} /> */}
        </>
    );
};

export default ProductList;
