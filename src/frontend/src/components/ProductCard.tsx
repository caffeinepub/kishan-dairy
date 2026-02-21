import { Plus, Zap } from 'lucide-react';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  isLoading?: boolean;
}

export default function ProductCard({ product, onAddToCart, isLoading }: ProductCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300">
      <div className="aspect-square bg-secondary/30 flex items-center justify-center p-6 relative">
        <img
          src={product.imageRef}
          alt={product.name}
          className="w-full h-full object-contain"
        />
        {product.isInstant && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-semibold">Instant</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              ₹{Number(product.price)}
            </p>
            <p className="text-xs text-muted-foreground">per {product.unit}</p>
          </div>
          
          <button
            onClick={() => onAddToCart(product.productId)}
            disabled={isLoading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
