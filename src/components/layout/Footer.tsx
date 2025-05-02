import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ElectroDrive. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
