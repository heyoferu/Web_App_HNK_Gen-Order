import { CircleDollarSign } from 'lucide-react';

const DepositToggle = ({ chargeDeposit, onChange }) => {
  return (
    <div
      className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${chargeDeposit ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200'}`}
    >
      <div className="flex items-center gap-2">
        <CircleDollarSign size={18} className={chargeDeposit ? 'text-amber-700' : 'text-gray-400'} />
        <span className={`text-xs font-medium ${chargeDeposit ? 'text-amber-900' : 'text-gray-500'}`}>Envase</span>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={chargeDeposit}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600" />
      </label>
    </div>
  );
};

export default DepositToggle;
