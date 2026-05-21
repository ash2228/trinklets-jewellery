'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Gem, Anchor } from 'lucide-react';

export default function About() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <ToastContainer />

      <main className="pt-28 pb-20 select-none">
        
        {/* Editorial Heading */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold">The Authentic Journey</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extralight tracking-widest text-neutral-900 leading-tight">
            Our Story & Heritage
          </h1>
          <div className="h-0.5 w-16 bg-gold-300 mx-auto" />
        </section>

        {/* Narrative columns and imagery */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[480px] rounded-sm overflow-hidden bg-neutral-200 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800"
              alt="Artisan Crafting Jewellery"
              fill
              priority
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-6 text-neutral-600 font-light leading-relaxed text-sm sm:text-base">
            <h2 className="font-serif text-2xl text-neutral-900 tracking-wide font-normal">
              Designed with a feminine touch, handmade with love.
            </h2>
            <p>
              Founded in 2026, **Trinklets Jewellery** was born out of a desire to redefine luxury accessories for the modern woman. We believe jewelry shouldn&rsquo;t only be reserved for rare occasions; luxury should be an effortless, quiet, daily pleasure.
            </p>
            <p>
              Our collections represent the intersection of beautiful aesthetic minimalism and the richness of Indian craftsmanship. Every pendant, clasp, earring stem, and ring band is designed in-house, focusing on soft organic forms, clean-cut symmetry, and skin-friendly metals.
            </p>
            <p>
              By opting for 18k premium gold vermeil layering over solid sterling silver, we deliver the exact look, weight, and luxurious tactile experience of solid gold jewelry at a fraction of the cost, making genuine fine jewelry accessible.
            </p>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="bg-neutral-100 py-20 border-y border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-gold-500 font-bold">Uncompromising Details</span>
              <h2 className="font-serif text-3xl text-neutral-900 tracking-wide font-normal">Our Creative Pillars</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-sm text-center border border-neutral-200/50 space-y-4">
                <div className="p-3 bg-amber-50 rounded-full inline-block">
                  <Gem className="h-6 w-6 text-gold-500" />
                </div>
                <h3 className="font-serif text-lg text-neutral-900 font-medium tracking-wide">Excellent Craft</h3>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  Every stone is carefully handpicked and individually claw-set to maximize capture rates and brilliance.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm text-center border border-neutral-200/50 space-y-4">
                <div className="p-3 bg-amber-50 rounded-full inline-block">
                  <Heart className="h-6 w-6 text-gold-500" />
                </div>
                <h3 className="font-serif text-lg text-neutral-900 font-medium tracking-wide">Hypoallergenic</h3>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  Nickel-free, lead-free, and copper-free bases, ensuring safe daily application on sensitive skin.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm text-center border border-neutral-200/50 space-y-4">
                <div className="p-3 bg-amber-50 rounded-full inline-block">
                  <ShieldCheck className="h-6 w-6 text-gold-500" />
                </div>
                <h3 className="font-serif text-lg text-neutral-900 font-medium tracking-wide">Sustainable Sourcing</h3>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  All freshwater pearls and cubic zirconia stones are ethically harvested and sourced under fair trade principles.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm text-center border border-neutral-200/50 space-y-4">
                <div className="p-3 bg-amber-50 rounded-full inline-block">
                  <Anchor className="h-6 w-6 text-gold-500" />
                </div>
                <h3 className="font-serif text-lg text-neutral-900 font-medium tracking-wide">Indian Roots</h3>
                <p className="text-neutral-500 text-xs font-light leading-relaxed">
                  Proudly promoting standard local karigars and artisans across Jaipur and Bengal, preserving classic skills.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
