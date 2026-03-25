import { Eye, EyeOff } from 'lucide-react';

const PricesToggle = ({ showPrices, onChange }) => {
  return (
    <div
      className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${showPrices ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
    >
      <div className="flex items-center gap-2">
        {showPrices ? <Eye size={18} className="text-blue-700" /> : <EyeOff size={18} className="text-gray-400" />}
        <span className={`text-xs font-medium ${showPrices ? 'text-blue-900' : 'text-gray-500'}`}>Precios</span>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={showPrices} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
      </label>
    </div>
  );
};

export default PricesToggle;
