import { useState } from 'react';
import { Beer } from 'lucide-react';
import { getImagePath } from '../../../shared/utils';

const ProductImage = ({ sku, name, brand }) => {
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
      <img
        src={getImagePath(sku, brand)}
        alt={name}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
