import { Product } from "@/types";
import React, { Suspense } from "react";
import ImageGallery from "./image-gallary";
import ProductInfo from "./product-info";
import Tabs from "./tabs";
import RelatedProduct from "./RelatedProduct";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = async ({ product }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ImageGallery images={product.images} productName={product.name} />
        <ProductInfo product={product} />
      </div>
      <div className="border rounded-lg px-6 py-8">
        <Tabs product={product} />
      </div>
      <Suspense fallback={null}>
        <RelatedProduct productId={product.id} />
      </Suspense>
    </div>
  );
};

export default ProductDetails;
