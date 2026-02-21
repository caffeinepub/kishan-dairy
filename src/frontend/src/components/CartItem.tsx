import { Minus, Plus, Trash2 } from 'lucide-react';
import type { Product } from '../backend';

interface CartItemProps {
  productId: number;
  quantity: number;
  product?: Product;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  productId,
  quantity,
  product,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  if (!product) {
    return null;
  }

  const subtotal = Number(product.price) * quantity;

  return (
    <div className="bg-card rounded-lg border border-border p-4 flex gap-4">
      <div className="w-24 h-24 bg-secondary/30 rounded-lg flex items-center justify-center flex-shrink-0">
        <img
          src={product.imageRef}
          alt={product.name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            ₹{Number(product.price)} per {product.unit}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(productId, quantity - 1)}
              className="p-1 rounded-md hover:bg-secondary transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(productId, quantity + 1)}
              className="p-1 rounded-md hover:bg-secondary transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-bold text-lg text-primary">₹{subtotal}</p>
            <button
              onClick={() => onRemove(productId)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

