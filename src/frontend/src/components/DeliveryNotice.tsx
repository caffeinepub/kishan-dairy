import { MapPin } from 'lucide-react';

export default function DeliveryNotice() {
  return (
    <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-4 mb-8">
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-accent-foreground mb-1">Delivery Area</h3>
          <p className="text-sm text-foreground">
            We currently deliver only in <strong>Sitamarhi, Bihar</strong>. Please ensure your delivery address is within this area.
          </p>
        </div>
      </div>
    </div>
  );
}

