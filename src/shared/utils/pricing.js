export const getProductUnitPrice = (product) => {
  const hasValidDiscount = typeof product.discountPrice === 'number' && product.discountPrice > 0;
  return hasValidDiscount ? product.discountPrice : product.price;
};

export const hasProductDiscount = (product) => {
  return typeof product.discountPrice === 'number' && product.discountPrice > 0 && product.discountPrice < product.price;
};

export const getProductDiscountAmount = (product) => {
  if (!hasProductDiscount(product)) return 0;
  return product.price - product.discountPrice;
};

export const getProductDiscountPercent = (product) => {
  if (!hasProductDiscount(product)) return 0;
  return Math.round((getProductDiscountAmount(product) / product.price) * 100);
};
