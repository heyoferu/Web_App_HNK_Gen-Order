import CartEmptyState from './CartEmptyState';
import CartItemCard from './CartItemCard';

const CartSidebarBody = ({ cart, showPrices, onUpdateCart, onRemoveItem, onClose }) => {
  const items = Object.values(cart);

  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {items.length === 0 ? (
        <CartEmptyState onClose={onClose} />
      ) : (
        items.map((item) => (
          <CartItemCard
            key={item.product.sku}
            item={item}
            showPrices={showPrices}
            onUpdateCart={onUpdateCart}
            onRemoveItem={onRemoveItem}
          />
        ))
      )}
    </div>
  );
};

export default CartSidebarBody;
