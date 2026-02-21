import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'kishan-dairy';

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-3 text-foreground">Kishan Dairy</h3>
            <p className="text-sm text-muted-foreground">
              Fresh dairy products delivered to your doorstep in Sitamarhi, Bihar.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-3 text-foreground">Delivery Area</h3>
            <p className="text-sm text-muted-foreground">
              We deliver only in Sitamarhi, Bihar
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-3 text-foreground">Contact</h3>
            <p className="text-sm text-muted-foreground">
              For orders and inquiries, please visit our products page.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} Kishan Dairy. Built with{' '}
            <Heart className="h-4 w-4 text-destructive fill-destructive" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

