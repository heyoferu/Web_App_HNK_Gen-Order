import { Download, Printer, Receipt, Share2 } from 'lucide-react';

const CartActions = ({ isGeneratingImage, isCopyingText, onPrint, onDownloadImage, onCopyText, showPrices }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onPrint}
          className="col-span-1 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200 flex flex-col items-center justify-center gap-1 text-xs"
          title="Imprimir o Guardar como PDF"
        >
          <Printer size={18} />
          PDF
        </button>

        <button
          onClick={onDownloadImage}
          disabled={isGeneratingImage}
          className="col-span-1 py-3 bg-sky-50 text-sky-700 rounded-xl font-semibold hover:bg-sky-100 transition-colors border border-sky-200 flex flex-col items-center justify-center gap-1 text-xs"
          title="Descargar Imagen del Ticket"
        >
          {isGeneratingImage ? <div className="animate-spin w-4 h-4 border-2 border-sky-700 border-t-transparent rounded-full" /> : <Download size={18} />}
          Imagen
        </button>

        <button
          onClick={onCopyText}
          disabled={isCopyingText}
          className="col-span-1 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200 flex flex-col items-center justify-center gap-1 text-xs"
          title="Copiar Texto para WhatsApp"
        >
          {isCopyingText ? <div className="animate-spin w-4 h-4 border-2 border-emerald-700 border-t-transparent rounded-full" /> : <Share2 size={18} />}
          {isCopyingText ? 'Copiando...' : 'Copiar'}
        </button>
      </div>

      <button
        onClick={onCopyText}
        className="w-full py-4 bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:from-green-800 hover:to-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <Receipt size={20} />
        Terminar {showPrices ? 'Pedido' : 'Lista'}
      </button>
    </>
  );
};

export default CartActions;
