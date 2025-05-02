'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChevronRight, AlertCircle } from 'lucide-react';

// Placeholder data (prices, availability, images should come from backend)
const basePrice = 41490; // Example price for Long Range AWD
const orderFee = 250;

const modelYData = {
  name: 'Model Y',
  tagline: 'Reimagined exterior design, all-new interior.',
  specs: [
    { value: '327mi', label: 'Range (EPA est.)' },
    { value: '125mph', label: 'Top Speed' },
    { value: '4.6sec', label: '0-60 mph' },
  ],
  drives: [
    { id: 'lr-awd', name: 'Long Range All-Wheel Drive', price: basePrice },
    // Add other drive options if available
  ],
  colors: [
    { id: 'stealth-grey', name: 'Stealth Grey', price: 0, hex: '#5C5E62', image: 'https://picsum.photos/seed/modely-grey/1000/600', hint: 'tesla model y grey side profile' },
    { id: 'pearl-white', name: 'Pearl White Multi-Coat', price: 1000, hex: '#E8E9EA', image: 'https://picsum.photos/seed/modely-white/1000/600', hint: 'tesla model y white side profile' },
    { id: 'deep-blue', name: 'Deep Blue Metallic', price: 1000, hex: '#3D5A75', image: 'https://picsum.photos/seed/modely-blue/1000/600', hint: 'tesla model y blue side profile' },
    { id: 'diamond-black', name: 'Solid Black', price: 1500, hex: '#232426', image: 'https://picsum.photos/seed/modely-black/1000/600', hint: 'tesla model y black side profile' }, // Assuming Diamond Black is Solid Black
    { id: 'ultra-red', name: 'Ultra Red', price: 2000, hex: '#931D28', image: 'https://picsum.photos/seed/modely-red/1000/600', hint: 'tesla model y red side profile' },
    { id: 'quicksilver', name: 'Quicksilver', price: 2000, hex: '#AFB3B8', image: 'https://picsum.photos/seed/modely-silver/1000/600', hint: 'tesla model y silver side profile' }, // Example, might not be available
  ],
  wheels: [
    { id: 'crossflow-19', name: '19” Crossflow Wheels', price: 0, image: 'https://picsum.photos/seed/wheel-crossflow/200/200', hint: 'car wheel dark grey aero', range: '327mi' },
    { id: 'helix-20', name: '20” Helix 2.0 Wheels', price: 2000, image: 'https://picsum.photos/seed/wheel-helix/200/200', hint: 'car wheel silver turbine', range: '309mi' }, // Example range impact
  ],
  interiors: [
    { id: 'all-black', name: 'All Black', price: 0, colors: ['#232426'], image: 'https://picsum.photos/seed/interior-black/400/250', hint: 'car interior black minimalist' },
    { id: 'black-white', name: 'Black and White', price: 1000, colors: ['#232426', '#E8E9EA'], image: 'https://picsum.photos/seed/interior-white/400/250', hint: 'car interior white black minimalist' },
  ],
  seats: [
    { id: 'five-seat', name: 'Five Seat Interior', price: 0 },
    // { id: 'seven-seat', name: 'Seven Seat Interior', price: 2500 }, // Example
  ],
  towPackage: { id: 'tow', name: 'Tow Package', price: 1000, description: 'Tow up to 3,500 lbs' },
  fsd: { id: 'fsd', name: 'Full Self-Driving (Supervised)', price: 8000 },
  charging: {
    mobileChargerIncluded: true,
    superchargingAccess: true,
  },
  accessories: [
    // Add accessories later
  ],
  estimatedDelivery: 'Aug – Oct 2024', // Placeholder
};

export default function CustomizeModelYPage() {
  const [selectedDrive, setSelectedDrive] = useState(modelYData.drives[0].id);
  const [selectedColor, setSelectedColor] = useState(modelYData.colors[0].id);
  const [selectedWheels, setSelectedWheels] = useState(modelYData.wheels[0].id);
  const [selectedInterior, setSelectedInterior] = useState(modelYData.interiors[0].id);
  const [selectedSeats, setSelectedSeats] = useState(modelYData.seats[0].id);
  const [includeTow, setIncludeTow] = useState(false);
  const [includeFsd, setIncludeFsd] = useState(false);
  const [includeTaxCredit, setIncludeTaxCredit] = useState(true);
  const [includeGasSavings, setIncludeGasSavings] = useState(false);
  const [deliveryZip, setDeliveryZip] = useState('');
  const { toast } = useToast();

  const getOptionById = <T extends { id: string }>(options: T[], id: string): T | undefined => {
    return options.find(opt => opt.id === id);
  };

  const calculateTotalPrice = () => {
    let price = getOptionById(modelYData.drives, selectedDrive)?.price || 0;
    price += getOptionById(modelYData.colors, selectedColor)?.price || 0;
    price += getOptionById(modelYData.wheels, selectedWheels)?.price || 0;
    price += getOptionById(modelYData.interiors, selectedInterior)?.price || 0;
    price += getOptionById(modelYData.seats, selectedSeats)?.price || 0;
    if (includeTow) price += modelYData.towPackage.price;
    if (includeFsd) price += modelYData.fsd.price;

    // Note: Tax credits and savings are informational and don't change the purchase price directly here.
    // They are shown separately.
    return price;
  };

  const purchasePrice = calculateTotalPrice();
  const finalPrice = purchasePrice - (includeTaxCredit ? 7500 : 0); // Simplified calculation

  const currentCarImage = getOptionById(modelYData.colors, selectedColor)?.image || modelYData.colors[0].image;
  const currentCarImageHint = getOptionById(modelYData.colors, selectedColor)?.hint || modelYData.colors[0].hint;
  const currentWheels = getOptionById(modelYData.wheels, selectedWheels);

  const handleSubmitOrder = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Integrate with backend API to store the order
    console.log('Order Submitted:', {
      model: 'Model Y',
      drive: selectedDrive,
      color: selectedColor,
      wheels: selectedWheels,
      interior: selectedInterior,
      seats: selectedSeats,
      towPackage: includeTow,
      fsd: includeFsd,
      totalPrice: purchasePrice,
      deliveryZip,
    });

    toast({
      title: "Order Placed (Simulated)",
      description: `Your Model Y configuration is confirmed. Total: $${purchasePrice.toLocaleString()}. You paid $${orderFee} today.`,
    });
    // Redirect or show success message
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      {/* Image Preview Pane (Sticky on larger screens) */}
      <div className="lg:w-2/3 lg:sticky lg:top-0 lg:h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="relative w-full aspect-[16/10]">
          <Image
            key={selectedColor} // Re-render image on color change
            src={currentCarImage}
            alt={`Model Y in ${getOptionById(modelYData.colors, selectedColor)?.name}`}
            layout="fill"
            objectFit="contain"
            quality={90}
            priority
            data-ai-hint={currentCarImageHint}
          />
        </div>
      </div>

      {/* Configuration Pane (Scrollable) */}
      <div className="lg:w-1/3 lg:overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="p-6 md:p-10 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-semibold mb-1">{modelYData.name}</h1>
              <p className="text-sm text-muted-foreground">{modelYData.tagline}</p>
              <p className="text-sm text-muted-foreground mt-2">Est. Delivery: {modelYData.estimatedDelivery}</p>
            </div>

            {/* Specs */}
            <div className="flex justify-between text-center border-t border-b py-4">
              {modelYData.specs.map((spec) => (
                <div key={spec.label}>
                  <p className="text-xl font-medium">{spec.value}</p>
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                </div>
              ))}
            </div>

            {/* Purchase Type Tabs */}
            <Tabs defaultValue="cash" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cash">Cash</TabsTrigger>
                <TabsTrigger value="lease">Lease</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
              </TabsList>
              <TabsContent value="cash" className="mt-4 space-y-4">
                {/* Drive Selection */}
                <RadioGroup value={selectedDrive} onValueChange={setSelectedDrive}>
                  {modelYData.drives.map((drive) => (
                    <Label key={drive.id} htmlFor={drive.id} className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                       <span className="font-medium">{drive.name}</span>
                       <span className="font-medium">${drive.price.toLocaleString()}</span>
                       <RadioGroupItem value={drive.id} id={drive.id} className="sr-only" />
                    </Label>
                  ))}
                </RadioGroup>

                {/* Explore Features Button */}
                <Button variant="outline" className="w-full justify-between h-16 p-4">
                   <div className="flex items-center space-x-4">
                        <Image src="https://picsum.photos/seed/modely-feature/100/60" alt="Model Y feature" width={60} height={40} className="rounded" data-ai-hint="tesla car driving front view"/>
                        <span>Explore Features</span>
                   </div>
                   <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                </Button>

                {/* Savings Checkboxes */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="tax-credit" checked={includeTaxCredit} onCheckedChange={(checked) => setIncludeTaxCredit(Boolean(checked))} />
                        <Label htmlFor="tax-credit" className="text-sm font-normal">Include $7,500 Federal Tax Credit</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                         <Checkbox id="gas-savings" checked={includeGasSavings} onCheckedChange={(checked) => setIncludeGasSavings(Boolean(checked))} />
                         <Label htmlFor="gas-savings" className="text-sm font-normal">Include est. 5-year gas savings of $6,000</Label>
                     </div>
                     <Button variant="link" size="sm" className="p-0 h-auto text-primary">Edit Savings</Button>
                </div>

              </TabsContent>
              {/* Add Lease and Finance Tab Content if needed */}
              <TabsContent value="lease"><p className="text-muted-foreground text-center py-8">Lease options coming soon.</p></TabsContent>
              <TabsContent value="finance"><p className="text-muted-foreground text-center py-8">Finance options coming soon.</p></TabsContent>
            </Tabs>

            <Separator />

            {/* Exterior Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Exterior</h2>
                {/* Color Selection */}
                <div>
                    <Label className="text-lg font-medium mb-2 block">Paint</Label>
                    <div className="flex flex-wrap gap-3 justify-center">
                       {modelYData.colors.map((color) => (
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
                            title={`${color.name} ${color.price === 0 ? '(Included)' : `($${color.price.toLocaleString()})`}`}
                          />
                       ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-3">{getOptionById(modelYData.colors, selectedColor)?.name} - {getOptionById(modelYData.colors, selectedColor)?.price === 0 ? 'Included' : `$${getOptionById(modelYData.colors, selectedColor)?.price.toLocaleString()}`}</p>
                </div>
                 {/* Wheels Selection */}
                <div>
                    <Label className="text-lg font-medium mb-2 block">Wheels</Label>
                    <div className="flex gap-4 justify-center">
                       {modelYData.wheels.map((wheel) => (
                          <button
                             key={wheel.id}
                             type="button"
                             onClick={() => setSelectedWheels(wheel.id)}
                             className={cn(
                                "flex flex-col items-center p-1 border rounded-full cursor-pointer hover:border-primary",
                                selectedWheels === wheel.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-muted'
                             )}
                              title={`${wheel.name} ${wheel.price === 0 ? '(Included)' : `($${wheel.price.toLocaleString()})`}`}
                          >
                             <Image src={wheel.image} alt={wheel.name} width={60} height={60} className="rounded-full" data-ai-hint={wheel.hint}/>
                          </button>
                       ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-3">{currentWheels?.name} - {currentWheels?.price === 0 ? 'Included' : `$${currentWheels?.price.toLocaleString()}`}</p>
                    {currentWheels?.range && <p className="text-xs text-muted-foreground text-center">Range (EPA est.) : {currentWheels.range}</p>}
                </div>

                {/* Tow Package */}
                <div>
                    <Label className="text-lg font-medium mb-2 block">{modelYData.towPackage.name}</Label>
                    <Label htmlFor="tow-package" className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                        <div className="space-y-1">
                            <span className="font-medium">Tow Package</span>
                            <p className="text-xs text-muted-foreground">{modelYData.towPackage.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-medium">${modelYData.towPackage.price.toLocaleString()}</span>
                            <Checkbox id="tow-package" checked={includeTow} onCheckedChange={(checked) => setIncludeTow(Boolean(checked))} />
                        </div>
                    </Label>
                </div>

            </div>

            <Separator />

            {/* Interior Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Interior</h2>
                {/* Interior Color Selection */}
                 <div>
                    <Label className="text-lg font-medium mb-2 block">Interior Color</Label>
                     <div className="flex flex-wrap gap-3 justify-center">
                        {modelYData.interiors.map((interior) => (
                           <button
                              key={interior.id}
                              type="button"
                              onClick={() => setSelectedInterior(interior.id)}
                              className={cn(
                                  "w-10 h-10 rounded-full border-2 flex overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                  selectedInterior === interior.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-muted'
                              )}
                              aria-label={interior.name}
                              title={`${interior.name} ${interior.price === 0 ? '(Included)' : `($${interior.price.toLocaleString()})`}`}
                           >
                               {interior.colors.map((bgColor, index) => (
                                   <span key={index} className="h-full flex-1" style={{ backgroundColor: bgColor }}></span>
                               ))}
                           </button>
                        ))}
                     </div>
                    <p className="text-sm text-muted-foreground text-center mt-3">{getOptionById(modelYData.interiors, selectedInterior)?.name} - {getOptionById(modelYData.interiors, selectedInterior)?.price === 0 ? 'Included' : `$${getOptionById(modelYData.interiors, selectedInterior)?.price.toLocaleString()}`}</p>
                 </div>
                  {/* Interior Image Preview (Optional) */}
                 <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                        key={selectedInterior}
                        src={getOptionById(modelYData.interiors, selectedInterior)?.image || ''}
                        alt={`${getOptionById(modelYData.interiors, selectedInterior)?.name} Interior`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={getOptionById(modelYData.interiors, selectedInterior)?.hint}
                    />
                 </div>
                 {/* Seat Selection */}
                 <div>
                    <Label className="text-lg font-medium mb-2 block">Layout</Label>
                    <RadioGroup value={selectedSeats} onValueChange={setSelectedSeats}>
                      {modelYData.seats.map((seat) => (
                        <Label key={seat.id} htmlFor={seat.id} className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                           <span className="font-medium">{seat.name}</span>
                           <span className="font-medium">{seat.price === 0 ? 'Included' : `$${seat.price.toLocaleString()}`}</span>
                           <RadioGroupItem value={seat.id} id={seat.id} className="sr-only" />
                        </Label>
                      ))}
                    </RadioGroup>
                 </div>

            </div>

            <Separator />

             {/* Full Self-Driving */}
             <div className="space-y-4">
                <h2 className="text-xl font-semibold">{modelYData.fsd.name}</h2>
                <Label htmlFor="fsd-package" className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                    <div className="space-y-1 mr-4">
                        <span className="font-medium">Add Full Self-Driving</span>
                         <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                            <li>Autosteer on city streets</li>
                            <li>Traffic Light and Stop Sign Control</li>
                         </ul>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        <span className="font-medium">${modelYData.fsd.price.toLocaleString()}</span>
                        <Checkbox id="fsd-package" checked={includeFsd} onCheckedChange={(checked) => setIncludeFsd(Boolean(checked))} />
                    </div>
                </Label>
                 <Button variant="secondary" className="w-full">Watch a Video</Button>
                 <Button variant="link" size="sm" className="w-full text-xs text-muted-foreground justify-start p-0 h-auto">See Full Self-Driving in Action</Button>
                 <p className="text-xs text-muted-foreground flex items-start space-x-1">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0"/>
                    <span>Software options are excluded from the federal tax credit price cap. Currently enabled features require active driver supervision and do not make the vehicle autonomous...</span>
                 </p>
             </div>

             <Separator />

             {/* Charging Section */}
              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Charging</h2>
                  <p className="text-sm text-muted-foreground">Every Tesla includes access to the largest global Supercharging network.</p>
                  {modelYData.charging.mobileChargerIncluded && (
                    <p className="text-sm font-medium">Mobile Charger is included with Model Y</p>
                  )}
                  <Button variant="secondary" className="w-full">Learn More</Button>
              </div>

              <Separator />

               {/* Accessories Section (Placeholder) */}
              <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Accessories</h2>
                   <p className="text-sm text-muted-foreground">Add accessories to your order.</p>
                   <Button variant="secondary" className="w-full">Learn More</Button>
              </div>

              <Separator />

            {/* Order Summary & Final Actions */}
            <div className="space-y-4 sticky bottom-0 bg-background py-4 border-t -mx-6 px-6 md:-mx-10 md:px-10">
              <h2 className="text-xl font-semibold">Order Your Model Y</h2>
                <div className="space-y-1">
                     <Label htmlFor="delivery-zip">Enter Delivery ZIP Code</Label>
                     <Input id="delivery-zip" placeholder="ZIP Code" value={deliveryZip} onChange={(e) => setDeliveryZip(e.target.value)} />
                     <p className="text-xs text-muted-foreground">For taxes and fees</p>
                </div>

              {/* Price Breakdown */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Est. Purchase Price</span>
                  <span>${purchasePrice.toLocaleString()}</span>
                </div>
                {includeTaxCredit && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Federal Tax Credit</span>
                    <span>-${(7500).toLocaleString()}</span>
                  </div>
                )}
                 {includeGasSavings && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Est. 5-year gas savings</span>
                        <span>-${(6000).toLocaleString()}</span>
                    </div>
                 )}
                <Separator className="my-1"/>
                 <div className="flex justify-between font-semibold">
                    <span>Price after est. savings</span>
                    <span>${(finalPrice - (includeGasSavings ? 6000 : 0)).toLocaleString()}</span>
                 </div>
                <Button variant="link" size="sm" className="p-0 h-auto text-xs text-muted-foreground">Show Pricing Details</Button>
              </div>

                <Button variant="link" size="sm" className="p-0 h-auto text-primary w-full justify-start">Explore Financing</Button>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-sm font-medium">Due Today</span>
                    <span className="text-lg font-semibold">${orderFee.toLocaleString()}</span>
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
