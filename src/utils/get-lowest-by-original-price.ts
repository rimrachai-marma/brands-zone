import { ProductVariant } from "@/types";

export function getLowestByOriginalPrice(variants: ProductVariant[]) {
  const lowestVariant = variants.reduce((lowest, current) => {
    const lowestPrice = Number(lowest.price);
    const currentPrice = Number(current.price);

    return currentPrice < lowestPrice ? current : lowest;
  });

  return {
    price: Number(lowestVariant.price),
    sale_price: lowestVariant.sale_price
      ? Number(lowestVariant.sale_price)
      : null,
    cost_price: Number(lowestVariant.cost_price),
  };
}
