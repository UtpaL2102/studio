'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, CircleUser } from 'lucide-react'; // Assuming CircleUser for Schedule icon

// Data for sections - updated to match Tesla structure
const sections = [
   {
    id: 'model-y',
    title: 'Model Y',
    description: 'Starting at $41,490',
    subDescription: 'After $7,500 Federal Tax Credit',
    imageUrl: 'https://picsum.photos/seed/modely/1920/1080', // Replace with actual Model Y image
    imageAlt: 'Tesla Model Y',
    imageHint: 'electric car silver suv mountains',
    orderLink: '#', // Add actual link
    learnMoreLink: '#', // Add actual link
    button1Text: 'Order Now',
    button2Text: 'Learn More',
    showArrow: false, // Tesla homepage doesn't typically show arrows between main sections
  },
  {
    id: 'model-s',
    title: 'Model S',
    description: 'Starting at $45,000', // Updated price
    // subDescription: 'Experience the pinnacle of electric performance.', // Original subDescription if needed
    imageUrl: 'https://picsum.photos/seed/models/1920/1080',
    imageAlt: 'Tesla Model S',
    imageHint: 'electric car silver',
    orderLink: '/model-s/customize',
    learnMoreLink: '/model-s',
    button1Text: 'Order Now',
    button2Text: 'Learn More',
    showArrow: false,
  },
  {
    id: 'model-3',
    title: 'Model 3',
    description: 'Lease from $779/Month', // Updated description
    // subDescription: 'The future of driving is here.', // Original subDescription if needed
    imageUrl: 'https://picsum.photos/seed/model3/1920/1080',
    imageAlt: 'Tesla Model 3',
    imageHint: 'electric car red side profile',
    orderLink: '/model-3/customize',
    learnMoreLink: '/model-3',
    button1Text: 'Order Now',
    button2Text: 'Learn More',
    showArrow: false,
  },
   {
    id: 'solar-panels',
    title: 'Solar Panels',
    description: 'Lowest Cost Solar Panels in America',
    imageUrl: 'https://picsum.photos/seed/solar/1920/1080',
    imageAlt: 'Solar panels on a roof',
    imageHint: 'solar panels roof house',
    orderLink: '/solar-panels/order',
    learnMoreLink: '/solar-panels',
    button1Text: 'Order Now',
    button2Text: 'Learn More',
    showArrow: false,
  },
  // Add more sections like Model X, Cybertruck, Solar Roof etc. as needed
];

export default function Home() {
  return (
    <div className="relative">
      {/* Map through sections */}
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="h-screen w-full snap-start flex flex-col items-center justify-between relative overflow-hidden pt-[60px]"> {/* Added padding top for fixed navbar */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-0"></div> {/* Optional subtle gradient */}

          {/* Content: Title & Description */}
          <div className="section-content animate-fade-in-up text-white"> {/* Ensure text is visible */}
             <h1 className="text-4xl md:text-5xl font-semibold mb-1">{section.title}</h1>
             <p className="text-sm md:text-base">{section.description}</p>
             {section.subDescription && (
                <p className="text-xs md:text-sm mt-1">{section.subDescription}</p>
             )}
          </div>

          {/* Buttons */}
           <div className="flex flex-col items-center w-full animate-fade-in-up animation-delay-300 pb-16 md:pb-20"> {/* Adjusted padding */}
             <div className="section-buttons">
               <Link href={section.orderLink} passHref legacyBehavior>
                 <Button size="lg" className="w-64 btn-tesla-primary"> {/* Use primary button style */}
                   {section.button1Text}
                 </Button>
               </Link>
               <Link href={section.learnMoreLink} passHref legacyBehavior>
                 <Button size="lg" className="w-64 btn-tesla-secondary"> {/* Use secondary button style */}
                   {section.button2Text}
                 </Button>
               </Link>
             </div>
          </div>
        </section>
      ))}

      {/* Schedule Drive Button - Fixed at bottom center */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <Button variant="outline" className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-md text-sm px-6 py-2 h-auto">
          {/* Replace with appropriate icon if needed */}
          {/* <CircleUser className="mr-2 h-4 w-4" /> */}
          Schedule a Drive Today
        </Button>
      </div>

      {/* CSS for Animations */}
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
          animation: fadeInUp 0.8s ease-out forwards; /* Slightly faster animation */
          opacity: 0; /* Start hidden */
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        /* Ensure text visibility against various backgrounds */
        .section-content h1, .section-content p {
          text-shadow: 0 1px 3px rgba(0,0,0,0.3); /* Subtle text shadow */
        }

      `}</style>
    </div>
  );
}
