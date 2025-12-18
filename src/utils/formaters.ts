export const formatCurrency = (
  number: number,
  currency: string,
  type = undefined
) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat(type, {
    currency,
    style: "currency",
  });
  return CURRENCY_FORMATTER.format(number);
};
