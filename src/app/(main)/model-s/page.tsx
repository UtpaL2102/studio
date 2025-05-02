import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'; // Assuming Carousel exists

// Placeholder data - replace with backend data
const modelSData = {
  name: 'Model S',
  tagline: 'The Future of Driving',
  specs: [
    { name: 'Range (EPA est.)', value: '396 mi' },
    { name: '0-60 mph*', value: '1.99 s' },
    { name: 'Peak Power', value: '1,020 hp' },
    { name: 'Top Speed', value: '200 mph' },
  ],
  images: [
    { src: 'https://picsum.photos/seed/models-front/1200/800', alt: 'Model S Front View', hint: 'electric car silver front' },
    { src: 'https://picsum.photos/seed/models-side/1200/800', alt: 'Model S Side View', hint: 'electric car silver side profile' },
    { src: 'https://picsum.photos/seed/models-interior/1200/800', alt: 'Model S Interior', hint: 'car interior modern dashboard' },
    { src: 'https://picsum.photos/seed/models-back/1200/800', alt: 'Model S Back View', hint: 'electric car silver rear' },
  ],
  orderLink: '/model-s/customize',
  learnMoreLink: '/model-s/features', // Example link
};

export default function ModelSPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {modelSData.images.map((image, index) => (
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
           <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">{modelSData.name}</h1>
           <p className="text-lg md:text-xl text-primary-foreground">{modelSData.tagline}</p>
         </div>
      </section>

      {/* Specs and Order Section */}
      <section className="container mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        <Card className="bg-card/90 backdrop-blur-md shadow-xl border-none">
          <CardContent className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
              {/* Specs */}
              <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {modelSData.specs.map((spec) => (
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
                 <p className="text-sm text-muted-foreground text-center md:text-left mb-2">Ready to configure?</p>
                 <Link href={modelSData.orderLink} passHref legacyBehavior>
                   <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground">Customize & Order</Button>
                 </Link>
                 <Link href={modelSData.learnMoreLink} passHref legacyBehavior>
                    <Button variant="link" className="w-full md:w-auto text-primary">Learn More Features</Button>
                 </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

       {/* Additional Feature Sections (Optional) */}
      <section className="container mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-10">Explore Model S</h2>
        {/* Add more detailed sections about features, interior, safety etc. */}
        <div className="text-center p-10 border rounded-lg">
            <p className="text-muted-foreground">More feature details coming soon...</p>
        </div>
      </section>
    </div>
  );
}
