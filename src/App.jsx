import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { AppHeader, FiltersSidebar, ProductGrid } from './features/catalog/components';
import { PIECE_PRODUCTS, PRODUCTS, PROMO_PRODUCTS } from './features/catalog/data';
import { useCatalogFilters } from './features/catalog/hooks';
import { CartSidebar, MobileCartFab } from './features/cart/components';
import { useCart } from './features/cart/hooks';
import { useHtml2CanvasScript } from './shared/hooks';

const CATALOG_PRODUCTS = [...PRODUCTS, ...PIECE_PRODUCTS, ...PROMO_PRODUCTS];

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { cart, handleUpdateCart, handleRemoveItem, handleClearCart, cartItemCount } = useCart();
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    typeFilters,
    typeCounts,
    selectedBrand,
    setSelectedBrand,
    brands,
    brandCounts,
    selectedPresentation,
    setSelectedPresentation,
    presentations,
    presentationLabelMap,
    presentationCounts,
    filteredProducts,
    clearFilters,
  } = useCatalogFilters(CATALOG_PRODUCTS);

  useHtml2CanvasScript();

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-gray-900 pb-20 md:pb-0">
      <style>{`@media print { body * { visibility: hidden; } #printable-area, #printable-area * { visibility: visible; } #printable-area { position: absolute; left: 0; top: 0; width: 100%; display: block !important; } }`}</style>

      <AppHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:hidden">
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-xs sm:text-sm text-rose-700 font-medium">
            Disclaimer: Este sitio no pertenece ni esta afiliado a Heineken Mexico. La informacion y los precios son de referencia y los cambios pueden tardar en reflejarse.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <FiltersSidebar
            typeFilters={typeFilters}
            typeCounts={typeCounts}
            selectedType={selectedType}
            onTypeSelect={(type) => {
              setSelectedType(type);
              setSelectedBrand('');
              setSelectedPresentation('');
            }}
            brands={brands}
            brandCounts={brandCounts}
            selectedBrand={selectedBrand}
            onBrandSelect={(brand) => {
              setSelectedBrand(brand);
              setSelectedPresentation('');
            }}
            presentations={presentations}
            presentationLabelMap={presentationLabelMap}
            presentationCounts={presentationCounts}
            selectedPresentation={selectedPresentation}
            onPresentationSelect={setSelectedPresentation}
            onClearFilters={clearFilters}
            className="hidden lg:block lg:w-80 lg:sticky lg:top-28"
          />

          <div className="flex-1 min-w-0">
            <ProductGrid
              products={filteredProducts}
              cart={cart}
              onUpdateCart={handleUpdateCart}
              onResetFilters={clearFilters}
            />
          </div>
        </div>

        {isMobileFiltersOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-[92%] max-w-sm z-50 lg:hidden p-3">
              <FiltersSidebar
                typeFilters={typeFilters}
                typeCounts={typeCounts}
                selectedType={selectedType}
                onTypeSelect={(type) => {
                  setSelectedType(type);
                  setSelectedBrand('');
                  setSelectedPresentation('');
                }}
                brands={brands}
                brandCounts={brandCounts}
                selectedBrand={selectedBrand}
                onBrandSelect={(brand) => {
                  setSelectedBrand(brand);
                  setSelectedPresentation('');
                }}
                presentations={presentations}
                presentationLabelMap={presentationLabelMap}
                presentationCounts={presentationCounts}
                selectedPresentation={selectedPresentation}
                onPresentationSelect={setSelectedPresentation}
                onClearFilters={clearFilters}
                onClose={() => setIsMobileFiltersOpen(false)}
                className="h-full overflow-y-auto"
              />
            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-6 left-4 z-20 lg:hidden print:hidden">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-lg text-left text-gray-700"
        >
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal size={16} />
            Filtros
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5 max-w-[42vw] truncate">
            {selectedType} • {selectedBrand || 'Marca'} • {selectedPresentation ? (presentationLabelMap[selectedPresentation] || selectedPresentation) : 'Presentacion'}
          </div>
        </button>
      </div>

      <MobileCartFab cartItemCount={cartItemCount} onOpenCart={() => setIsCartOpen(true)} />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateCart={handleUpdateCart}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
