import {
  AMSTEL_PRODUCTS_BY_CATEGORY,
  BOHEMIA_PRODUCTS_BY_CATEGORY,
  HEINEKEN_PRODUCTS_BY_CATEGORY,
  INDIO_PRODUCTS_BY_CATEGORY,
  MILLER_PRODUCTS_BY_CATEGORY,
  SOL_PRODUCTS_BY_CATEGORY,
  STRONGBOW_PRODUCTS_BY_CATEGORY,
  SUPERIOR_PRODUCTS_BY_CATEGORY,
  TECATE_PRODUCTS_BY_CATEGORY,
  XX_PRODUCTS_BY_CATEGORY,
} from './brands/index.js';
import { PRESENTATION_LABELS } from '../constants/presentations.js';

export const PRODUCTS_BY_CATEGORY = {
  ...AMSTEL_PRODUCTS_BY_CATEGORY,
  ...BOHEMIA_PRODUCTS_BY_CATEGORY,
  ...HEINEKEN_PRODUCTS_BY_CATEGORY,
  ...INDIO_PRODUCTS_BY_CATEGORY,
  ...MILLER_PRODUCTS_BY_CATEGORY,
  ...SOL_PRODUCTS_BY_CATEGORY,
  ...STRONGBOW_PRODUCTS_BY_CATEGORY,
  ...SUPERIOR_PRODUCTS_BY_CATEGORY,
  ...TECATE_PRODUCTS_BY_CATEGORY,
  ...XX_PRODUCTS_BY_CATEGORY,
};

const CATEGORY_META = {
  Amstel: { brand: 'Amstel' },
  Bohemia: { brand: 'Bohemia' },
  Heineken: { brand: 'Heineken' },
  'Heineken 0.0': { brand: 'Heineken' },
  Indio: { brand: 'Indio' },
  'Miller High Life': { brand: 'Miller' },
  'Sol Mezclas': { brand: 'Sol' },
  Strongbow: { brand: 'Strongbow' },
  Superior: { brand: 'Superior' },
  Tecate: { brand: 'Tecate' },
  'Tecate 0.0': { brand: 'Tecate' },
  'Tecate Titanium': { brand: 'Tecate' },
  'Tecate Light': { brand: 'Tecate' },
  'XX Lager': { brand: 'XX' },
};

export const PRODUCTS = Object.entries(PRODUCTS_BY_CATEGORY).flatMap(([category, products]) => {
  const meta = CATEGORY_META[category] || { brand: category };

  return products.map((product) => ({
    ...product,
    category,
    brand: meta.brand,
    presentationLabel: PRESENTATION_LABELS[product.presentation] || product.presentation,
  }));
});

export const PRODUCTS_BY_SKU = PRODUCTS.reduce((acc, product) => {
  acc[product.sku] = product;
  return acc;
}, {});
