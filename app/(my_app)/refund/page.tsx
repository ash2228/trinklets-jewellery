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

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">1. 3-Day Hassle-Free Returns</h2>
          <p>
            We offer our boutique customers a <strong>3-day return guarantee</strong> from the exact date their package was shipped. If 3 days have passed since delivery, we unfortunately cannot offer you a cash refund or a item replacement.
          </p>
          <p>
            To qualify for a returned item, the jewelry must be absolutely unused, unworn, unscratched, and in the exact gorgeous state in which it was received, complete with its velvet box, handwritten gift cards, wax-seals, and labels fully attached.
          </p>


          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">2. Refund Processing</h2>
          <p>
            Once your returned item is received and undergoes inspection, we will email you a notification of receipt. If approved, your refund value will be credited back to your original payment method within 5-7 business days.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">3. How to Initiate a Return</h2>
          <p>
            To start a return:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Contact us at palakhans19@gmail.com within 4 days of receiving your order.</li>
            <li>Provide your order number and reason for return.</li>
            <li>Receive return shipping instructions.</li>
            <li>Ship the item back in its original packaging.</li>
          </ol>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">4. Contact Us</h2>
          <p>
            For any questions about returns or refunds:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Email:</strong> palakhans19@gmail.com</li>
            {/* <li><strong>Phone:</strong> 9891361503</li> */}
            <li><strong>Address:</strong> Subash Nagar 19/7</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
