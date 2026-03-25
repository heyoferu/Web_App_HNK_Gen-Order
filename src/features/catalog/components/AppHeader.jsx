import DesktopCartButton from './header/DesktopCartButton';
import HeaderBrand from './header/HeaderBrand';
import HeaderSearch from './header/HeaderSearch';

const AppHeader = ({
  searchTerm,
  onSearchChange,
  cartItemCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
          <HeaderBrand />
          <HeaderSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <DesktopCartButton cartItemCount={cartItemCount} onOpenCart={onOpenCart} />
        </div>

      </div>
    </header>
  );
};

export default AppHeader;
