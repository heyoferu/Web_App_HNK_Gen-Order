import { formatCurrency, getImagePath, getProductDiscountPercent, getProductUnitPrice, hasProductDiscount } from '../../../shared/utils';

const PrintableReceipt = ({ cart, subtotal, depositTotal, total, refProp, chargeDeposit, showPrices }) => {
  return (
    <div ref={refProp} className="hidden print:block bg-white p-10 max-w-auto mx-auto" id="printable-area">
      <div className="border-b-4 border-green-700 pb-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {showPrices ? 'PEDIDO' : 'LISTA'}
          </h1>
          <p className="text-gray-500 mt-1">HNKGen Comercial</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Fecha</p>
          <p className="font-medium">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <table className="w-full mb-8 table-auto">
        <thead>
          <tr className="border-b border-gray-200 text-left text-sm text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-3 w-20">Imagen</th>
            <th className="py-3 px-3">Producto</th>
            <th className="py-3 px-3 text-center w-20">Cant.</th>
            {showPrices && <th className="py-3 px-3 text-right w-28">Precio</th>}
            {showPrices && <th className="py-3 px-3 text-right w-28">Total</th>}
          </tr>
        </thead>
        <tbody>
          {Object.values(cart).map(({ product, quantity }) => {
            const unitPrice = getProductUnitPrice(product);
            const hasDiscount = hasProductDiscount(product);
            const discountPercent = getProductDiscountPercent(product);

            return (
              <tr key={product.sku} className="border-b border-gray-100 text-sm align-top">
                <td className="py-3 px-3">
                  <img
                    src={getImagePath(product.sku, product.imageCategory || product.category)}
                    alt={product.name}
                    className="w-20 h-20 object-contain rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </td>
                <td className="py-3 px-3 align-middle">
                  <span className="font-semibold text-gray-800 text-lg leading-snug">{product.name}</span>
                  <br />
                  <span className="text-xs text-gray-500">SKU: {product.sku}</span>
                  {hasDiscount && <span className="ml-2 inline-block text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">-{discountPercent}%</span>}
                </td>
                <td className="py-3 px-3 text-center font-medium text-lg align-middle">{quantity}</td>
                {showPrices && (
                  <td className="py-3 px-3 text-right text-gray-600 align-middle">
                    {formatCurrency(unitPrice)}
                    {hasDiscount && <span className="block text-[11px] text-gray-400 line-through">{formatCurrency(product.price)}</span>}
                  </td>
                )}
                {showPrices && (
                  <td className="py-3 px-3 text-right font-bold text-gray-900 align-middle">
                    {formatCurrency(unitPrice * quantity)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPrices && (
        <div className="flex justify-end">
          <div className="w-1/3 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span className="pr-4">Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {depositTotal > 0 && chargeDeposit && (
              <div className="flex justify-between text-amber-700">
                <span>Envase:</span>
                <span>{formatCurrency(depositTotal)}</span>
              </div>
            )}
            {!chargeDeposit && (
              <div className="flex justify-between text-gray-400 italic text-sm">
                <span>Envase (Retornable):</span>
                <span>$0.00</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-extrabold text-gray-900 pt-3 border-t border-dashed border-gray-300">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintableReceipt;
