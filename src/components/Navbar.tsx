"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AuthModal from './auth/AuthModal';

const vehicles = [
  {
    name: 'Model S',
    image: '/model-s.png',
    learnLink: '/model-s',
    orderLink: '/model-s/order'
  },
  {
    name: 'Model 3',
    image: '/model-3.png',
    learnLink: '/model-3',
    orderLink: '/model-3/order'
  },
  {
    name: 'Model X',
    image: '/model-x.png',
    learnLink: '/model-x',
    orderLink: '/model-x/order'
  },
  {
    name: 'Model Y',
    image: '/model-y.png',
    learnLink: '/model-y',
    orderLink: '/model-y/order'
  },
  {
    name: 'Cybertruck',
    image: '/cybertruck.png',
    learnLink: '/cybertruck',
    orderLink: '/cybertruck/order'
  }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vehiclesOpen, setVehiclesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const vehiclesRef = useRef(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setDropdownOpen(false);
      }
      if (vehiclesRef.current && !(vehiclesRef.current as any).contains(event.target)) {
        setVehiclesOpen(false);
      }
    }
    if (dropdownOpen || vehiclesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, vehiclesOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">TESLA</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative" ref={vehiclesRef}>
                <button
                  onMouseEnter={() => setVehiclesOpen(true)}
                  onClick={() => setVehiclesOpen(!vehiclesOpen)}
                  className="text-gray-700 hover:text-black py-2"
                >
                  Vehicles
                </button>
              </div>
              <Link href="/energy" className="text-gray-700 hover:text-black">
                Energy
              </Link>
              <Link href="/charging" className="text-gray-700 hover:text-black">
                Charging
              </Link>
              <Link href="/discover" className="text-gray-700 hover:text-black">
                Discover
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-black">
                Shop
              </Link>
            </div>

            {/* Profile Icon & Auth Modal */}
            <div className="flex items-center space-x-4 relative">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                    aria-label="User menu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                      <div className="px-4 py-2 text-gray-700">Hello, {user.name}</div>
                      <button
                        onClick={() => { logout(); setDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-label="Sign in or create account"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                  </svg>
                </button>
              )}
              {/* Auth Modal */}
              <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Vehicles Dropdown */}
      <div
        className={`fixed top-16 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          vehiclesOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        onMouseLeave={() => setVehiclesOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-5 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.name} className="flex flex-col items-center">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-32 object-contain mb-4"
                />
                <h3 className="text-lg font-medium mb-2">{vehicle.name}</h3>
                <div className="flex space-x-4 text-sm">
                  <Link href={vehicle.learnLink} className="text-gray-600 hover:text-black">
                    Learn
                  </Link>
                  <Link href={vehicle.orderLink} className="text-gray-600 hover:text-black">
                    Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 