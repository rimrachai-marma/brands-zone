export const formatCurrency = (
  number: number,
  currency: string,
  type = undefined
) => {
  return new Intl.NumberFormat(type, {
    currency,
    style: "currency",
  }).format(number);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
