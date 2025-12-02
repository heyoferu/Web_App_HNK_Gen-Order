import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Plus, Minus, Trash2, X, Receipt, Beer, AlertCircle, ChevronRight, Download, Printer, Share2, CircleDollarSign, Eye, EyeOff } from 'lucide-react';

/**
 * PRODUCT DATA FROM IMAGES
 * Extracted from provided screenshots.
 */
const PRODUCTS = [
  { sku: '139017', name: 'TECATE LIGHT 1X20 BOT 190ML', price: 160, deposit: 105, category: 'Tecate' },
  { sku: '139035', name: 'TECATE 12/1 LT1/4 1.18L v0', price: 480, deposit: 105, category: 'Tecate' },
  { sku: '139282', name: 'TECATE PREMIER 1X20 BOT 190ML', price: 160, deposit: 105, category: 'Tecate' },
  { sku: '139297', name: 'XX LAGER 1X20 BOT 190ML', price: 170, deposit: 105, category: 'XX' },
  { sku: '139371', name: 'XX LAGER 4X6 LAT 355ML', price: 456, deposit: 0, category: 'XX' },
  { sku: '139373', name: 'TECATE LIGHT TC 4X6 LAT 355ML', price: 432, deposit: 0, category: 'Tecate' },
  { sku: '139374', name: 'TECATE 4X6 LAT 355ML', price: 432, deposit: 0, category: 'Tecate' },
  { sku: '139376', name: 'TECATE 1x12 BOT 940ml v0', price: 432, deposit: 105, category: 'Tecate' },
  { sku: '139988', name: 'INDIO 12/1 1x12 BOT 1.18L', price: 480, deposit: 105, category: 'Indio' },
  { sku: '139989', name: 'TECATE LIGHT 12/1 1x12 BOT 1.18L', price: 480, deposit: 105, category: 'Tecate' },
  { sku: '141334', name: 'XX LAGER 1X12 BOT 1.18L', price: 528, deposit: 105, category: 'XX' },
  { sku: '141866', name: 'SOL CLAMATO 1x24L LOOSE 16OZ', price: 624, deposit: 0, category: 'Sol' },
  { sku: '142586', name: 'XX LAGER 1x24L LOOSE 16OZ', price: 600, deposit: 0, category: 'XX' },
  { sku: '143195', name: 'HEINEKEN RET 1X12 BOT 1000ML', price: 528, deposit: 105, category: 'Heineken' },
  { sku: '143276', name: 'SOL CHELADA 1X24 LAT 16 OZ', price: 624, deposit: 0, category: 'Sol' },
  { sku: '143754', name: 'TECATE LOOSE 1X24 16OZ', price: 552, deposit: 0, category: 'Tecate' },
  { sku: '143755', name: 'TECATE LIGHT LOOSE 1X24 16OZ', price: 552, deposit: 0, category: 'Tecate' },
  { sku: '143774', name: 'INDIO 1X24 LOOSE 16OZ', price: 552, deposit: 0, category: 'Indio' },
  { sku: '144105', name: 'AMSTEL ULTRA 4X6 LAT 355ML', price: 492, deposit: 0, category: 'Amstel' },
  { sku: '144144', name: 'AMSTEL ULTRA 4X6 BOT 355ML', price: 516, deposit: 0, category: 'Amstel' },
  { sku: '144715', name: 'HEINEKEN 0.0% 2X6 LAT 355ML', price: 240, deposit: 0, category: 'Heineken' },
  { sku: '144765', name: 'STRONGBOW RED BERRIES 1X12 BOT 330', price: 300, deposit: 0, category: 'Strongbow' },
  { sku: '144693', name: 'STRONGBOW GOLD APPLE 1X12 BOT 330', price: 300, deposit: 0, category: 'Strongbow' },
  { sku: '144985', name: 'SUPERIOR 1X24 LAT LOOSE 12OZ', price: 312, deposit: 0, category: 'Superior' },
  { sku: '145164', name: 'AMSTEL ULTRA 1X20 BOT 190ML', price: 180, deposit: 105, category: 'Amstel' },
  { sku: '140117', name: 'BOHEMIA OSCURA NR 4X6 BOT 355ML', price: 600, deposit: 0, category: 'Bohemia' },
  { sku: '146017', name: 'SOL MANGOYADA 1X24 LAT 16OZ', price: 624, deposit: 0, category: 'Sol' },
  { sku: '146167', name: 'HEINEKEN SILVER 2X6 LAT SLEEK 12OZ', price: 264, deposit: 0, category: 'Heineken' },
  { sku: '146575', name: 'AMSTEL ULTRA 1X12 LAT 24OZ', price: 432, deposit: 0, category: 'Amstel' },
  // 710Ml 24oz tecate
  { sku: '139037', name: 'TECATE 1X12 LAT 24OZ', price: 432, deposit: 0, category: 'Tecate' },
  { sku: '139038', name: 'TECATE LIGHT 1X12 LAT 24OZ', price: 432, deposit: 0, category: 'Tecate' },

  { sku: '144114', name: 'Miller High Life 1x12 BOT 940ML', price: 420, deposit: 0, category: 'Miller' },
];

/**
 * UTILS
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

const getImagePath = (sku) => `/assets/products/${sku}.png`;

/**
 * COMPONENTS
 */

const ProductImage = ({ sku, name }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
        <Beer size={48} className="mb-2 opacity-50" />
        <span className="text-xs font-medium px-4 text-center">{name}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-white p-4 flex items-center justify-center overflow-hidden relative group">
       {/* Using object-contain to preserve aspect ratio of beer bottles/cans.
          Adding a gentle hover scale for material feel.
       */}
      <img
        src={getImagePath(sku)}
        alt={name}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
};

const ProductCard = ({ product, cartQuantity, onUpdateCart }) => {
  const isSelected = cartQuantity > 0;

  return (
    <div className={`
      flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300
      ${isSelected ? 'ring-2 ring-green-600 shadow-lg scale-[1.01]' : 'shadow-md hover:shadow-xl'}
    `}>
      <ProductImage sku={product.sku} name={product.name} />
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between items-start gap-2">
             <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] tracking-wide">
              {product.name}
            </h3>
          </div>
          <div className="text-xs text-gray-500 mt-1 mb-3 font-mono">SKU: {product.sku}</div>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
            {product.deposit > 0 && (
              <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                + {formatCurrency(product.deposit)} dep.
              </span>
            )}
          </div>

          {/* Stepper Control */}
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
            
            <span className={`font-semibold text-lg w-12 text-center ${cartQuantity > 0 ? 'text-green-800' : 'text-gray-400'}`}>
              {cartQuantity}
            </span>

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

// Hidden printable receipt component
const PrintableReceipt = ({ img, cart, subtotal, depositTotal, total, refProp, chargeDeposit, showPrices }) => {
  return (
    <div ref={refProp} className="hidden print:block bg-white p-8 max-w-auto mx-auto" id="printable-area">
      <div className="border-b-2 border-green-600 pb-4 mb-6 flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">
             {showPrices ? "PEDIDO" : "LISTA"}
           </h1>
           <p className="text-gray-500">Heineken México</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Fecha</p>
          <p className="font-medium">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200 text-left text-sm text-gray-500 uppercase tracking-wider">
            <th className='py-2'>Imagen</th>
            <th className="py-2">Producto</th>
            <th className="py-2 text-center">Cant.</th>
            {showPrices && <th className="py-2 text-right">Precio</th>}
            {showPrices && <th className="py-2 text-right">Total</th>}
          </tr>
        </thead>
        <tbody>
          {Object.values(cart).map(({ product, quantity }) => (
            <tr key={product.sku} className="border-b border-gray-100 text-sm">
              <td><img src={getImagePath(product.sku)} alt={product.name} className="max-w-12 max-h-12 object-cover rounded" onError={(e) => { e.target.style.display='none'; }} /></td>
              <td className="py-3">
                <span className="font-bold text-gray-800">{product.name}</span>
                <br/>
                <span className="text-xs text-gray-500">SKU: {product.sku}</span>
              </td>
              <td className="py-3 text-center font-medium text-lg">{quantity}</td>
              {showPrices && <td className="py-3 text-right text-gray-600">{formatCurrency(product.price)}</td>}
              {showPrices && <td className="py-3 text-right font-bold text-gray-900">{formatCurrency(product.price * quantity)}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      {showPrices && (
        <div className="flex justify-end">
          <div className="w-1/2 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
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
                <span>Envase (Intercambio):</span>
                <span>$0.00</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-300">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CartSidebar = ({ cart, onUpdateCart, isOpen, onClose }) => {
  const receiptRef = useRef(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [chargeDeposit, setChargeDeposit] = useState(false);
  const [showPrices, setShowPrices] = useState(true);

  const subtotal = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [cart]);

  const depositTotal = useMemo(() => {
    if (!chargeDeposit) return 0;
    return Object.values(cart).reduce((sum, item) => sum + (item.product.deposit * item.quantity), 0);
  }, [cart, chargeDeposit]);

  const total = subtotal + depositTotal;
  const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  const handleCopyText = () => {
    let text = showPrices ? `🍺 *PEDIDO HEINEKEN MÉXICO* 🍺\n\n` : `📋 *LISTA DE SURTIDO* 📋\n\n`;
    
    Object.values(cart).forEach(item => {
      text += `• (${item.quantity}) ${item.product.name} - SKU: ${item.product.sku}\n`;
    });

    if (showPrices) {
      text += `\n💰 *Subtotal:* ${formatCurrency(subtotal)}`;
      if (depositTotal > 0) {
        text += `\n📦 *Envase:* ${formatCurrency(depositTotal)}`;
      } else if (!chargeDeposit) {
         text += `\n📦 *Envase:* $0.00 (Intercambio)`;
      }
      text += `\n✅ *TOTAL:* ${formatCurrency(total)}`;
    }
    
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    alert("¡Texto copiado al portapapeles!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    if (!window.html2canvas) {
      alert("Cargando librería de imágenes, intenta de nuevo en un segundo...");
      return;
    }

    setIsGeneratingImage(true);
    const element = receiptRef.current;
    
    // Temporarily show the hidden receipt for capture
    element.classList.remove('hidden');
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '-1';
    
    try {
      const canvas = await window.html2canvas(element, {
        scale: 2, // Higher quality
        backgroundColor: '#ffffff',
        logging: false 
      });
      
      const link = document.createElement('a');
      const filename = showPrices ? `Pedido-Heineken-` : `Lista-Surtido-`;
      link.download = `${filename}${new Date().toISOString().slice(0,10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
      alert("Hubo un error al generar la imagen.");
    } finally {
      // Hide it again
      element.classList.add('hidden');
      element.style.position = '';
      element.style.top = '';
      element.style.left = '';
      element.style.zIndex = '';
      setIsGeneratingImage(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Hidden Receipt for Print/Image Generation */}
      <PrintableReceipt 
        refProp={receiptRef}
        cart={cart}
        subtotal={subtotal}
        depositTotal={depositTotal}
        total={total}
        chargeDeposit={chargeDeposit}
        showPrices={showPrices}
      />

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity print:hidden" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 print:hidden">
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
          <button 
            onClick={onClose}
            className="p-2 hover:bg-green-100 rounded-full text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {Object.values(cart).length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingCart size={64} strokeWidth={1} />
              <p className="text-lg">Tu carrito está vacío</p>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            Object.values(cart).map((item) => (
              <div key={item.product.sku} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img 
                    src={getImagePath(item.product.sku)} 
                    alt="" 
                    className="w-full h-full object-contain p-1"
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
                  />
                  <Beer size={20} className="text-gray-300 hidden" />
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-gray-500">{item.product.sku}</span>
                    {item.product.deposit > 0 && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 rounded">Envase</span>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`font-bold ${showPrices ? 'text-green-700' : 'text-gray-300 select-none blur-sm'}`}>
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                    
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => onUpdateCart(item.product, item.quantity - 1)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateCart(item.product, item.quantity + 1)}
                        className="text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {Object.values(cart).length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 space-y-4">
            
            {/* TOGGLE OPTIONS */}
            <div className="grid grid-cols-2 gap-3">
              {/* Toggle Envase */}
              <div 
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${chargeDeposit ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 border-gray-100'}`}
              >
                <div className="flex items-center gap-2">
                  <CircleDollarSign size={18} className={chargeDeposit ? "text-amber-700" : "text-gray-400"}/>
                  <span className={`text-xs font-medium ${chargeDeposit ? "text-amber-900" : "text-gray-500"}`}>Envase</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={chargeDeposit}
                    onChange={(e) => setChargeDeposit(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              {/* Toggle Prices */}
              <div 
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${showPrices ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}
              >
                <div className="flex items-center gap-2">
                  {showPrices ? <Eye size={18} className="text-blue-700"/> : <EyeOff size={18} className="text-gray-400"/>}
                  <span className={`text-xs font-medium ${showPrices ? "text-blue-900" : "text-gray-500"}`}>Precios</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showPrices}
                    onChange={(e) => setShowPrices(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {showPrices && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className={`flex justify-between text-sm transition-colors ${chargeDeposit && depositTotal > 0 ? 'text-amber-700' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1">
                    <AlertCircle size={12} /> 
                    Envase {chargeDeposit ? '' : '(Intercambio)'}
                  </span>
                  <span className={!chargeDeposit ? 'line-through decoration-1' : ''}>
                    {formatCurrency(chargeDeposit ? depositTotal : (Object.values(cart).reduce((sum, item) => sum + (item.product.deposit * item.quantity), 0)))}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-dashed border-gray-200">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={handlePrint}
                className="col-span-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex flex-col items-center justify-center gap-1 text-xs"
                title="Imprimir o Guardar como PDF"
              >
                <Printer size={18} />
                PDF / Print
              </button>
              
              <button 
                onClick={handleDownloadImage}
                disabled={isGeneratingImage}
                className="col-span-1 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex flex-col items-center justify-center gap-1 text-xs"
                title="Descargar Imagen del Ticket"
              >
                {isGeneratingImage ? <div className="animate-spin w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full"/> : <Download size={18} />}
                Imagen
              </button>

              <button 
                onClick={handleCopyText}
                className="col-span-1 py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-colors flex flex-col items-center justify-center gap-1 text-xs"
                title="Copiar Texto para WhatsApp"
              >
                <Share2 size={18} />
                Copiar
              </button>
            </div>
            
            <button 
              onClick={handleCopyText}
              className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:bg-green-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Receipt size={20} />
              Terminar {showPrices ? 'Pedido' : 'Lista'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Simple Icon for the header
const ShoppingBasketIcon = ({ size = 24, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m5 11 4-7" />
    <path d="m19 11-4-7" />
    <path d="M2 11h20" />
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
    <path d="m9 11 1 9" />
    <path d="m4.5 11-.1 9" />
    <path d="m15 11-1 9" />
    <path d="m19.5 11 .1 9" />
  </svg>
);

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load html2canvas script dynamically
  useEffect(() => {
    if (!document.querySelector('script[src*="html2canvas"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    return ['Todos', ...new Set(PRODUCTS.map(p => p.category))].sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.sku.includes(searchTerm);
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Cart Logic
  const handleUpdateCart = (product, newQuantity) => {
    setCart(prev => {
      if (newQuantity <= 0) {
        const { [product.sku]: removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [product.sku]: { product, quantity: newQuantity }
      };
    });
  };

  const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-gray-900 pb-20 md:pb-0">
      <style>{`@media print { body * { visibility: hidden; } #printable-area, #printable-area * { visibility: visible; } #printable-area { position: absolute; left: 0; top: 0; width: 100%; display: block !important; } }`}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            
            {/* Logo area */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                <span className="text-xl font-black">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Heineken</h1>
                <span className="text-xs text-green-600 font-medium tracking-wider uppercase">Generador de Pedidos</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-grow max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar cerveza o SKU..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Desktop Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
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
          </div>

          {/* Categories Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedCategory === cat 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:hidden">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-200 p-6 rounded-full mb-4">
              <Search size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">No se encontraron productos</h3>
            <p className="text-gray-500 mt-2">Intenta buscar con otro nombre o SKU.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
              className="mt-6 text-green-600 font-medium hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.sku}
                product={product}
                cartQuantity={cart[product.sku]?.quantity || 0}
                onUpdateCart={handleUpdateCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* MOBILE FAB */}
      <div className="fixed bottom-6 right-6 md:hidden z-20 print:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
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

      {/* CART SIDEBAR */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onUpdateCart={handleUpdateCart} 
      />
    </div>
  );
}
