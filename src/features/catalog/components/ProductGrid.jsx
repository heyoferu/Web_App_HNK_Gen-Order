import EmptyCatalogState from './grid/EmptyCatalogState';
import ProductList from './grid/ProductList';

const ProductGrid = ({ products, cart, onUpdateCart, onResetFilters }) => {
  if (products.length === 0) {
    return <EmptyCatalogState onResetFilters={onResetFilters} />;
  }

  return <ProductList products={products} cart={cart} onUpdateCart={onUpdateCart} />;
};

export default ProductGrid;
