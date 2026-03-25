import CartActions from './CartActions';
import CartSummary from './CartSummary';
import DepositToggle from './DepositToggle';
import PricesToggle from './PricesToggle';

const CartSidebarFooter = ({
  hasItems,
  chargeDeposit,
  setChargeDeposit,
  showPrices,
  setShowPrices,
  subtotal,
  depositTotal,
  cart,
  total,
  isGeneratingImage,
  isCopyingText,
  onPrint,
  onDownloadImage,
  onCopyText,
}) => {
  if (!hasItems) return null;

  return (
    <div className="p-5 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <DepositToggle chargeDeposit={chargeDeposit} onChange={setChargeDeposit} />
        <PricesToggle showPrices={showPrices} onChange={setShowPrices} />
      </div>

      {showPrices && (
        <CartSummary subtotal={subtotal} chargeDeposit={chargeDeposit} depositTotal={depositTotal} cart={cart} total={total} />
      )}

      <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Exportar y compartir</div>

      <CartActions
        isGeneratingImage={isGeneratingImage}
        isCopyingText={isCopyingText}
        onPrint={onPrint}
        onDownloadImage={onDownloadImage}
        onCopyText={onCopyText}
        showPrices={showPrices}
      />
    </div>
  );
};

export default CartSidebarFooter;
