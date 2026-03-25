import { X } from 'lucide-react';

const FilterChipsRow = ({ items, selected, counts, onSelect, labelMap }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const count = counts?.[item] ?? 0;
        const isActive = selected === item;
        const isDisabled = count === 0;

        return (
          <button
            key={item}
            onClick={() => !isDisabled && onSelect(item)}
            disabled={isDisabled}
            className={[
              'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border inline-flex items-center gap-1.5',
              isActive
                ? 'bg-green-700 text-white border-green-700 shadow'
                : isDisabled
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-200',
            ].join(' ')}
          >
            <span>{labelMap?.[item] || item}</span>
            <span className={['text-[10px] px-1.5 py-0.5 rounded-full leading-none', isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'].join(' ')}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const FiltersSidebar = ({
  typeFilters,
  typeCounts,
  selectedType,
  onTypeSelect,
  brands,
  brandCounts,
  selectedBrand,
  onBrandSelect,
  presentations,
  presentationLabelMap,
  presentationCounts,
  selectedPresentation,
  onPresentationSelect,
  onClearFilters,
  onClose,
  className = '',
}) => {
  return (
    <aside className={[
      'w-full h-fit bg-white/90 backdrop-blur rounded-2xl border border-gray-200 p-4 shadow-sm',
      className,
    ].join(' ')}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">Filtros</h2>
        <div className="flex items-center gap-2">
          <button onClick={onClearFilters} className="text-xs font-semibold text-green-700 hover:text-green-800">
            Limpiar
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Tipo</p>
          <FilterChipsRow items={typeFilters} selected={selectedType} counts={typeCounts} onSelect={onTypeSelect} />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Marca</p>
          <FilterChipsRow items={brands} selected={selectedBrand} counts={brandCounts} onSelect={onBrandSelect} />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Presentacion</p>
          <FilterChipsRow
            items={presentations}
            selected={selectedPresentation}
            counts={presentationCounts}
            onSelect={onPresentationSelect}
            labelMap={presentationLabelMap}
          />
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
