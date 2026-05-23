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
            <li><strong>Email Address:</strong> Collected when you subscribe to our newsletter or place an order.</li>
            <li><strong>Transactional Information:</strong> First and Last name, billing/shipping address, email, phone number, and items purchased.</li>
            <li><strong>Payment Information:</strong> Razorpay handles all payment processing. Card details are never stored on our servers.</li>
            <li><strong>Device Information:</strong> Browser type, IP address, and pages visited to improve user experience.</li>
          </ul>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">2. How We Use Your Information</h2>
          <p>
            We use your personal information to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and fulfill your orders.</li>
            <li>Send order confirmations and shipping updates.</li>
            <li>Send newsletter updates (only if you've opted in).</li>
            <li>Respond to customer inquiries and support requests.</li>
            <li>Improve our website and customer experience.</li>
          </ul>
          
          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">3. Sharing Personal Information</h2>
          <p>
            We share your information only with trusted service providers:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Razorpay Technologies:</strong> For secure payment processing.</li>
            <li><strong>Courier Services:</strong> For order delivery and tracking.</li>
            <li><strong>Database Hosting:</strong> For secure storage of order and customer information.</li>
          </ul>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">4. Cookies</h2>
          <p>
            Our e-commerce store utilizes standard browser cookies to retain the contents of your shopping cart as you navigate across pages, and to analyze generic web traffic data. You are free to deactivate cookies in your computer browser, though doing so might disrupt your checkout workflow.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">5. Customer Rights</h2>
          <p>
            You have the right to request access to the information we store about you, to edit incorrect records, or ask us to delete records from our systems, except where required for standard commercial bookkeeping.
          </p>
          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">6. Contact Us</h2>
          <p>
            If you have questions about our Privacy Policy or your personal data, please contact us:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Email:</strong> palakhans19@gmail.com</li>
            <li><strong>Phone:</strong> 9891361503</li>
            <li><strong>Address:</strong> Subash Nagar 19/7</li>
          </ul>        </div>
      </main>
      <Footer />
    </>
  );
}
