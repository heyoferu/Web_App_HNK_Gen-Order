import { Download, Printer, Share2 } from 'lucide-react';

const CartActions = ({ isGeneratingImage, isCopyingText, onPrint, onDownloadImage, onCopyText }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onPrint}
          className="col-span-1 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200 flex flex-col items-center justify-center gap-1 text-[11px] sm:text-xs"
          title="Imprimir o Guardar como PDF"
        >
          <Printer size={18} />
          PDF
        </button>

        <button
          onClick={onDownloadImage}
          disabled={isGeneratingImage}
          className="col-span-1 py-3 bg-sky-50 text-sky-700 rounded-xl font-semibold hover:bg-sky-100 transition-colors border border-sky-200 flex flex-col items-center justify-center gap-1 text-[11px] sm:text-xs"
          title="Descargar Imagen del Ticket"
        >
          {isGeneratingImage ? <div className="animate-spin w-4 h-4 border-2 border-sky-700 border-t-transparent rounded-full" /> : <Download size={18} />}
          Imagen
        </button>

        <button
          onClick={onCopyText}
          disabled={isCopyingText}
          className="col-span-1 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200 flex flex-col items-center justify-center gap-1 text-[11px] sm:text-xs"
          title="Copiar Texto para WhatsApp"
        >
          {isCopyingText ? <div className="animate-spin w-4 h-4 border-2 border-emerald-700 border-t-transparent rounded-full" /> : <Share2 size={18} />}
          {isCopyingText ? 'Copiando...' : 'Copiar'}
        </button>
    </div>
  );
};

export default CartActions;
