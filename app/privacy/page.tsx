'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal tracking-wide mb-2">Privacy Policy</h1>
        <p className="text-xs text-neutral-400 font-mono mb-8">Last Updated: May 20, 2026</p>
        
        <div className="prose prose-neutral max-w-none text-neutral-600 space-y-6 text-sm font-light leading-relaxed">
          <p>
            Welcome to Trinklets Jewellery accessible via <strong>trinkletsjewellery.in</strong>. We value your privacy and are committed to protecting your personal data. This privacy statement explains how we gather, utilize, store, and share your personal information.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">1. Information We Collect</h2>
          <p>
            When you visit the site, we collect certain details regarding your device, your interaction with the space, and information necessary to process your checkout or subscribe to the newsletter:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Personal Device Details:</strong> Browser version, IP address, cookie identifier data, time zones, or individual search keywords.</li>
            <li><strong>Transactional Information:</strong> First and Last name, billing/shipping address, electronic email, phone number, and items purchased.</li>
            <li><strong>Payment Logs:</strong> Razorpay handles payment tokens and transaction receipts. Real billing card credentials are never processed or retained directly on our systems.</li>
          </ul>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">2. Sharing Personal Information</h2>
          <p>
            We share your Personal Information with reliable third-party services that help us provide a seamless delivery experience:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Our backend framework database hosted globally (MongoDB cluster).</li>
            <li>Razorpay Technologies for real-time security processing and signature verifying of checkout balances.</li>
            <li>Courier shipping companies for completing physical package deliveries safely to your home.</li>
          </ul>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">3. Cookies</h2>
          <p>
            Our e-commerce store utilizes standard browser cookies to retain the contents of your shopping cart as you navigate across pages, and to analyze generic web traffic data. You are free to deactivate cookies in your computer browser, though doing so might disrupt your checkout workflow.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">4. Customer Rights</h2>
          <p>
            You have the right to request access to the information we store about you, to edit incorrect records, or ask us to delete records from our systems, except where required for standard commercial bookkeeping.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
