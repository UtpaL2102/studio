import type { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
// Footer removed as per previous instruction

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen"> {/* Ensure at least screen height */}
      <Navbar />
      {/* Removed flex-grow to allow content to dictate height, especially for two-pane layouts */}
      <main>
        {children}
      </main>
      {/* Footer might not be needed for a full-page scroll site like Tesla's */}
      {/* <Footer /> */}
    </div>
  );
}
