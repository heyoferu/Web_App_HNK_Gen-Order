import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../../../shared/utils';

const CartSummary = ({ subtotal, chargeDeposit, depositTotal, cart, total }) => {
  const hectolitersApprox = subtotal / 3700;

  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 bg-white rounded-xl border border-gray-200 p-3">
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className={`flex justify-between text-sm transition-colors ${chargeDeposit && depositTotal > 0 ? 'text-amber-700' : 'text-gray-400'}`}>
        <span className="flex items-center gap-1">
          <AlertCircle size={12} />
          Envase {chargeDeposit ? '' : '(Intercambio)'}
        </span>
        <span className={!chargeDeposit ? 'line-through decoration-1' : ''}>
          {formatCurrency(
            chargeDeposit
              ? depositTotal
              : Object.values(cart).reduce((sum, item) => sum + item.product.deposit * item.quantity, 0),
          )}
        </span>
      </div>

      <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-dashed border-gray-300">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-1">
        <p className="text-xs font-semibold text-gray-700">Aproximado: {hectolitersApprox.toFixed(2)} hL</p>
        <p className="text-[11px] text-red-600 font-medium">Disclaimer: referencia estimada de {formatCurrency(3700)} por hL, sin envase.</p>
      </div>
    </div>
  );
};

export default CartSummary;
