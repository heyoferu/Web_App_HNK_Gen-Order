import { ShoppingCart } from 'lucide-react';

const DesktopCartButton = ({ cartItemCount, onOpenCart }) => {
  return (
    <button
      onClick={onOpenCart}
      className="hidden md:flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-green-200 relative"
    >
      <ShoppingCart size={20} />
      <span>Ver Pedido</span>
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
          {cartItemCount}
        </span>
      )}
    </button>
  );
};

export default DesktopCartButton;
