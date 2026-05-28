'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal tracking-wide mb-2">Terms of Service</h1>
        <p className="text-xs text-neutral-400 font-mono mb-8">Last Updated: May 20, 2026</p>

        <div className="prose prose-neutral max-w-none text-neutral-600 space-y-6 text-sm font-light leading-relaxed">
          <p>
            This website is owned and operated by Trinklets Jewellery (trinkletsjewellery.in). Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer directly to Trinklets. By visiting our site or completing a purchase from us, you engage in our &ldquo;Service&rdquo; and agree to comply with the stipulations herein.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">1. Online Store Terms</h2>
          <p>
            By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, and you grant authorization to allow any of your minor dependents to navigate website pages.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">2. Accuracy and Pricing</h2>
          <p>
            Product descriptions, imagery, and pricing structures are subjected to change without prior notification. We make a concerted effort to display accurate dimensions and colors for all fine jewelry on our storefront, but browser screens can affect correct values.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">3. Payment & Orders</h2>
          <p>
            We reserve the right to decline or limit any order placed through our store. If we make a change to or cancel an order, we will attempt to email you using the contact credentials provided. You agree to provide current, complete, and accurate checkout credentials.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">4. Intellectual Property</h2>
          <p>
            All custom designs, typography layouts, illustrations, photos, logos, brand titles, and concepts represented on Trinklets are protected under domestic and international intellectual property copyright acts. Any unapproved distribution or copying is strictly prohibited.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">5. Limitation of Liability</h2>
          <p>
            Trinklets Jewellery will not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the site or services.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">6. Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service:
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
