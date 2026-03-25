import { useMemo, useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState({});

  const handleUpdateCart = (product, newQuantity) => {
    const cartKey = product.cartKey || product.sku;

    setCart((prev) => {
      if (newQuantity <= 0) {
        const { [cartKey]: removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [cartKey]: { product, quantity: newQuantity },
      };
    });
  };

  const handleRemoveItem = (product) => {
    const cartKey = product.cartKey || product.sku;

    setCart((prev) => {
      const { [cartKey]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const cartItemCount = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    handleUpdateCart,
    handleRemoveItem,
    handleClearCart,
    cartItemCount,
  };
};

export default useCart;
