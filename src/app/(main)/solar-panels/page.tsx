import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Sun, ShieldCheck } from 'lucide-react'; // Example icons

// Placeholder data - replace with backend data
const solarData = {
  name: 'Solar Panels',
  tagline: 'Power Your Home with Clean Energy',
  features: [
    { icon: Sun, title: 'Maximum Sun Exposure', description: 'Designed for high efficiency and durability.' },
    { icon: Zap, title: 'Seamless Integration', description: 'Monitor and control your energy production.' },
    { icon: ShieldCheck, title: '25-Year Warranty', description: 'Industry-leading performance guarantee.' },
  ],
  imageUrl: 'https://picsum.photos/seed/solar-roof/1920/1080',
  imageAlt: 'Close up of solar panels on a modern house roof',
  imageHint: 'solar panels roof close up modern house',
  orderLink: '/solar-panels/order',
  learnMoreLink: '/solar-panels/details',
};

export default function SolarPanelsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={solarData.imageUrl}
          alt={solarData.imageAlt}
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
          data-ai-hint={solarData.imageHint}
          className="brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-5"></div>
        <div className="absolute bottom-10 md:bottom-20 text-center z-10 px-4">
           <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-2">{solarData.name}</h1>
           <p className="text-lg md:text-xl text-primary-foreground">{solarData.tagline}</p>
         </div>
      </section>

      {/* Features and Order Section */}
      <section className="container mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-10">
        <Card className="bg-card/90 backdrop-blur-md shadow-xl border-none">
          <CardContent className="p-6 md:p-10">
             <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-8 md:mb-12">Why Choose ElectroDrive Solar?</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
               {solarData.features.map((feature) => (
                 <div key={feature.title} className="flex flex-col items-center text-center">
                   <feature.icon className="h-10 w-10 text-primary mb-4" />
                   <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                   <p className="text-sm text-muted-foreground">{feature.description}</p>
                 </div>
               ))}
             </div>

             <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href={solarData.orderLink} passHref legacyBehavior>
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground">
                    Request a Quote
                  </Button>
                </Link>
                <Link href={solarData.learnMoreLink} passHref legacyBehavior>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
             </div>
          </CardContent>
        </Card>
      </section>

       {/* Additional Info Section (Optional) */}
      <section className="container mx-auto py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-10">Power Your Future</h2>
        <div className="text-center p-10 border rounded-lg">
            <p className="text-muted-foreground">Detailed installation process and savings calculator coming soon...</p>
        </div>
      </section>
    </div>
  );
}
