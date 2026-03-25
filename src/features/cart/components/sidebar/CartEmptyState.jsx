import { ShoppingCart } from 'lucide-react';

const CartEmptyState = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
      <ShoppingCart size={64} strokeWidth={1} />
      <p className="text-lg">Tu carrito está vacío</p>
      <button onClick={onClose} className="px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700">
        Ver Catálogo
      </button>
    </div>
  );
};

export default CartEmptyState;
