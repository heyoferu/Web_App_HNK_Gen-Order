import { Trash2, X } from 'lucide-react';
import ShoppingBasketIcon from '../ShoppingBasketIcon';

const CartSidebarHeader = ({ itemCount, onClose, onClearCart }) => {
  return (
    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-green-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 rounded-xl text-green-700">
          <ShoppingBasketIcon size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-green-900">Tu Pedido</h2>
          <p className="text-sm text-green-700">{itemCount} productos</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {itemCount > 0 && (
          <button
            onClick={onClearCart}
            className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
            title="Eliminar todo"
          >
            <Trash2 size={20} />
          </button>
        )}
        <button onClick={onClose} className="p-2 hover:bg-green-100 rounded-full text-gray-500 transition-colors">
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default CartSidebarHeader;
