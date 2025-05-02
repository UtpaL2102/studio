
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, HelpCircle, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// Removed TopBanner component

const mainNavItems = [
  { label: 'Vehicles', href: '#' }, // Updated to match image
  { label: 'Energy', href: '#' },
  { label: 'Charging', href: '#' },
  { label: 'Discover', href: '#' },
  { label: 'Shop', href: '#' },
];

// Updated order and icons to match image
const accountNavItems = [
  { label: 'Help', href: '#', icon: HelpCircle },
  { label: 'Language', href: '#', icon: Globe },
  { label: 'Account', href: '#', icon: User },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Make navbar background appear only when scrolled down significantly
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Removed TopBanner */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300', // Navbar starts at the top
          isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent' // Transparent when not scrolled
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={cn(
              "text-2xl font-semibold tracking-[0.2em]", // Use tracking for letter spacing like tesla-logo class
              isScrolled ? 'text-black' : 'text-white' // Always white when transparent
            )}>
            TESLA
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex flex-grow items-center justify-center">
            <ul className="flex items-center space-x-2">
              {mainNavItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} passHref legacyBehavior>
                    <a className={cn(
                      "text-sm font-medium px-3 py-2 rounded-md hover:bg-black/10 transition-colors", // Subtle hover
                      isScrolled ? 'text-gray-800 hover:bg-gray-200/80' : 'text-white hover:bg-white/15' // White text when transparent
                      )}>
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Account Menu & Mobile Trigger */}
          <div className="flex items-center">
            <ul className="hidden lg:flex items-center space-x-1">
              {accountNavItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} passHref legacyBehavior>
                    <Button variant="ghost" size="icon" className={cn(
                      "rounded-full",
                      isScrolled ? 'text-gray-700 hover:bg-gray-200/80' : 'text-white hover:bg-white/15' // White icon when transparent
                      )}>
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden ml-2">
                 {/* Use Button component for SheetTrigger */}
                 <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                       "rounded-md p-1", // Added padding
                       isScrolled ? 'text-gray-700 hover:bg-gray-200/80' : 'text-white hover:bg-white/15' // White icon when transparent
                    )}
                    aria-label="Open menu"
                 >
                    <Menu className="h-6 w-6" />
                 </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-white text-black p-0">
                 <div className="flex justify-end p-4 border-b">
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:bg-gray-100">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <ul className="flex flex-col space-y-1 p-4">
                  {[...mainNavItems, ...accountNavItems].map((item) => ( // Combine menus for mobile
                    <li key={item.label}>
                      <Link href={item.href} passHref legacyBehavior>
                        <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                  {/* Add other mobile links if needed */}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
