import { ShoppingCart } from 'lucide-react';

const MobileCartFab = ({ cartItemCount, onOpenCart }) => {
  return (
    <div className="fixed bottom-6 right-6 md:hidden z-20 print:hidden">
      <button
        onClick={onOpenCart}
        className="w-16 h-16 bg-green-600 text-white rounded-2xl shadow-xl shadow-green-300 flex items-center justify-center relative active:scale-95 transition-transform"
      >
        <ShoppingCart size={28} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
            {cartItemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default MobileCartFab;
