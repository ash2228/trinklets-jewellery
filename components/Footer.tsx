'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck, Truck, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { addToast } = useCart();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || 'Subscribed successfully!');
        setEmail('');
        addToast(data.message || 'Thank you for subscribing!', 'success');
      } else {
        setErrorMsg(data.error || 'Subscription failed. Please seek assistance.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-dark text-neutral-300 font-sans border-t border-gold-500/15">
      
      {/* Brand Values Accents */}
      <div className="bg-neutral-950/40 border-b border-neutral-800/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 border border-gold-500/15 rounded-sm">
              <Truck className="h-6 w-6 text-gold-500" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm tracking-widest uppercase">Premium Delivery</h4>
              <p className="text-xs text-neutral-400 mt-1">Fast premium delivery in 2-6 business days.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 border border-gold-500/15 rounded-sm">
              <ShieldCheck className="h-6 w-6 text-gold-500" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm tracking-widest uppercase">Anti-Tarnish</h4>
              <p className="text-xs text-neutral-400 mt-1">100% anti-tarnish pieces</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 border border-gold-500/15 rounded-sm">
              <Sparkles className="h-6 w-6 text-gold-500" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm tracking-widest uppercase">Water Proof</h4>
              <p className="text-xs text-neutral-400 mt-1">Water proof material used in jewellery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Info Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-medium tracking-[0.2em] text-white">TRINKLETS</span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold-300 mt-1 pl-1">JEWELLERY</span>
          </div>
          <p className="text-sm font-light text-neutral-400 max-w-sm leading-relaxed">
            Welcome to Trinklets Jewellery. We are dedicated to offering clean-cut, sophisticated, minimalist, and luxury daily wear accessories. Handcrafted in India, enjoyed worldwide.
          </p>
          <div className="pt-2 text-xs text-neutral-500 font-mono tracking-wide">
            domain: <span className="text-neutral-400">trinkletsjewellery.in</span>
          </div>
        </div>

        {/* Shop links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-white font-semibold text-xs tracking-widest uppercase">Collections</h4>
          <ul className="space-y-2.5 text-sm font-light text-neutral-400">
            <li><Link href="/shop?category=Rings" className="hover:text-gold-300 transition-colors">Rings</Link></li>
            <li><Link href="/shop?category=Necklaces" className="hover:text-gold-300 transition-colors">Necklaces</Link></li>
            <li><Link href="/shop?category=Earrings" className="hover:text-gold-300 transition-colors">Earrings</Link></li>
            <li><Link href="/shop?category=Bracelets" className="hover:text-gold-300 transition-colors">Bracelets</Link></li>
            <li><Link href="/shop?category=Watches" className="hover:text-gold-300 transition-colors">Watches</Link></li>
            <li><Link href="/shop" className="hover:text-gold-300 transition-colors">Shop All</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-white font-semibold text-xs tracking-widest uppercase">Assistance</h4>
          <ul className="space-y-2.5 text-sm font-light text-neutral-400">
            <li><Link href="/about" className="hover:text-gold-300 transition-colors">About Trinklets</Link></li>
            <li><Link href="/contact" className="hover:text-gold-300 transition-colors">Get Support</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold-300 transition-colors">Terms of Service</Link></li>
            <li><Link href="/refund" className="hover:text-gold-300 transition-colors">Refund & Return Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white font-semibold text-xs tracking-widest uppercase">The Trinklets Journal</h4>
          <p className="text-sm font-light text-neutral-400">
            Keep in touch with private sales, previews of fine edits, and clean curation logs.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex border-b border-neutral-600 focus-within:border-gold-300 transition-colors py-1.5 matches-focus">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent border-none text-white focus:outline-none placeholder:text-neutral-500 text-sm flex-1 w-full"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="text-neutral-400 hover:text-gold-300 p-1 transition-colors cursor-pointer"
                aria-label="Subscribe Newsletter"
              >
                {loading ? (
                  <span className="inline-block animate-spin h-4 w-4 border-2 border-amber-300 border-t-transparent rounded-full" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
            
            {successMsg && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                {successMsg}
              </p>
            )}

            {errorMsg && (
              <p className="text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {errorMsg}
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Deepest Copyright Footer section */}
      <div className="bg-neutral-950 border-t border-neutral-800/60 py-6 text-xs text-neutral-500 font-light text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© Trinklets Jewellery (trinkletsjewellery.in). Designed with elegant luxury minimalism.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-neutral-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
