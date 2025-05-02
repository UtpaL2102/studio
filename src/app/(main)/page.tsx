'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

// Data for sections (replace with data from backend later)
const sections = [
  {
    id: 'model-s',
    title: 'Model S',
    description: 'Experience the pinnacle of electric performance.',
    imageUrl: 'https://picsum.photos/seed/models/1920/1080',
    imageAlt: 'Tesla Model S',
    imageHint: 'electric car silver',
    orderLink: '/model-s/customize', // Updated link
    learnMoreLink: '/model-s',
    showArrow: true,
  },
  {
    id: 'model-3',
    title: 'Model 3',
    description: 'The future of driving is here.',
    imageUrl: 'https://picsum.photos/seed/model3/1920/1080',
    imageAlt: 'Tesla Model 3',
    imageHint: 'electric car red side profile',
    orderLink: '/model-3/customize', // Updated link
    learnMoreLink: '/model-3',
    showArrow: true,
  },
   {
    id: 'solar-panels',
    title: 'Solar Panels',
    description: 'Lowest Cost Solar Panels in America',
    imageUrl: 'https://picsum.photos/seed/solar/1920/1080',
    imageAlt: 'Solar panels on a roof',
    imageHint: 'solar panels roof house',
    orderLink: '/solar-panels/order', // Needs a dedicated order/quote page
    learnMoreLink: '/solar-panels',
    showArrow: false, // Last section doesn't need an arrow
  },
  // Add more sections as needed
];

export default function Home() {
  return (
    <div className="relative">
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="h-screen w-full snap-start flex flex-col items-center justify-between relative overflow-hidden">
          {/* Background Image */}
          <Image
            src={section.imageUrl}
            alt={section.imageAlt}
            layout="fill"
            objectFit="cover"
            quality={90}
            priority={index === 0} // Prioritize loading the first image
            className="section-background"
            data-ai-hint={section.imageHint}
          />
          <div className="absolute inset-0 bg-black/10 z-0"></div> {/* Optional subtle overlay */}

          {/* Content: Title & Description */}
          <div className="section-content animate-fade-in-up">
             <h1 className="text-4xl md:text-5xl font-semibold text-primary-foreground mb-2">{section.title}</h1>
             <p className="text-sm md:text-base text-primary-foreground">{section.description}</p>
          </div>

          {/* Buttons & Arrow */}
           <div className="flex flex-col items-center w-full animate-fade-in-up animation-delay-300">
             <div className="section-buttons">
               <Link href={section.orderLink} passHref legacyBehavior>
                 <Button size="lg" className="w-64 bg-white/80 text-black hover:bg-white backdrop-blur-sm">
                   Order Now
                 </Button>
               </Link>
               <Link href={section.learnMoreLink} passHref legacyBehavior>
                 <Button size="lg" variant="secondary" className="w-64 bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm">
                   Learn More
                 </Button>
               </Link>
             </div>

             {/* Scroll Down Arrow */}
             {section.showArrow && (
               <a href={`#${sections[index + 1]?.id || ''}`} className="mb-4 md:mb-6 animate-bounce">
                 <ArrowDown className="h-6 w-6 text-primary-foreground" />
                 <span className="sr-only">Scroll to next section</span>
               </a>
             )}
          </div>
        </section>
      ))}

      {/* CSS for Animations (can be moved to globals.css) */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
