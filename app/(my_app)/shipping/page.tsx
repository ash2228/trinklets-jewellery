'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ShippingPolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal tracking-wide mb-2">Shipping Policy</h1>
        <p className="text-xs text-neutral-400 font-mono mb-8">Last Updated: May 23, 2026</p>

        <div className="prose prose-neutral max-w-none text-neutral-600 space-y-6 text-sm font-light leading-relaxed">
          <p>
            At Trinklets Jewellery, we ensure that your precious jewelry arrives safely and securely. Our shipping policy outlines the procedures and timelines for delivering your orders.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">1. Shipping Methods</h2>
          <p>
            We offer reliable courier services for all orders. Your package is carefully wrapped and packaged to ensure it arrives in perfect condition. Tracking information will be provided via email.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">2. Delivery Timeline</h2>
          <p>
            Standard shipping typically takes 5-7 business days from the date of order placement. Delivery times may vary depending on your location and local courier service schedules.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Orders are processed and dispatched within 1-2 business days.</li>
            <li>Delivery timelines begin from the dispatch date.</li>\n            <li>We are not responsible for delays caused by courier services or natural disasters.</li>
          </ul>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4\">3. Shipping Address</h2>
          <p>
            Please ensure that your shipping address is accurate and complete at checkout. We cannot be held responsible for packages lost or returned due to incorrect address information provided by the customer.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4\">4. Tracking Your Order</h2>
          <p>
            Once your order is dispatched, you will receive a tracking number via email. You can use this number to track your package with the courier service. We recommend keeping this information safe for reference.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4\">5. Damaged or Lost Shipments</h2>
          <p>
            If your package arrives damaged or is lost in transit:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Document the damage with photos immediately upon receipt.</li>
            <li>Contact us at palakhans19@gmail.com with your order number and photos.</li>
            <li>We will work with the courier service to file a claim and resolve the issue.</li>
            <li>You may receive a replacement or refund, subject to our investigation.</li>
          </ol>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">6. Shipping to International Addresses</h2>
          <p>
            Currently, we only ship within India. International shipping may be available in the future. Please contact us for inquiries about international orders.
          </p>

          <h2 className="font-serif text-xl text-neutral-900 font-medium pt-4">7. Contact Us</h2>
          <p>
            For shipping inquiries or concerns:
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
