import { useMemo, useRef, useState } from 'react';
import { formatCurrency, getProductUnitPrice } from '../../../shared/utils';
import PrintableReceipt from './PrintableReceipt';
import CartSidebarBody from './sidebar/CartSidebarBody';
import CartSidebarFooter from './sidebar/CartSidebarFooter';
import CartSidebarHeader from './sidebar/CartSidebarHeader';

const buildOrderText = ({ cart, showPrices, subtotal, depositTotal, total, chargeDeposit }) => {
  const lines = [showPrices ? 'PEDIDO HNKGEN' : 'LISTA DE SURTIDO', ''];

  Object.values(cart).forEach((item) => {
    lines.push(`- (${item.quantity}) ${item.product.name} | SKU: ${item.product.sku}`);
  });

  if (showPrices) {
    lines.push('');
    lines.push(`Subtotal: ${formatCurrency(subtotal)}`);
    lines.push(`Envase: ${chargeDeposit ? formatCurrency(depositTotal) : '$0.00 (Intercambio)'}`);
    lines.push(`TOTAL: ${formatCurrency(total)}`);
  }

  return lines.join('\n');
};

const CartSidebar = ({ cart, onUpdateCart, isOpen, onClose }) => {
  const receiptRef = useRef(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isCopyingText, setIsCopyingText] = useState(false);
  const [chargeDeposit, setChargeDeposit] = useState(false);
  const [showPrices, setShowPrices] = useState(true);

  const subtotal = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + getProductUnitPrice(item.product) * item.quantity, 0);
  }, [cart]);

  const depositTotal = useMemo(() => {
    if (!chargeDeposit) return 0;
    return Object.values(cart).reduce((sum, item) => sum + item.product.deposit * item.quantity, 0);
  }, [cart, chargeDeposit]);

  const total = subtotal + depositTotal;
  const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  const handleCopyText = async () => {
    const text = buildOrderText({ cart, showPrices, subtotal, depositTotal, total, chargeDeposit });
    setIsCopyingText(true);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      alert('Texto copiado al portapapeles.');
    } catch (err) {
      console.error('Error copying order text:', err);
      alert('No se pudo copiar el texto.');
    } finally {
      setIsCopyingText(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    if (!window.html2canvas) {
      alert('Cargando librería de imágenes, intenta de nuevo en un segundo...');
      return;
    }

    setIsGeneratingImage(true);
    const element = receiptRef.current;

    element.classList.remove('hidden');
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.zIndex = '-1';

    try {
      const canvas = await window.html2canvas(element, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        imageTimeout: 15000,
      });

      const link = document.createElement('a');
      const filename = showPrices ? 'Pedido-HNKGen-' : 'Lista-Surtido-';
      link.download = `${filename}${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
      alert('Hubo un error al generar la imagen.');
    } finally {
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
      <PrintableReceipt
        refProp={receiptRef}
        cart={cart}
        subtotal={subtotal}
        depositTotal={depositTotal}
        total={total}
        chargeDeposit={chargeDeposit}
        showPrices={showPrices}
      />

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity print:hidden" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 print:hidden">
        <CartSidebarHeader itemCount={itemCount} onClose={onClose} />

        <CartSidebarBody cart={cart} showPrices={showPrices} onUpdateCart={onUpdateCart} onClose={onClose} />

        <CartSidebarFooter
          hasItems={Object.values(cart).length > 0}
          chargeDeposit={chargeDeposit}
          setChargeDeposit={setChargeDeposit}
          showPrices={showPrices}
          setShowPrices={setShowPrices}
          subtotal={subtotal}
          depositTotal={depositTotal}
          cart={cart}
          total={total}
          isGeneratingImage={isGeneratingImage}
          isCopyingText={isCopyingText}
          onPrint={handlePrint}
          onDownloadImage={handleDownloadImage}
          onCopyText={handleCopyText}
        />
      </div>
    </>
  );
};

export default CartSidebar;
