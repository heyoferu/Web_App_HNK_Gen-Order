import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS, PRODUCTS_BY_SKU } from '../src/features/catalog/data/index.js';
import { SKU_PIECE_PRICING } from '../src/features/catalog/data/piece-prices.js';
import { SKU_PROMOS } from '../src/features/catalog/data/promos.js';

const root = process.cwd();
const imagesRoot = path.join(root, 'public', 'assets', 'products');

const slugifyBrand = (brand) => {
  const folderMap = {
    'Heineken 0.0': 'heineken',
    'Miller High Life': 'miller',
    'Sol Mezclas': 'sol',
    'Tecate 0.0': 'tecate',
    'Tecate Light': 'tecate',
    'Tecate Titanium': 'tecate',
    'XX Lager': 'xx',
    'Dos Equis': 'xx',
    XX: 'xx',
  };

  if (folderMap[brand]) return folderMap[brand];

  return brand
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const errors = [];

const seenSku = new Set();
for (const product of PRODUCTS) {
  if (seenSku.has(product.sku)) {
    errors.push(`Duplicate base SKU in products: ${product.sku}`);
  }
  seenSku.add(product.sku);

  const brandFolder = slugifyBrand(product.brand || product.category);
  const imagePath = path.join(imagesRoot, brandFolder, `${product.sku}.png`);
  if (!fs.existsSync(imagePath)) {
    errors.push(`Missing image for SKU ${product.sku} at ${path.relative(root, imagePath)}`);
  }
}

for (const piece of SKU_PIECE_PRICING) {
  if (!PRODUCTS_BY_SKU[piece.sku]) {
    errors.push(`Piece pricing references unknown SKU: ${piece.sku}`);
  }
}

for (const promo of SKU_PROMOS) {
  if (!PRODUCTS_BY_SKU[promo.sku]) {
    errors.push(`Promo references unknown SKU: ${promo.sku}`);
  }
  if (![2, 6, 20].includes(promo.quantity)) {
    errors.push(`Promo quantity not supported (${promo.quantity}) for SKU ${promo.sku}`);
  }
}

if (errors.length > 0) {
  console.error('Catalog validation failed:');
  errors.forEach((err) => console.error(`- ${err}`));
  process.exit(1);
}

console.log('Catalog validation passed');
