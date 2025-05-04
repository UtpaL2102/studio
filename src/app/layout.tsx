import type { Metadata } from 'next';
// Using system font stack for closer resemblance to Tesla's font
// import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'TESLA', // Updated title
  description: 'Experience the future of driving.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      {/* Use system font stack */}
      <body className={`antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
