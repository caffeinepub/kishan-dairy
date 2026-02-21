import { useNavigate } from '@tanstack/react-router';
import { CheckCircle, Home } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-success/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>

        <h1 className="text-4xl font-display font-bold text-foreground mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your order! We've received your request and will deliver your fresh dairy products soon.
        </p>

        <div className="bg-card rounded-xl border border-border p-6 mb-8 text-left">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">
            What's Next?
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </span>
              <span>We'll prepare your order with the freshest dairy products</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </span>
              <span>Our delivery team will contact you to confirm the delivery time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </span>
              <span>Your order will be delivered to your doorstep in Sitamarhi, Bihar</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate({ to: '/' })}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>
          <button
            onClick={() => navigate({ to: '/products' })}
            className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

