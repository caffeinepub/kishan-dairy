import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePlaceOrder } from '../hooks/useQueries';
import { validateName, validatePhoneNumber, validateAddress } from '../utils/validation';
import DeliveryNotice from '../components/DeliveryNotice';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotal } = useCart();
  const placeOrderMutation = usePlaceOrder();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const total = getTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const phoneError = validatePhoneNumber(formData.phone);
    const addressError = validateAddress(formData.address);

    setErrors({
      name: nameError || '',
      phone: phoneError || '',
      address: addressError || '',
    });

    if (nameError || phoneError || addressError) {
      return;
    }

    try {
      const orderId = Math.floor(Math.random() * 1000000);
      await placeOrderMutation.mutateAsync({
        orderId,
        customerName: formData.name,
        phoneNumber: formData.phone,
        address: formData.address,
      });

      navigate({ to: '/order-success' });
    } catch (error) {
      console.error('Order placement failed:', error);
    }
  };

  if (cartItems.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-display font-bold text-foreground mb-8">Checkout</h1>

      <DeliveryNotice />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="10-digit mobile number"
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                Delivery Address *
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Enter your complete address in Sitamarhi, Bihar"
              />
              {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
            </div>

            <button
              type="submit"
              disabled={placeOrderMutation.isPending}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {placeOrderMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                item.product && (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-foreground font-medium">
                      ₹{Number(item.product.price) * item.quantity}
                    </span>
                  </div>
                )
              ))}

              <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-sm text-success">
              Free delivery in Sitamarhi, Bihar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

