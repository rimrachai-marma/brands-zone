import { Product } from "@/types";
import React from "react";
import ImageGallery from "./image-gallary";
import ProductInfo from "./product-info";
import Tabs from "./tabs";
import ProductItem from "../Products/product-item";
import { PRODUCTS_DATA } from "@/constant/productsData";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ImageGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>
      <div className="border rounded-lg px-6 py-8">
        <Tabs product={product} />
      </div>
      {/* <div className="space-y-4">
        <h2 className="font-semibold text-xl">Related products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS_DATA.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProductDetails;
