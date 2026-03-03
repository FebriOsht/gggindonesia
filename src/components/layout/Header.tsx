'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { 
      name: 'Produk', 
      href: '#products',
      dropdown: [
        { name: 'Kopi Premium', href: '#products' },
        { name: 'Kelapa & Turunan', href: '#products' },
        { name: 'Pinang & Sayuran', href: '#products' }
      ]
    },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Keunggulan', href: '#why-us' },
    { name: 'Blog', href: '/blog' }, // Menambahkan menu Blog di sini
  ];

  // Dynamic classes based on scroll state
  const textColor = scrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-gray-100 hover:text-white';

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' 
        : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/img/gggindonesia.png" 
              alt="Gatha Gemilang Global" 
              className="h-14 sm:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className={`flex items-center space-x-1 font-medium transition-colors duration-300 ${textColor}`}>
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-180" />
                    </button>
                    {/* Dropdown Menu Desktop */}
                    <div className="absolute top-full left-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 overflow-hidden">
                      <div className="py-2">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            href={dropItem.href}
                            className="block px-6 py-3 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors font-medium"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors duration-300 ${textColor}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* CTA Button Desktop */}
            <Link 
              href="#contact"
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                scrolled 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md' 
                  : 'bg-white/10 text-white border border-white/30 hover:bg-white hover:text-emerald-900'
              }`}
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden absolute top-full left-4 right-4 mt-2 transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
        }`}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                {item.dropdown ? (
                  <div className="space-y-3">
                    <span className="font-bold text-gray-900 block">{item.name}</span>
                    <div className="flex flex-col space-y-3 pl-4 border-l-2 border-emerald-100">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="text-gray-600 hover:text-emerald-600 font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="font-bold text-gray-900 hover:text-emerald-600 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link 
                href="#contact"
                className="w-full flex justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;