import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useGetAvailableProducts } from '../hooks/useQueries';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import DeliveryNotice from '../components/DeliveryNotice';

export default function Products() {
  const { data: products = [], isLoading } = useGetAvailableProducts();
  const { addToCart, isLoading: isAddingToCart } = useCart();

  // Store products in cart context for reference
  useEffect(() => {
    if (products.length > 0) {
      // Access the context's internal state setter through a ref or callback
      // For now, we'll handle this in the CartContext itself
    }
  }, [products]);

  const handleAddToCart = async (productId: number) => {
    await addToCart(productId, 1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Fresh dairy products delivered to your doorstep in Sitamarhi, Bihar
        </p>
      </div>

      <DeliveryNotice />

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No products available at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onAddToCart={handleAddToCart}
              isLoading={isAddingToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

