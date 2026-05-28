'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';
import { Mail, Phone, MapPin, Clock, Send, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; msg?: string }>({});
  const { addToast } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ success: false, msg: 'Please fill in all form inputs.' });
      return;
    }

    setLoading(true);
    setStatus({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ success: true, msg: data.message || 'Message submitted successfully!' });
        setName('');
        setEmail('');
        setMessage('');
        addToast(data.message || 'Thank you for contacting us!', 'success');
      } else {
        setStatus({ success: false, msg: data.error || 'Check fields and try again.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false, msg: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="pt-28 pb-20 select-none">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold">Connect With Us</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extralight tracking-widest text-neutral-900 leading-tight">
            We Would Love To Hear From You
          </h1>
          <div className="h-0.5 w-16 bg-gold-300 mx-auto" />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8 bg-neutral-100 p-8 sm:p-12 border border-neutral-200/60 rounded-sm">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-neutral-900 tracking-wide font-normal">Contact Information</h3>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">
                Whether you have a query about a customized ring size, shipping delivery timelines, bulk gifting requests, or styling consultation - our concierge is here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-gold-600 rounded-sm shadow-xs border border-neutral-200/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-400">Email Concierge</h4>
                  <p className="text-sm font-medium text-neutral-800 mt-1">palakhans19@gmail.com</p>
                </div>
              </div>
{/* 
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-gold-600 rounded-sm shadow-xs border border-neutral-200/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-400">Phone Support</h4>
                  <p className="text-sm font-medium text-neutral-800 mt-1">+91 9891361503</p>
                </div>
              </div> */}

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-gold-600 rounded-sm shadow-xs border border-neutral-200/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-400">Corporate Atelier</h4>
                  <p className="text-sm font-medium text-neutral-800 mt-1">
                    Trinklets Atelier, New Delhi, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-gold-600 rounded-sm shadow-xs border border-neutral-200/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-neutral-400">Hours of Operation</h4>
                  <p className="text-sm font-medium text-neutral-800 mt-1">Mon-Sat: 10:00 AM - 7:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-neutral-200/60 rounded-sm space-y-6">
            <h3 className="font-serif text-2xl text-neutral-900 tracking-wide font-normal">Send A Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold" htmlFor="contact-name">First & Last Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyanjali Sharma"
                    className="w-full border border-neutral-200 focus:border-gold-400 focus:outline-none p-3 text-sm rounded-sm bg-neutral-50 focus:bg-white transition-all matches-focus shadow-2xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold" htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sharma.p@gmail.com"
                    className="w-full border border-neutral-200 focus:border-gold-400 focus:outline-none p-3 text-sm rounded-sm bg-neutral-50 focus:bg-white transition-all matches-focus shadow-2xs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold" htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  rows={5}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today? Be as detailed as possible."
                  className="w-full border border-neutral-200 focus:border-gold-400 focus:outline-none p-3 text-sm rounded-sm bg-neutral-50 focus:bg-white transition-all matches-focus shadow-2xs resize-none"
                  required
                />
              </div>

              {status.msg && (
                <div className={`p-4 text-xs font-medium rounded-sm border ${
                  status.success ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {status.success ? '' : <AlertCircle className="h-4 w-4 inline mr-1" />}
                  {status.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-center bg-neutral-900 border border-transparent hover:bg-neutral-800 text-gold-100 uppercase tracking-widest text-xs font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:cursor-not-allowed"
              >
                {loading ? 'Sending Message...' : 'Send Message'} <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
