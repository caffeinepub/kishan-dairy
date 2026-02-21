import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { LOGO } from '../utils/images';
import { useCart } from '../context/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={LOGO} alt="Kishan Dairy Logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-2xl font-display font-bold text-primary">Kishan Dairy</h1>
              <p className="text-xs text-muted-foreground">Fresh from the farm</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
              activeProps={{ className: 'text-primary' }}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-foreground hover:text-primary transition-colors font-medium"
              activeProps={{ className: 'text-primary' }}
            >
              Products
            </Link>
          </nav>

          <button
            onClick={() => navigate({ to: '/cart' })}
            className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-6 w-6 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

