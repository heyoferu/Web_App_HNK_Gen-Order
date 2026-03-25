import ProductCard from '../ProductCard';

const ProductList = ({ products, cart, onUpdateCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const cartKey = product.cartKey || product.sku;

        return (
        <ProductCard
          key={cartKey}
          product={product}
          cartQuantity={cart[cartKey]?.quantity || 0}
          onUpdateCart={onUpdateCart}
        />
        );
      })}
    </div>
  );
};

export default ProductList;
