import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useViewCart, useAddToCart } from '../hooks/useQueries';
import type { Product } from '../backend';

interface CartContextType {
  cartItems: Array<{ productId: number; quantity: number; product?: Product }>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeItem: (productId: number) => void;
  getTotal: () => number;
  getItemCount: () => number;
  isLoading: boolean;
  products: Product[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: backendCart = [], isLoading: isCartLoading } = useViewCart();
  const addToCartMutation = useAddToCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [localCart, setLocalCart] = useState<Array<{ productId: number; quantity: number }>>([]);

  // Sync backend cart to local state
  useEffect(() => {
    if (backendCart) {
      setLocalCart(
        backendCart.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
        }))
      );
    }
  }, [backendCart]);

  const addToCart = async (productId: number, quantity: number) => {
    await addToCartMutation.mutateAsync({
      productId,
      quantity: BigInt(quantity),
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    setLocalCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (productId: number) => {
    setLocalCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const getTotal = () => {
    return localCart.reduce((total, item) => {
      const product = products.find((p) => p.productId === item.productId);
      if (product) {
        return total + Number(product.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const getItemCount = () => {
    return localCart.reduce((count, item) => count + item.quantity, 0);
  };

  const cartItemsWithProducts = localCart.map((item) => ({
    ...item,
    product: products.find((p) => p.productId === item.productId),
  }));

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItemsWithProducts,
        addToCart,
        updateQuantity,
        removeItem,
        getTotal,
        getItemCount,
        isLoading: isCartLoading || addToCartMutation.isPending,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

