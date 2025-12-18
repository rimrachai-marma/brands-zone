export const getStockStatus = (stock: number, threshold: number): string => {
  if (stock < 1) return "Out of Stock";

  if (stock <= threshold) return "Low Stock";

  return "In Stock";
};
