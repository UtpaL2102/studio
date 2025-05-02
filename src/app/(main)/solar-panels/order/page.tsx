
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function OrderSolarPage() {
  const [selectedProduct, setSelectedProduct] = useState('solar-powerwall');
  const [address, setAddress] = useState('');
  const [avgBill, setAvgBill] = useState('');
  const { toast } = useToast();

  const handleSeeSystem = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Integrate with backend API to get quote/savings based on address and bill
    console.log('Requesting Solar Quote:', {
      product: selectedProduct,
      address,
      averageBill: avgBill,
    });

    if (!address || !avgBill) {
        toast({
            title: "Missing Information",
            description: "Please enter your address and average electricity bill.",
            variant: "destructive",
        });
        return;
    }

    toast({
      title: "Quote Request Sent (Simulated)",
      description: "We've received your information and will generate your quote and savings estimate.",
    });
    // Potentially redirect to a confirmation or results page
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-foreground">
      {/* Image Preview Pane */}
      <div className="lg:w-2/3 lg:h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 lg:sticky lg:top-0">
        <div className="relative w-full aspect-[16/10] max-w-4xl rounded-lg overflow-hidden">
          <Image
            src="https://picsum.photos/seed/solar-house-system/1200/750" // Replace with accurate image URL from image
            alt="House with Tesla Solar Panels and Powerwall"
            layout="fill"
            objectFit="cover" // Use cover to fill the container
            quality={90}
            priority
            data-ai-hint="modern house solar panels powerwall tesla car driveway"
          />
           {/* Optional labels like in the image - Position these carefully */}
           <div className="absolute bottom-1/4 left-1/4 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
             Solar
           </div>
           <div className="absolute bottom-1/4 left-1/3 ml-4 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
             Powerwall
           </div>
        </div>
      </div>

      {/* Configuration & Quote Pane */}
      <div className="lg:w-1/3 flex items-center justify-center py-12 lg:py-0">
        <div className="w-full max-w-md p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Start Saving <br /> Up To 80% /mo on Average
            </h1>
            <p className="text-sm text-muted-foreground">
              Based on national and Tesla customer averages
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSeeSystem} className="space-y-6">
            {/* Energy Product Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Select Energy Product</Label>
              <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct} className="space-y-3">
                <Label
                  htmlFor="solar-powerwall"
                  className={cn(
                    "flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-accent",
                    selectedProduct === 'solar-powerwall' ? 'border-primary ring-1 ring-primary bg-accent' : 'border-muted'
                  )}
                >
                  <span className="font-medium">Solar Panels + Powerwall 3</span>
                  <RadioGroupItem value="solar-powerwall" id="solar-powerwall" className="sr-only" />
                </Label>
                <Label
                  htmlFor="powerwall"
                   className={cn(
                    "flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-accent",
                    selectedProduct === 'powerwall' ? 'border-primary ring-1 ring-primary bg-accent' : 'border-muted'
                  )}
                >
                  <span className="font-medium">Powerwall 3</span>
                  <RadioGroupItem value="powerwall" id="powerwall" className="sr-only" />
                </Label>
              </RadioGroup>
            </div>

            {/* Address and Bill Input */}
            <div className="space-y-4">
               <p className="text-sm text-muted-foreground">
                  Enter your home address and average electricity bill to get a quote and view your savings
               </p>
              <div>
                <Label htmlFor="address" className="sr-only">Home Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Home Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="avg-bill" className="sr-only">Average Electricity Bill ($)</Label>
                <Input
                  id="avg-bill"
                  type="number"
                  placeholder="Average Electricity Bill ($)"
                  value={avgBill}
                  onChange={(e) => setAvgBill(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              See My System
            </Button>
          </form>
        </div>
      </div>
       {/* Floating Chat Button (Optional) */}
       <button className="fixed bottom-6 right-6 bg-gray-800 dark:bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
          {/* Simple Chat Icon Placeholder */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" />
          </svg>
          <span className="sr-only">Chat</span>
       </button>
    </div>
  );
}
