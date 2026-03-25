import { Search } from 'lucide-react';

const EmptyCatalogState = ({ onResetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-gray-200 p-6 rounded-full mb-4">
        <Search size={48} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700">No se encontraron productos</h3>
      <p className="text-gray-500 mt-2">Intenta buscar con otro nombre o SKU.</p>
      <button onClick={onResetFilters} className="mt-6 text-green-600 font-medium hover:underline">
        Limpiar filtros
      </button>
    </div>
  );
};

export default EmptyCatalogState;
