'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, HelpCircle, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// Top banner component
function TopBanner() {
  // Simple banner, can be made dismissible or dynamic later
  return (
    <div className="bg-yellow-100 text-center py-2 px-4 text-sm text-yellow-900">
      We're celebrating Earth Day.{' '}
      <Link href="#" className="font-semibold underline hover:text-yellow-700">
        Learn More
      </Link>
    </div>
  );
}

const mainNavItems = [
  { label: 'Vehicles', href: '#' }, // Replace # with actual links later
  { label: 'Energy', href: '#' },
  { label: 'Charging', href: '#' },
  { label: 'Discover', href: '#' },
  { label: 'Shop', href: '#' },
];

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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <TopBanner />
      <header
        className={cn(
          'fixed top-[40px] left-0 right-0 z-50 transition-colors duration-300', // Adjusted top position due to banner
          isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={cn(
              "text-xl font-semibold tesla-logo", // Using tesla-logo class from globals.css
              isScrolled ? 'text-black' : 'text-white mix-blend-difference' // Adjust text color based on scroll
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
                      "text-sm font-medium px-3 py-2 rounded-md hover:bg-black/5 transition-colors",
                      isScrolled ? 'text-gray-800 hover:bg-gray-200' : 'text-white mix-blend-difference hover:bg-white/10'
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
                      isScrolled ? 'text-gray-700 hover:bg-gray-200' : 'text-white mix-blend-difference hover:bg-white/10'
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
                <Button variant="ghost" size="icon" className={cn(
                   "rounded-md",
                   isScrolled ? 'text-gray-700 hover:bg-gray-200' : 'text-white mix-blend-difference hover:bg-white/10'
                  )}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
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
                  {[...mainNavItems, ...accountNavItems].map((item) => (
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
