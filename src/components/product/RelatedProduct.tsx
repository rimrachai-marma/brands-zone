import { getRelatedProducts } from "@/lib/actions/products";
import React from "react";
import ProductItem from "../Products/product-item";

interface Props {
  productId: string;
}

const RelatedProduct: React.FC<Props> = async ({ productId }) => {
  const result = await getRelatedProducts(productId);
  if (!result.data) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl">Related products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {result?.data.map((product, idex) => (
          <ProductItem product={product} key={idex} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
