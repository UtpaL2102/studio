'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Model S', href: '/model-s' },
  { label: 'Model 3', href: '/model-3' },
  { label: 'Solar Panels', href: '/solar-panels' },
  // Add more products as needed
];

const accountItems = [
  { label: 'Shop', href: '#' },
  { label: 'Account', href: '#' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Add subtle background on scroll
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary-foreground mix-blend-difference">
          ElectroDrive
        </Link>

        {/* Desktop Menu - Centered */}
        <div className="hidden lg:flex flex-grow items-center justify-center">
          <ul className="flex items-center space-x-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <a className="text-sm font-medium text-primary-foreground mix-blend-difference px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Account Menu & Mobile Trigger */}
        <div className="flex items-center">
          <ul className="hidden lg:flex items-center space-x-4 mr-4">
            {accountItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                   <a className="text-sm font-medium text-primary-foreground mix-blend-difference px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                     {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground mix-blend-difference hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-background text-foreground p-0">
              <div className="flex justify-end p-4">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-foreground">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <ul className="flex flex-col space-y-2 p-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} passHref legacyBehavior>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
                <hr className="my-4" />
                {accountItems.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} passHref legacyBehavior>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
                {/* Add more mobile-specific links if needed */}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
