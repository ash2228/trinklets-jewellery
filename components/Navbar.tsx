'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setTimeout(() => {
      setMobileMenuOpen(false);
    }, 0);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-gold-500/15 py-3 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 -ml-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo Brand Title */}
          <Link href="/" className="flex flex-col items-center">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.25em] text-neutral-900 leading-none">
              TRINKLETS
            </span>
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold-600 mt-1 pl-1">
              JEWELLERY
            </span>
          </Link>

          {/* Navigation Links Desktop */}
          <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-gold-600 transition-colors relative py-1 ${
                    isActive ? 'text-gold-600' : ''
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Cart Icon Toggle */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-neutral-700 hover:text-gold-600 transition-colors relative cursor-pointer"
              aria-label="Toggle Shopping Cart Drawer"
            >
              <ShoppingBag className="h-[21px] w-[21px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 flex items-center justify-center bg-gold-500 text-white rounded-full text-[9px] font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlays */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden cursor-pointer"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-xs bg-neutral-900 text-neutral-100 z-50 md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-neutral-800">
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-[0.2em] font-medium text-white">TRINKLETS</span>
                  <span className="text-[8px] uppercase tracking-[0.4em] text-gold-300">JEWELLERY</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 px-6 py-8 space-y-6 flex flex-col">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-lg font-serif tracking-wide border-b border-neutral-800 pb-3 flex items-center justify-between ${
                        isActive ? 'text-gold-300' : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                      <ArrowRight className="h-4 w-4 opacity-50" />
                    </Link>
                  );
                })}
              </div>

              <div className="p-6 border-t border-neutral-800 text-center">
                <p className="text-xs text-neutral-500 font-sans">© 2026 Trinklets Jewellery. All rights reserved.</p>
                <div className="mt-1 flex justify-center gap-4 text-[10px] text-neutral-400 font-medium">
                  <Link href="/privacy" className="hover:underline">Privacy</Link>
                  <span>•</span>
                  <Link href="/terms" className="hover:underline">Terms</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
