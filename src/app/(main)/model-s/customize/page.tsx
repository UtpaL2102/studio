'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

// Placeholder data - replace with backend data and logic
const basePrice = 79990;
const options = {
  variant: [
    { id: 'long_range', name: 'Long Range', price: 0, range: '396 mi', topSpeed: '149 mph', zeroToSixty: '3.1 s' },
    { id: 'plaid', name: 'Plaid', price: 10000, range: '359 mi', topSpeed: '200 mph', zeroToSixty: '1.99 s' },
  ],
  color: [
    { id: 'white', name: 'Pearl White Multi-Coat', price: 0, hex: '#E8E9EA' },
    { id: 'black', name: 'Solid Black', price: 1500, hex: '#232426' },
    { id: 'blue', name: 'Deep Blue Metallic', price: 1500, hex: '#3D5A75' },
    { id: 'red', name: 'Ultra Red', price: 2500, hex: '#931D28' },
  ],
  wheels: [
    { id: 'tempest_19', name: '19" Tempest Wheels', price: 0, image: 'https://picsum.photos/seed/wheel19/200/200', hint: 'car wheel silver sporty' },
    { id: 'arachnid_21', name: '21" Arachnid Wheels', price: 4500, image: 'https://picsum.photos/seed/wheel21/200/200', hint: 'car wheel dark grey sporty' },
  ],
  interior: [
    { id: 'black_interior', name: 'All Black', price: 0, colors: ['#232426'] },
    { id: 'white_interior', name: 'Black and White', price: 2000, colors: ['#232426', '#E8E9EA'] },
    { id: 'cream_interior', name: 'Cream', price: 2000, colors: ['#DACEC3', '#7C736A'] },
  ],
};

// Image map based on color (Simplified)
const carImages: { [key: string]: string } = {
  white: 'https://picsum.photos/seed/models-white/800/600',
  black: 'https://picsum.photos/seed/models-black/800/600',
  blue: 'https://picsum.photos/seed/models-blue/800/600',
  red: 'https://picsum.photos/seed/models-red/800/600',
};
const carImageHints: { [key: string]: string } = {
    white: 'electric car white side profile',
    black: 'electric car black side profile',
    blue: 'electric car blue side profile',
    red: 'electric car red side profile',
}

export default function CustomizeModelSPage() {
  const [selectedVariant, setSelectedVariant] = useState(options.variant[0].id);
  const [selectedColor, setSelectedColor] = useState(options.color[0].id);
  const [selectedWheels, setSelectedWheels] = useState(options.wheels[0].id);
  const [selectedInterior, setSelectedInterior] = useState(options.interior[0].id);
  const { toast } = useToast();

  const getOptionById = (type: keyof typeof options, id: string) => {
    // @ts-ignore TODO: Fix this type error later
    return options[type].find(opt => opt.id === id);
  };

  const calculateTotalPrice = () => {
    const variantPrice = getOptionById('variant', selectedVariant)?.price || 0;
    const colorPrice = getOptionById('color', selectedColor)?.price || 0;
    const wheelsPrice = getOptionById('wheels', selectedWheels)?.price || 0;
    const interiorPrice = getOptionById('interior', selectedInterior)?.price || 0;
    return basePrice + variantPrice + colorPrice + wheelsPrice + interiorPrice;
  };

  const currentVariant = getOptionById('variant', selectedVariant);
  const currentTotalPrice = calculateTotalPrice();
  const currentCarImage = carImages[selectedColor] || carImages['white']; // Fallback to white
  const currentCarImageHint = carImageHints[selectedColor] || carImageHints['white'];

  const handleSubmitOrder = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Integrate with backend API to store the order
    console.log('Order Submitted:', {
      variant: selectedVariant,
      color: selectedColor,
      wheels: selectedWheels,
      interior: selectedInterior,
      totalPrice: currentTotalPrice,
      // Add user details from form
    });

    toast({
        title: "Order Submitted (Simulated)",
        description: `Your ${currentVariant?.name} configuration has been saved. Total: $${currentTotalPrice.toLocaleString()}`,
    });
    // Redirect or show success message
  };


  return (
    <div className="min-h-screen container mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Customize Your Model S</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Preview */}
        <div className="lg:col-span-2 relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image
            src={currentCarImage}
            alt={`Model S in ${getOptionById('color', selectedColor)?.name}`}
            layout="fill"
            objectFit="cover"
            quality={90}
            data-ai-hint={currentCarImageHint}
            className="transition-opacity duration-500" // Optional fade effect
          />
           <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {getOptionById('color', selectedColor)?.name} - {getOptionById('wheels', selectedWheels)?.name}
           </div>
        </div>

        {/* Configuration Options & Summary */}
        <Card className="lg:col-span-1 flex flex-col h-fit sticky top-20">
          <CardHeader>
            <CardTitle>Configure Your Car</CardTitle>
             <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm text-muted-foreground">{currentVariant?.name}</span>
                <span className="text-xl font-semibold">${currentTotalPrice.toLocaleString()}</span>
              </div>
             <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>Est. Delivery: Aug - Sep 2024</span> {/* Placeholder */}
                <span>{currentVariant?.range} Range (EPA est.)</span>
             </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 space-y-6 flex-grow overflow-y-auto max-h-[60vh]">
            {/* Variant Selection */}
            <div className="space-y-2">
              <Label className="text-lg font-medium">Variant</Label>
              <RadioGroup value={selectedVariant} onValueChange={setSelectedVariant}>
                {options.variant.map((variant) => (
                  <Label key={variant.id} htmlFor={variant.id} className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary">
                    <div className="flex items-center space-x-3">
                       <RadioGroupItem value={variant.id} id={variant.id} />
                       <div>
                         <span className="font-medium block">{variant.name}</span>
                         <span className="text-xs text-muted-foreground">{variant.range} / {variant.topSpeed} / {variant.zeroToSixty}</span>
                       </div>
                    </div>
                    <span className="text-sm font-medium">+${variant.price.toLocaleString()}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
              <Label className="text-lg font-medium">Paint</Label>
               <div className="flex flex-wrap gap-3">
                   {options.color.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColor(color.id)}
                        className={cn(
                            "w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            selectedColor === color.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent'
                        )}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                        title={`${color.name} ($${color.price.toLocaleString()})`}
                      />
                   ))}
               </div>
              <p className="text-sm text-muted-foreground">{getOptionById('color', selectedColor)?.name} - ${getOptionById('color', selectedColor)?.price.toLocaleString()}</p>
            </div>

             <Separator />

             {/* Wheels Selection */}
             <div className="space-y-3">
                <Label className="text-lg font-medium">Wheels</Label>
                <div className="flex gap-4 justify-center">
                    {options.wheels.map((wheel) => (
                        <button
                           key={wheel.id}
                           type="button"
                           onClick={() => setSelectedWheels(wheel.id)}
                           className={cn(
                              "flex flex-col items-center p-2 border rounded-md cursor-pointer hover:bg-accent",
                              selectedWheels === wheel.id ? 'bg-accent border-primary' : ''
                           )}
                        >
                           <Image src={wheel.image} alt={wheel.name} width={60} height={60} className="rounded-full mb-2" data-ai-hint={wheel.hint}/>
                           <span className="text-xs text-center">{wheel.name}</span>
                        </button>
                    ))}
                </div>
                 <p className="text-sm text-muted-foreground text-center">{getOptionById('wheels', selectedWheels)?.name} - ${getOptionById('wheels', selectedWheels)?.price.toLocaleString()}</p>
             </div>

             <Separator />

             {/* Interior Selection */}
             <div className="space-y-3">
                <Label className="text-lg font-medium">Interior</Label>
                 <div className="flex flex-wrap gap-3">
                    {options.interior.map((interior) => (
                       <button
                          key={interior.id}
                          type="button"
                          onClick={() => setSelectedInterior(interior.id)}
                          className={cn(
                              "w-10 h-10 rounded-full border-2 flex overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                              selectedInterior === interior.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent'
                          )}
                          aria-label={interior.name}
                          title={`${interior.name} ($${interior.price.toLocaleString()})`}
                       >
                           {interior.colors.map((bgColor, index) => (
                               <span key={index} className="h-full flex-1" style={{ backgroundColor: bgColor }}></span>
                           ))}
                       </button>
                    ))}
                 </div>
                <p className="text-sm text-muted-foreground">{getOptionById('interior', selectedInterior)?.name} - ${getOptionById('interior', selectedInterior)?.price.toLocaleString()}</p>
             </div>


          </CardContent>
          <Separator />
          <CardFooter className="p-6">
            <form onSubmit={handleSubmitOrder} className="w-full space-y-4">
               {/* Simple form example - replace with actual user details form */}
               <div>
                 <Label htmlFor="email">Email for Order Updates</Label>
                 <Input id="email" type="email" placeholder="your.email@example.com" required className="mt-1" />
               </div>
               <Button type="submit" className="w-full" size="lg">
                 Place Order - ${currentTotalPrice.toLocaleString()}
               </Button>
                <p className="text-xs text-muted-foreground text-center">By placing this order, you agree to the Terms & Conditions.</p>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
