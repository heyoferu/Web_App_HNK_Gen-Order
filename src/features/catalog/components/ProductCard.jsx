import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { formatCurrency, getProductDiscountAmount, getProductDiscountPercent, getProductUnitPrice, hasProductDiscount } from '../../../shared/utils';
import ProductImage from './ProductImage';

const ProductCard = ({ product, cartQuantity, onUpdateCart }) => {
  const isSelected = cartQuantity > 0;
  const unitPrice = getProductUnitPrice(product);
  const hasDiscount = hasProductDiscount(product);
  const discountAmount = getProductDiscountAmount(product);
  const discountPercent = getProductDiscountPercent(product);
  const [quantityInput, setQuantityInput] = useState(String(cartQuantity));

  useEffect(() => {
    setQuantityInput(String(cartQuantity));
  }, [cartQuantity]);

  const handleCommitQuantity = () => {
    const parsed = Number.parseInt(quantityInput || '0', 10);
    onUpdateCart(product, Number.isNaN(parsed) ? 0 : Math.max(0, parsed));
  };

  return (
    <div
      className={`
      flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300
      ${isSelected ? 'ring-2 ring-green-600 shadow-lg scale-[1.01]' : 'shadow-md hover:shadow-xl'}
    `}
    >
      <ProductImage sku={product.sku} name={product.name} brand={product.imageCategory || product.category} />

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] tracking-wide">
              {product.name}
            </h3>
          </div>
          <div className="text-xs text-gray-500 mt-1 font-mono">SKU: {product.sku}</div>
          {product.presentationLabel && (
            <div className="text-[11px] text-slate-700 bg-slate-100 inline-block px-2 py-0.5 rounded-full mt-2 mb-3">
              {product.presentationLabel}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline flex-wrap gap-2 mb-4">
            <span className="text-xl font-bold text-rose-700">{formatCurrency(unitPrice)}</span>
            {hasDiscount && <span className="text-xs text-gray-400 line-through">{formatCurrency(product.price)}</span>}
            {hasDiscount && <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">-{discountPercent}%</span>}
            {product.deposit > 0 && (
              <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                + {formatCurrency(product.deposit)} dep.
              </span>
            )}
          </div>

          {hasDiscount && (
            <p className="text-xs text-rose-700 mb-3">Ahorras {formatCurrency(discountAmount)} por unidad</p>
          )}

          <div className="flex items-center justify-between bg-gray-50 rounded-full p-1 border border-gray-200">
            <button
              onClick={() => onUpdateCart(product, Math.max(0, cartQuantity - 1))}
              disabled={cartQuantity === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                cartQuantity === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'bg-white shadow-sm text-green-700 hover:bg-green-50'
              }`}
            >
              <Minus size={18} strokeWidth={2.5} />
            </button>

            <input
              type="number"
              min="0"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
              onBlur={handleCommitQuantity}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              className={`font-semibold text-lg w-12 text-center bg-transparent outline-none border-0 p-0 ${cartQuantity > 0 ? 'text-green-800' : 'text-gray-400'}`}
            />

            <button
              onClick={() => onUpdateCart(product, cartQuantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white shadow-md hover:bg-green-700 active:bg-green-800 transition-colors"
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
