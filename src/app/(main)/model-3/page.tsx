import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Placeholder data - replace with backend data
const model3Data = {
  name: 'Model 3',
  tagline: 'Designed for Electric Powertrain',
  specs: [
    { name: 'Range (EPA est.)', value: '341 mi' },
    { name: '0-60 mph*', value: '3.1 s' },
    { name: 'Drive', value: 'Dual Motor AWD' },
    { name: 'Seating', value: '5 Adults' },
  ],
  images: [
    { src: 'https://picsum.photos/seed/model3-front/1200/800', alt: 'Model 3 Front View', hint: 'electric car red front' },
    { src: 'https://picsum.photos/seed/model3-side/1200/800', alt: 'Model 3 Side View', hint: 'electric car red side profile sunny' },
    { src: 'https://picsum.photos/seed/model3-interior/1200/800', alt: 'Model 3 Interior', hint: 'car interior minimalist dashboard screen' },
    { src: 'https://picsum.photos/seed/model3-back/1200/800', alt: 'Model 3 Back View', hint: 'electric car red rear lights' },
  ],
  orderLink: '/model-3/customize',
  learnMoreLink: '/model-3/features',
};

export default function Model3Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {model3Data.images.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority={index === 0}
                    data-ai-hint={image.hint}
                    className="brightness-90"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-5"></div>
        <div className="absolute bottom-10 md:bottom-20 text-center z-10 px-4">
           <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">{model3Data.name}</h1>
           <p className="text-lg md:text-xl text-primary-foreground">{model3Data.tagline}</p>
         </div>
      </section>

      {/* Specs and Order Section */}
      <section className="container mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        <Card className="bg-card/90 backdrop-blur-md shadow-xl border-none">
          <CardContent className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
              {/* Specs */}
              <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {model3Data.specs.map((spec) => (
                  <div key={spec.name}>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{spec.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{spec.name}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block border-l border-border h-20 mx-auto"></div>

              {/* CTA Buttons */}
              <div className="md:col-span-1 flex flex-col items-center md:items-start space-y-4">
                 <p className="text-sm text-muted-foreground text-center md:text-left mb-2">Configure your Model 3</p>
                 <Link href={model3Data.orderLink} passHref legacyBehavior>
                   <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground">Customize & Order</Button>
                 </Link>
                 <Link href={model3Data.learnMoreLink} passHref legacyBehavior>
                    <Button variant="link" className="w-full md:w-auto text-primary">Learn More Features</Button>
                 </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Additional Feature Sections (Optional) */}
      <section className="container mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-10">Discover Model 3</h2>
        <div className="text-center p-10 border rounded-lg">
            <p className="text-muted-foreground">More feature details coming soon...</p>
        </div>
      </section>
    </div>
  );
}
