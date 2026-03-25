import { PRODUCTS_BY_SKU } from './products.js';
import { SKU_PIECE_PRICING } from './piece-prices.js';
import { SKU_PROMOS } from './promos.js';
import { PRESENTATION_LABELS } from '../constants/presentations.js';

const getDiscountValue = (price, discountPrice) => {
  return typeof discountPrice === 'number' && discountPrice > 0 ? discountPrice : 0;
};

const toPieceVariant = ({ sku, piecePrice, pieceDiscountPrice }) => {
  const baseProduct = PRODUCTS_BY_SKU[sku];
  if (!baseProduct) return null;

  const finalDiscount = getDiscountValue(piecePrice, pieceDiscountPrice);

  return {
    sku,
    cartKey: `${sku}-PIEZA`,
    baseSku: sku,
    imageCategory: baseProduct.category,
    name: `${baseProduct.name} (PIEZA)`,
    category: 'Piezas',
    brand: baseProduct.brand,
    presentation: baseProduct.presentation,
    presentationLabel: PRESENTATION_LABELS[baseProduct.presentation] || baseProduct.presentation,
    price: piecePrice,
    discountPrice: finalDiscount,
    deposit: 0,
    variantType: 'piece',
  };
};

const toPromoVariant = ({ sku, quantity, promoPrice, promoDiscountPrice }) => {
  const baseProduct = PRODUCTS_BY_SKU[sku];
  if (!baseProduct) return null;

  const finalDiscount = getDiscountValue(promoPrice, promoDiscountPrice);

  return {
    sku,
    cartKey: `${sku}-PROMO-${quantity}`,
    baseSku: sku,
    imageCategory: baseProduct.category,
    name: `${baseProduct.name} (${quantity}x promo)`,
    category: 'Promos',
    brand: baseProduct.brand,
    presentation: baseProduct.presentation,
    presentationLabel: PRESENTATION_LABELS[baseProduct.presentation] || baseProduct.presentation,
    price: promoPrice,
    discountPrice: finalDiscount,
    deposit: 0,
    variantType: 'promo',
  };
};

export const PIECE_PRODUCTS = SKU_PIECE_PRICING.map(toPieceVariant).filter(Boolean);
export const PROMO_PRODUCTS = SKU_PROMOS.map(toPromoVariant).filter(Boolean);
