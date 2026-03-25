import { AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../../../shared/utils';

const CartSummary = ({ subtotal, chargeDeposit, depositTotal, cart, total, availableCash, setAvailableCash }) => {
  const hectolitersApprox = subtotal / 3700;
  const parsedCash = Number(availableCash);
  const hasCash = !Number.isNaN(parsedCash) && parsedCash > 0;
  const cashDelta = hasCash ? parsedCash - total : 0;
  const purchaseCoverage = hasCash ? Math.min(100, (parsedCash / total) * 100) : 0;

  return (
    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className={`flex justify-between text-sm transition-colors ${chargeDeposit && depositTotal > 0 ? 'text-amber-700' : 'text-gray-400'}`}>
        <span className="flex items-center gap-1">
          <AlertCircle size={12} />
          Envase {chargeDeposit ? '' : '(Retornable)'}
        </span>
        <span className={!chargeDeposit ? 'line-through decoration-1' : ''}>
          {formatCurrency(
            chargeDeposit
              ? depositTotal
              : Object.values(cart).reduce((sum, item) => sum + item.product.deposit * item.quantity, 0),
          )}
        </span>
      </div>

      <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 pt-2 border-t border-dashed border-gray-300">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-2">
        <label className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Efectivo disponible</label>
        <input
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          value={availableCash}
          onChange={(e) => setAvailableCash(e.target.value)}
          placeholder="Ej. 2,500"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />

        {hasCash ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs sm:text-sm space-y-1">
            <p className="text-gray-600">
              Con este pedido cubririas aproximadamente <span className="font-semibold">{purchaseCoverage.toFixed(1)}%</span> de tu efectivo.
            </p>
            <p className={cashDelta >= 0 ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
              {cashDelta >= 0 ? `Sobrante estimado: ${formatCurrency(cashDelta)}` : `Faltante estimado: ${formatCurrency(Math.abs(cashDelta))}`}
            </p>
          </div>
        ) : (
          <p className="text-[11px] text-gray-500">Ingresa tu efectivo para estimar rapidamente si el pedido te alcanza.</p>
        )}
      </div>

      <div className="pt-2 border-t border-gray-100 space-y-1">
        <p className="text-xs font-semibold text-gray-700">Aproximado: {hectolitersApprox.toFixed(2)} hL</p>
        <p className="text-[11px] text-red-600 font-medium">Disclaimer: referencia estimada de {formatCurrency(3700)} por hL, sin envase.</p>
      </div>
    </div>
  );
};

export default CartSummary;
