
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Placeholder data for Model 3 - Adjust as necessary
const baseLeasePrice = 779; // Monthly lease price from user prompt
const downPayment = 7500;
const leaseTerm = 36; // months
const mileage = 10000; // miles per year
const orderFee = 250;

const model3Data = {
  name: 'Model 3',
  tagline: 'Performance and Utility', // Example tagline
  specs: [
    { value: '341mi', label: 'Range (EPA est.)' },
    { value: '140mph', label: 'Top Speed' },
    { value: '5.8sec', label: '0-60 mph' },
  ],
  drives: [
    // Simplified for lease example - add variants if needed
    { id: 'rear-wheel-drive', name: 'Rear-Wheel Drive', price: 0 }, // Assume base model for lease
  ],
  colors: [
    // Keep colors for visual selection
    { id: 'stealth-grey', name: 'Stealth Grey', price: 0, hex: '#5C5E62', image: 'https://picsum.photos/seed/model3-grey/1000/600', hint: 'tesla model 3 grey side profile' },
    { id: 'pearl-white', name: 'Pearl White Multi-Coat', price: 1000, hex: '#E8E9EA', image: 'https://picsum.photos/seed/model3-white/1000/600', hint: 'tesla model 3 white side profile' },
    { id: 'deep-blue', name: 'Deep Blue Metallic', price: 1000, hex: '#3D5A75', image: 'https://picsum.photos/seed/model3-blue/1000/600', hint: 'tesla model 3 blue side profile' },
    { id: 'solid-black', name: 'Solid Black', price: 1500, hex: '#232426', image: 'https://picsum.photos/seed/model3-black/1000/600', hint: 'tesla model 3 black side profile' },
    { id: 'ultra-red', name: 'Ultra Red', price: 2000, hex: '#931D28', image: 'https://picsum.photos/seed/model3-red/1000/600', hint: 'tesla model 3 red side profile' },
   ],
  wheels: [
    { id: 'photon-18', name: '18” Photon Wheels', price: 0, image: 'https://picsum.photos/seed/wheel-photon/200/200', hint: 'car wheel silver aero dynamic', range: '341mi' },
    { id: 'nova-19', name: '19” Nova Wheels', price: 1500, image: 'https://picsum.photos/seed/wheel-nova/200/200', hint: 'car wheel black sleek sporty', range: '315mi' },
  ],
   interiors: [
    { id: 'all-black', name: 'All Black', price: 0, colors: ['#232426'], image: 'https://picsum.photos/seed/interior-black-m3/400/250', hint: 'car interior black minimalist fabric' },
    { id: 'black-white', name: 'Black and White', price: 1000, colors: ['#232426', '#E8E9EA'], image: 'https://picsum.photos/seed/interior-white-m3/400/250', hint: 'car interior white black minimalist leather' },
  ],
  estimatedDelivery: 'Jul – Aug 2024', // Placeholder
};

export default function CustomizeModel3Page() {
  const [selectedDrive, setSelectedDrive] = useState(model3Data.drives[0].id);
  const [selectedColor, setSelectedColor] = useState(model3Data.colors[0].id);
  const [selectedWheels, setSelectedWheels] = useState(model3Data.wheels[0].id);
  const [selectedInterior, setSelectedInterior] = useState(model3Data.interiors[0].id);
  const [deliveryZip, setDeliveryZip] = useState('');
  const { toast } = useToast();

  const getOptionById = <T extends { id: string }>(options: T[], id: string): T | undefined => {
    return options.find(opt => opt.id === id);
  };

  // Note: Price calculation for lease might differ significantly.
  // This example uses a fixed lease price and adds option costs for simplicity.
  // A real implementation would likely involve backend calls for accurate lease quotes.
  const calculateOptionCost = () => {
    let optionsCost = 0;
    optionsCost += getOptionById(model3Data.colors, selectedColor)?.price || 0;
    optionsCost += getOptionById(model3Data.wheels, selectedWheels)?.price || 0;
    optionsCost += getOptionById(model3Data.interiors, selectedInterior)?.price || 0;
    // Add other options if applicable
    return optionsCost;
  };

  // This is a very simplified representation. Real lease calculation is complex.
  const estimatedLeasePayment = baseLeasePrice; // Adjust based on options if needed
  const totalDueToday = orderFee; // Typically just the order fee

  const currentCarImage = getOptionById(model3Data.colors, selectedColor)?.image || model3Data.colors[0].image;
  const currentCarImageHint = getOptionById(model3Data.colors, selectedColor)?.hint || model3Data.colors[0].hint;
  const currentWheels = getOptionById(model3Data.wheels, selectedWheels);
  const currentInterior = getOptionById(model3Data.interiors, selectedInterior);
  const currentColor = getOptionById(model3Data.colors, selectedColor);

  const handleSubmitOrder = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Integrate with backend API to store the lease order
    console.log('Lease Order Submitted:', {
      model: 'Model 3',
      drive: selectedDrive,
      color: selectedColor,
      wheels: selectedWheels,
      interior: selectedInterior,
      estimatedLease: estimatedLeasePayment,
      downPayment: downPayment,
      term: leaseTerm,
      mileage: mileage,
      dueToday: totalDueToday,
      deliveryZip,
    });

    toast({
      title: "Lease Order Placed (Simulated)",
      description: `Your Model 3 configuration is confirmed. Est. Lease: $${estimatedLeasePayment}/mo. You paid $${orderFee} today.`,
    });
    // Redirect or show success message
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      {/* Image Preview Pane */}
      <div className="lg:w-2/3 lg:sticky lg:top-0 lg:h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="relative w-full aspect-[16/10]">
          <Image
            key={selectedColor}
            src={currentCarImage}
            alt={`Model 3 in ${currentColor?.name}`}
            layout="fill"
            objectFit="contain"
            quality={90}
            priority
            data-ai-hint={currentCarImageHint}
          />
        </div>
      </div>

      {/* Configuration Pane */}
      <div className="lg:w-1/3 lg:overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="p-6 md:p-10 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-semibold mb-1">{model3Data.name}</h1>
              <p className="text-sm text-muted-foreground">{model3Data.tagline}</p>
              <p className="text-sm text-muted-foreground mt-2">Est. Delivery: {model3Data.estimatedDelivery}</p>
            </div>

            {/* Specs */}
            <div className="flex justify-between text-center border-t border-b py-4">
              {model3Data.specs.map((spec) => (
                <div key={spec.label}>
                  <p className="text-xl font-medium">{spec.value}</p>
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                </div>
              ))}
            </div>

            {/* Configuration Options (Simplified for Lease) */}
            {/* Drive Selection (can be simplified if only one lease option) */}
            {model3Data.drives.length > 1 && (
              <>
                <RadioGroup value={selectedDrive} onValueChange={setSelectedDrive}>
                  {model3Data.drives.map((drive) => (
                    <Label key={drive.id} htmlFor={drive.id} className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                      <span className="font-medium">{drive.name}</span>
                      {/* Price display might not be relevant for lease */}
                      <RadioGroupItem value={drive.id} id={drive.id} className="sr-only" />
                    </Label>
                  ))}
                </RadioGroup>
                <Separator />
              </>
            )}

            {/* Exterior Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Exterior</h2>
                {/* Color Selection */}
                <div>
                    <Label className="text-lg font-medium mb-2 block">Paint</Label>
                    <div className="flex flex-wrap gap-3 justify-center">
                       {model3Data.colors.map((color) => (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() => setSelectedColor(color.id)}
                            className={cn(
                                "w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                selectedColor === color.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-muted'
                            )}
                            style={{ backgroundColor: color.hex }}
                            aria-label={color.name}
                            title={`${color.name} ${color.price === 0 ? '(Included)' : `(+ $${color.price.toLocaleString()} to price)`}`} // Clarify impact on price, not direct lease payment
                          />
                       ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-3">{currentColor?.name} - {currentColor?.price === 0 ? 'Included' : `+ $${currentColor?.price.toLocaleString()}`}</p>
                </div>
                 {/* Wheels Selection */}
                <div>
                    <Label className="text-lg font-medium mb-2 block">Wheels</Label>
                    <div className="flex gap-4 justify-center">
                       {model3Data.wheels.map((wheel) => (
                          <button
                             key={wheel.id}
                             type="button"
                             onClick={() => setSelectedWheels(wheel.id)}
                             className={cn(
                                "flex flex-col items-center p-1 border rounded-full cursor-pointer hover:border-primary",
                                selectedWheels === wheel.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-muted'
                             )}
                              title={`${wheel.name} ${wheel.price === 0 ? '(Included)' : `(+ $${wheel.price.toLocaleString()} to price)`}`}
                          >
                             <Image src={wheel.image} alt={wheel.name} width={60} height={60} className="rounded-full" data-ai-hint={wheel.hint}/>
                          </button>
                       ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-3">{currentWheels?.name} - {currentWheels?.price === 0 ? 'Included' : `+ $${currentWheels?.price.toLocaleString()}`}</p>
                    {currentWheels?.range && <p className="text-xs text-muted-foreground text-center">Range (EPA est.) : {currentWheels.range}</p>}
                </div>
            </div>

            <Separator />

             {/* Interior Section */}
             <div className="space-y-4">
                 <h2 className="text-xl font-semibold">Interior</h2>
                 <div>
                    <Label className="text-lg font-medium mb-2 block">Interior Color</Label>
                     <div className="flex flex-wrap gap-3 justify-center">
                        {model3Data.interiors.map((interior) => (
                           <button
                              key={interior.id}
                              type="button"
                              onClick={() => setSelectedInterior(interior.id)}
                              className={cn(
                                  "w-10 h-10 rounded-full border-2 flex overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                  selectedInterior === interior.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-muted'
                              )}
                              aria-label={interior.name}
                              title={`${interior.name} ${interior.price === 0 ? '(Included)' : `(+ $${interior.price.toLocaleString()} to price)`}`}
                           >
                               {interior.colors.map((bgColor, index) => (
                                   <span key={index} className="h-full flex-1" style={{ backgroundColor: bgColor }}></span>
                               ))}
                           </button>
                        ))}
                     </div>
                    <p className="text-sm text-muted-foreground text-center mt-3">{currentInterior?.name} - {currentInterior?.price === 0 ? 'Included' : `+ $${currentInterior?.price.toLocaleString()}`}</p>
                 </div>
                 {/* Optional Interior Image Preview */}
                 <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                        key={selectedInterior}
                        src={currentInterior?.image || ''}
                        alt={`${currentInterior?.name} Interior`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={currentInterior?.hint}
                    />
                 </div>
             </div>

            {/* Other sections like Autopilot, Charging can be added here if needed */}
            <Separator />


            {/* Order Summary & Final Actions */}
            <div className="space-y-4 sticky bottom-0 bg-background py-4 border-t -mx-6 px-6 md:-mx-10 md:px-10">
              <h2 className="text-xl font-semibold">Lease Your Model 3</h2>
               <Button variant="link" size="sm" className="w-full text-xs text-muted-foreground justify-start p-0 h-auto">Learn More</Button>
                <div className="space-y-1">
                     <Label htmlFor="delivery-zip">Enter Delivery ZIP Code</Label>
                     <Input id="delivery-zip" placeholder="ZIP Code" value={deliveryZip} onChange={(e) => setDeliveryZip(e.target.value)} />
                     <p className="text-xs text-muted-foreground">For taxes and fees</p>
                </div>

              {/* Lease Price Breakdown */}
              <div className="space-y-1 text-sm">
                 <Button variant="link" size="sm" className="p-0 h-auto text-xs text-muted-foreground">Show Pricing Details</Button>
                 <div className="flex justify-between font-semibold">
                    <span>Est. Lease Payment</span>
                    <span>${estimatedLeasePayment.toLocaleString()} /mo</span>
                 </div>
                 <p className="text-xs text-muted-foreground">
                    ${downPayment.toLocaleString()} down, {leaseTerm} months, {mileage.toLocaleString()} miles/year
                 </p>
                <Button variant="link" size="sm" className="p-0 h-auto text-primary w-full justify-start">Explore Financing</Button>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-sm font-medium">Due Today</span>
                    <span className="text-lg font-semibold">${totalDueToday.toLocaleString()}</span>
                </div>
                 <p className="text-xs text-muted-foreground">Non-refundable Order Fee</p>
                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Place Order
                </Button>
              </form>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

