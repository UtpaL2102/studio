'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Data for sections - updated to match Tesla structure and user request
const sections = [
   {
    id: 'model-y',
    title: 'Model Y',
    description: 'Starting at $41,490', // Keep original price if not specified
    subDescription: 'After $7,500 Federal Tax Credit',
    imageUrl: 'https://picsum.photos/seed/tesla-model-y-mountains/1920/1080', // Tesla car image
    imageAlt: 'Tesla Model Y driving in mountains',
    imageHint: 'tesla model y silver mountains driving',
    orderLink: '#', // Add actual link
    learnMoreLink: '#', // Add actual link
    button1Text: 'Order Now',
    button2Text: 'Learn More',
    showArrow: false,
  },
  {
    id: 'model-s', // Changed to Cybertruck as requested by image hint
    title: 'Cybertruck', // Changed title
    description: 'Starting at $ 45,000', // User requested price for Model S, applying to Cybertruck here
    // subDescription: 'Better Utility Than A Truck With More Performance Than A Sports Car', // Cybertruck tagline
    imageUrl: 'https://picsum.photos/seed/tesla-cybertruck-terrain/1920/1080', // Tesla Cybertruck image
    imageAlt: 'Tesla Cybertruck on rough terrain',
    imageHint: 'tesla cybertruck silver terrain offroad',
    orderLink: '/model-s/customize', // Link might need update if it's for Cybertruck
    learnMoreLink: '/model-s', // Link might need update
    button1Text: 'Order Now',
    button2Text: 'Learn More',
    showArrow: false,
  },
  {
    id: 'model-3',
    title: 'Model 3',
    description: 'Lease from $779/Month', // User requested description
    // subDescription: 'The future of driving is here.',
    imageUrl: 'https://picsum.photos/seed/tesla-model-3-red-road/1920/1080', // Tesla car image
    imageAlt: 'Red Tesla Model 3 on the road',
    imageHint: 'tesla model 3 red road driving',
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
    imageUrl: 'https://picsum.photos/seed/tesla-solar-panels-roof/1920/1080', // Solar panels image
    imageAlt: 'Solar panels installed on a house roof',
    imageHint: 'solar panels house roof modern',
    orderLink: '/solar-panels/order',
    learnMoreLink: '/solar-panels',
    button1Text: 'Order Now',
    button2Text: 'Learn More',
    showArrow: false,
  },
  // Add more sections like Model X, Solar Roof etc. if needed
];

export default function Home() {
  return (
    <div className="relative">
      {/* Map through sections */}
      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className="h-screen w-full snap-start flex flex-col items-center justify-between relative overflow-hidden"> {/* Adjusted pt-[60px] is handled by globals.css */}
          {/* Background Image */}
          <div className="absolute inset-0 z-0"> {/* Image container */}
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
             <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-1"></div> {/* Optional subtle gradient overlay */}
          </div>


          {/* Content: Title & Description */}
          <div className="section-content text-white"> {/* Ensure text is visible */}
             <h1 className="text-4xl md:text-5xl font-semibold mb-1">{section.title}</h1>
             <p className="text-sm md:text-base">{section.description}</p>
             {section.subDescription && (
                <p className="text-xs md:text-sm mt-1">{section.subDescription}</p>
             )}
          </div>

          {/* Buttons */}
           <div className="flex flex-col items-center w-full pb-16 md:pb-20 z-10"> {/* Buttons need z-index */}
             <div className="section-buttons">
               <Link href={section.orderLink} passHref legacyBehavior>
                 <Button size="lg" className="w-64 btn-tesla-primary"> {/* Use primary button style */}
                   {section.button1Text}
                 </Button>
               </Link>
               {section.button2Text && ( // Conditionally render second button
                 <Link href={section.learnMoreLink} passHref legacyBehavior>
                   <Button size="lg" className="w-64 btn-tesla-secondary"> {/* Use secondary button style */}
                     {section.button2Text}
                   </Button>
                 </Link>
               )}
             </div>
          </div>
        </section>
      ))}

      {/* Removed Schedule Drive Button */}

      {/* CSS for Animations (Keep if needed, but may not be necessary for static look) */}
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
        .section-content, .section-buttons {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
         /* Ensure animation runs for buttons too */
        .flex.flex-col.items-center.w-full {
            animation: fadeInUp 0.8s ease-out 0.3s forwards; /* Delay button animation slightly */
            opacity: 0;
        }


        /* Ensure text visibility against various backgrounds */
        .section-content h1, .section-content p {
          text-shadow: 0 1px 3px rgba(0,0,0,0.3); /* Subtle text shadow */
        }

      `}</style>
    </div>
  );
}
