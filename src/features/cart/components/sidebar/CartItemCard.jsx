import { Beer, Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency, getImagePath, getProductDiscountPercent, getProductUnitPrice, hasProductDiscount } from '../../../../shared/utils';

const CartItemCard = ({ item, showPrices, onUpdateCart, onRemoveItem }) => {
  const unitPrice = getProductUnitPrice(item.product);
  const hasDiscount = hasProductDiscount(item.product);
  const discountPercent = getProductDiscountPercent(item.product);

  return (
    <div className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
        <img
          src={getImagePath(item.product.sku, item.product.imageCategory || item.product.category)}
          alt=""
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <Beer size={20} className="text-gray-300 hidden" />
      </div>

      <div className="flex-grow">
        <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-mono text-gray-500">{item.product.sku}</span>
          {hasDiscount && <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 rounded">-{discountPercent}%</span>}
          {item.product.deposit > 0 && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 rounded">Envase</span>}
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className={`font-bold ${showPrices ? 'text-green-700' : 'text-gray-300 select-none blur-sm'}`}>
            {formatCurrency(unitPrice * item.quantity)}
            {hasDiscount && showPrices && <span className="block text-[11px] text-gray-400 line-through">{formatCurrency(item.product.price * item.quantity)}</span>}
          </span>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
            <button
              onClick={() => onUpdateCart(item.product, item.quantity - 1)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <Minus size={14} />
            </button>

            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>

            <button
              onClick={() => onUpdateCart(item.product, item.quantity + 1)}
              className="text-gray-500 hover:text-green-600 transition-colors"
            >
              <Plus size={14} />
            </button>

            <button
              onClick={() => onRemoveItem(item.product)}
              className="text-gray-500 hover:text-red-600 transition-colors"
              title="Eliminar item"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
