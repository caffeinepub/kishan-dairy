import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Milk, Award, Truck } from 'lucide-react';
import { HERO_BANNER } from '../utils/images';
import DeliveryNotice from '../components/DeliveryNotice';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Fresh Dairy Products
                <span className="block text-primary">Delivered Daily</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Experience the pure taste of farm-fresh dairy products delivered straight to your doorstep in Sitamarhi, Bihar.
              </p>
              <button
                onClick={() => navigate({ to: '/products' })}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="relative">
              <img
                src={HERO_BANNER}
                alt="Fresh dairy products"
                className="rounded-2xl shadow-card w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Notice */}
      <section className="container mx-auto px-4 py-8">
        <DeliveryNotice />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-foreground">
          Why Choose Kishan Dairy?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-card transition-shadow">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Milk className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
              100% Pure & Fresh
            </h3>
            <p className="text-muted-foreground">
              Our dairy products are sourced directly from local farms, ensuring maximum freshness and quality.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-card transition-shadow">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
              Quality Assured
            </h3>
            <p className="text-muted-foreground">
              Every product undergoes strict quality checks to meet the highest standards of hygiene and taste.
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-card transition-shadow">
            <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-success" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
              Fast Delivery
            </h3>
            <p className="text-muted-foreground">
              Quick and reliable delivery service across Sitamarhi, Bihar. Fresh products at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Ready to Experience Fresh Dairy?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Browse our selection of premium dairy products and place your order today.
          </p>
          <button
            onClick={() => navigate({ to: '/products' })}
            className="bg-card text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-card/90 transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            View Products
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

