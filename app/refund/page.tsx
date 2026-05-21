'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal tracking-wide mb-2">Refund & Return Policy</h1>
        <p className="text-xs text-neutral-400 font-mono mb-8">Last Updated: May 20, 2026</p>

        <div className="prose prose-neutral max-w-none text-neutral-600 space-y-6 text-sm font-light leading-relaxed">
          <p>
            At Trinklets Jewellery, our customer satisfaction is our top priority. Since each jewelry piece is individually handcrafted and treated with exquisite care, we enforce a transparent, fair, and reliable return structure.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">1. 7-Day Hassle-Free Returns</h2>
          <p>
            We offer our boutique customers a <strong>7-day return guarantee</strong> from the exact date their package was shipped. If 7 days have passed since delivery, we unfortunately cannot offer you a cash refund or a item replacement.
          </p>
          <p>
            To qualify for a returned item, the jewelry must be absolutely unused, unworn, unscratched, and in the exact gorgeous state in which it was received, complete with its velvet box, handwritten gift cards, wax-seals, and labels fully attached.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">2. Non-Returnable Items</h2>
          <p>
            Due to strict sanitary guidelines, the following product categories cannot be returned under any conditions:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Earrings and nose pin accessories.</li>
            <li>Bespoke jewelry tailored to customized client sizes.</li>
            <li>Promotional items purchased during major clearance sales.</li>
          </ul>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">3. Refund Processing</h2>
          <p>
            Once your returned item is received at our Jaipur offices and undergoes an inspection, we will email you a notification of receipt. If approved, your refund value will be processed, and immediately credited back to your original source of payment (Razorpay, credit/debit card, UPI) within 5-7 business days.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
