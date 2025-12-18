import React from "react";
import ProductItem from "./product-item";
import { PRODUCTS_DATA } from "@/constant/productsData";
import Pagination from "./pagination";

interface Props {
  query: Record<string, string>;
}

const ProductList: React.FC<Props> = async ({ query }) => {
  if (PRODUCTS_DATA.length < 1) {
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
        {PRODUCTS_DATA.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>

      {/* <Pagination page={3} pages={50} /> */}
    </>
  );
};

export default ProductList;
