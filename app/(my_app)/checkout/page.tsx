'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, ShoppingBag, CreditCard, ShieldCheck, Mail, ArrowRight, ShieldAlert, CheckCircle, Smartphone, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, addToast } = useCart();
  
  // Shipping details form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  // App system states
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [lastOrder, setLastOrder] = useState<any>(null);

  // Razorpay simulation modal trigger
  const [showMockModal, setShowMockModal] = useState(false);
  const [mockPaymentData, setMockPaymentData] = useState<any>(null);

  // Load Razorpay official web script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Cart summary calculations
  const shippingThreshold = 699;
  const shippingFee = cartTotal > shippingThreshold || cartTotal === 0 ? 0 : 65;
  const jewelleryGst = Math.round(cartTotal * 0.03);
  const totalAmount = cartTotal + shippingFee;

  if (cart.length === 0 && checkoutStep === 'form') {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center space-y-6 px-4 select-none">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-extralight tracking-widest text-neutral-900 animate-pulse">Checkout is empty</h1>
            <p className="text-sm font-light text-neutral-500 max-w-sm">You do not have any items in your shopping cart to complete. Explore our jewelry models to add custom pieces.</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex bg-neutral-900 border border-transparent hover:bg-neutral-800 text-gold-100 uppercase tracking-widest text-xs font-bold px-8 py-3.5 rounded-sm transition-colors cursor-pointer"
          >
            Visit Shop
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !street || !city || !state || !postalCode) {
      addToast('Please complete all form shipping fields.', 'error');
      return;
    }

    setIsProcessing(true);

    const shippingAddress = { street, city, state, postalCode };
    const orderPayload = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress,
      items: cart,
    };

    try {
      const response = await fetch('/api/checkout/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate check order from endpoint');
      }

      const data = await response.json();
      console.log('Order initialization details:', data);

      if (data.isMock) {
        // Fall back to Mock pop up Simulator panel
        setMockPaymentData(data);
        setShowMockModal(true);
      } else {
        // Open Actual Official Razorpay Widget
        const options = {
          key: data.keyId,
          amount: Math.round(data.amount * 100),
          currency: 'INR',
          name: 'Trinklets Jewellery',
          description: 'Premium Handmade Luxury Handbags & Rings',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=150',
          order_id: data.razorpayOrderId,
          handler: async function (response: any) {
            await verifyPayment({
              razorpayOrderId: data.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              isMock: false,
            }, data.order);
          },
          prefill: {
            name: name,
            email: email,
            contact: phone,
          },
          notes: {
            address: `${street}, ${city}, ${state} - ${postalCode}`,
          },
          theme: {
            color: '#B87D2B', // elegant brand gold color accent
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          addToast('Payment transaction declined by gateway.', 'error');
          console.error('Payment declined options:', response.error);
        });
        rzp.open();
      }

    } catch (err: any) {
      console.error(err);
      addToast('An error occurred. Please seek check connections.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Triggers Payment Signature Verification via API
  const verifyPayment = async (verifyPayload: any, originalOrderData: any) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verifyPayload),
      });

      const verifyResponse = await response.json();
      if (response.ok && verifyResponse.success) {
        addToast('Payment received! Preparing standard elegant packaging!', 'success');
        setLastOrder({
          ...originalOrderData,
          razorpayPaymentId: verifyPayload.razorpayPaymentId,
          razorpayOrderId: verifyPayload.razorpayOrderId,
        });
        clearCart();
        setCheckoutStep('success');
      } else {
        addToast(verifyResponse.error || 'Payment validation failed.', 'error');
      }
    } catch (err) {
      console.error('Verification query failed:', err);
      addToast('Order verification failed. Please check with customer team.', 'error');
    } finally {
      setIsProcessing(false);
      setShowMockModal(false);
    }
  };

  // Simulates instant checkout actions for sandbox previews
  const handleSimulatePaymentCompletion = async () => {
    if (!mockPaymentData) return;
    setIsProcessing(true);

    const simulatedPaymentId = `pay_sim_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
    const simulatedSignature = `sig_sim_${Math.random().toString(36).substring(2, 16)}_${Date.now()}`;

    // Proceed to call our actual verify end-route
    await verifyPayment({
      razorpayOrderId: mockPaymentData.razorpayOrderId,
      razorpayPaymentId: simulatedPaymentId,
      razorpaySignature: simulatedSignature,
      isMock: true,
    }, mockPaymentData.order);
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 select-none bg-brand-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {checkoutStep === 'form' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
              
              {/* Shipping forms side */}
              <div className="lg:col-span-7 bg-white border border-gold-500/15 p-8 sm:p-10 rounded-sm space-y-8 shadow-xs">
                <div className="space-y-1">
                  <h1 className="font-serif text-3xl font-light text-brand-dark tracking-wide font-sans">Shipping & Contact Details</h1>
                  <p className="text-xs text-neutral-400 font-light font-sans tracking-wider uppercase">Secure 256-bit SSL encrypted connection</p>
                </div>

                <form onSubmit={handleCreateOrder} className="space-y-6">
                  
                  {/* Part A: Contact */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg text-brand-dark font-normal tracking-wide flex items-center gap-2 border-b border-gold-500/15 pb-2">
                      <span className="h-5 w-5 rounded-full bg-gold-50 border border-gold-500 text-gold-600 text-xs font-bold font-mono flex items-center justify-center">1</span>
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold" htmlFor="checkout-name">Your Full Name</label>
                        <input
                          id="checkout-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Priyanjali Sharma"
                          className="w-full border border-gold-500/15 focus:border-gold-500 focus:outline-none p-3 text-sm rounded-sm bg-brand-secondary focus:bg-white transition-all matches-focus shadow-2xs font-sans text-brand-dark"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold" htmlFor="checkout-email">Email Address</label>
                        <input
                          id="checkout-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. sharma.p@gmail.com"
                          className="w-full border border-gold-500/15 focus:border-gold-500 focus:outline-none p-3 text-sm rounded-sm bg-brand-secondary focus:bg-white transition-all matches-focus shadow-2xs font-sans text-brand-dark"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold" htmlFor="checkout-phone">Mobile Phone (For courier alerts)</label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full border border-gold-500/15 focus:border-gold-500 focus:outline-none p-3 text-sm rounded-sm bg-brand-secondary focus:bg-white transition-all matches-focus shadow-2xs font-sans text-brand-dark"
                        required
                      />
                    </div>
                  </div>

                  {/* Part B: Address */}
                  <div className="space-y-4 pt-4">
                    <h3 className="font-serif text-lg text-brand-dark font-normal tracking-wide flex items-center gap-2 border-b border-gold-500/15 pb-2">
                      <span className="h-5 w-5 rounded-full bg-gold-50 border border-gold-500 text-gold-600 text-xs font-bold font-mono flex items-center justify-center">2</span>
                      Delivery Destination Address
                    </h3>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold" htmlFor="checkout-street">Street Address & Apartment</label>
                      <input
                        id="checkout-street"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="e.g. Flat 304, Sapphire Meadows, MI Road"
                        className="w-full border border-gold-500/15 focus:border-gold-500 focus:outline-none p-3 text-sm rounded-sm bg-brand-secondary focus:bg-white transition-all matches-focus shadow-2xs font-sans text-brand-dark"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold" htmlFor="checkout-city">City</label>
                        <input
                          id="checkout-city"
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Jaipur"
                          className="w-full border border-gold-500/15 focus:border-gold-500 focus:outline-none p-3 text-sm rounded-sm bg-brand-secondary focus:bg-white transition-all matches-focus shadow-2xs font-sans text-brand-dark"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold" htmlFor="checkout-state">State / Region</label>
                        <input
                          id="checkout-state"
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="e.g. Rajasthan"
                          className="w-full border border-gold-500/15 focus:border-gold-500 focus:outline-none p-3 text-sm rounded-sm bg-brand-secondary focus:bg-white transition-all matches-focus shadow-2xs font-sans text-brand-dark"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold" htmlFor="checkout-zip">Pin Code</label>
                        <input
                          id="checkout-zip"
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="e.g. 302001"
                          className="w-full border border-gold-500/15 focus:border-gold-500 focus:outline-none p-3 text-sm rounded-sm bg-brand-secondary focus:bg-white transition-all matches-focus shadow-2xs font-sans text-brand-dark"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full text-center bg-brand-dark hover:bg-gold-500 hover:text-white text-gold-100 uppercase tracking-widest text-xs font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-wait font-sans"
                  >
                    {isProcessing ? 'Handshaking Gateway API...' : `Pay Now • ₹${totalAmount.toLocaleString('en-IN')}`} <CreditCard className="h-4 w-4" />
                  </button>

                </form>
              </div>

              {/* Items Summary Side panel */}
              <div className="lg:col-span-5 bg-brand-secondary border border-gold-500/15 p-6 sm:p-8 rounded-sm space-y-6">
                <h3 className="font-serif text-xl tracking-wide text-brand-dark font-normal border-b border-gold-500/10 pb-3">
                  Selected Trinklets
                </h3>

                <div className="divide-y divide-gold-500/10 max-h-96 overflow-y-auto custom-scrollbar pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 items-center justify-between first:pt-0">
                      <div className="flex gap-3 items-center">
                        <div className="relative w-16 h-16 bg-white border border-gold-500/10 rounded-sm overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-medium text-brand-dark line-clamp-1">{item.name}</h4>
                          <p className="text-[11px] text-neutral-400 font-mono mt-0.5">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-brand-dark shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mathematical breakup */}
                <div className="bg-white/50 p-4 border border-gold-500/10 space-y-2.5 text-xs text-neutral-600 rounded-sm">
                  <div className="flex justify-between">
                    <span>Selected items Subtotal</span>
                    <span className="font-medium text-brand-dark">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span>GST (3% Jewelry Tax)</span>
                    <span className="font-medium text-brand-dark">₹{jewelleryGst.toLocaleString('en-IN')}</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span>Insured Courier delivery</span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">Complementary</span>
                    ) : (
                      <span className="font-medium text-brand-dark">₹{shippingFee}</span>
                    )}
                  </div>
                  
                  <div className="h-px bg-gold-500/10 my-2" />

                  <div className="flex justify-between text-brand-dark text-sm font-medium">
                    <span>Total Payable amount</span>
                    <span className="font-serif text-lg font-bold text-neutral-950">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-white/60 border border-gold-500/15 text-neutral-700 text-xs rounded-sm font-sans">
                  <Truck className="h-4 w-4 shrink-0 text-gold-500" />
                  <span>Free Delivery on orders above ₹699</span>
                </div>
              </div>

            </div>
          ) : (
            
            // Part C: Elegant Success Screen
            <div className="max-w-2xl mx-auto py-16 text-center select-none space-y-8 bg-brand-secondary border border-gold-500/15 p-8 sm:p-12 rounded-sm mt-8 shadow-md">
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full inline-block border border-emerald-200/50">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-gold-500 font-bold">Transaction Completed</span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal tracking-wide">Thank You For Your Order</h1>
                  <div className="h-0.5 w-12 bg-gold-300 mx-auto mt-2" />
                </div>
              </div>

              {lastOrder && (
                <div className="bg-neutral-50 border border-neutral-100 p-6 sm:p-8 rounded-sm space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-neutral-200 pb-4 text-xs tracking-wide">
                    <div className="space-y-1">
                      <p className="text-neutral-400 uppercase font-semibold">Order Transaction ID</p>
                      <p className="font-mono text-neutral-800 font-bold">{lastOrder.razorpayOrderId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-neutral-400 uppercase font-semibold">Payment ID</p>
                      <p className="font-mono text-neutral-800 font-bold">{lastOrder.razorpayPaymentId}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="text-neutral-400 uppercase tracking-widest font-bold">Shipping Destination</p>
                    <p className="font-medium text-neutral-800">{lastOrder.customerName}</p>
                    <p className="text-neutral-500 select-all leading-relaxed">
                      {lastOrder.shippingAddress.street}, {lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.state} - {lastOrder.shippingAddress.postalCode}
                    </p>
                  </div>

                  <div className="h-0.5 bg-dashed bg-neutral-200" />

                  <div className="space-y-2 text-xs">
                    <p className="text-neutral-400 uppercase tracking-widest font-bold">Summary & Receipt</p>
                    {lastOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-neutral-600">{item.name} × {item.quantity}</span>
                        <span className="font-semibold text-neutral-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-neutral-100 font-medium text-neutral-900 text-sm">
                      <span>Grand Total Insured Paid</span>
                      <span className="font-serif text-base font-bold">₹{lastOrder.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm font-light text-neutral-500 leading-relaxed max-w-md mx-auto">
                A formal digital invoice with tracking certifications has been submitted to your registered inbox: <strong className="text-neutral-800">{lastOrder?.customerEmail}</strong>. Feel free to contact our concierge if you require any sizing customization shifts!
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-gold-100 uppercase tracking-widest text-xs font-bold px-8 py-3.5 rounded-sm transition-colors cursor-pointer"
                >
                  Continue Shopping <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-neutral-300 hover:bg-neutral-50 text-neutral-700 uppercase tracking-widest text-xs font-bold px-8 py-3.5 rounded-sm transition-colors"
                >
                  Concierge Support
                </Link>
              </div>
            </div>

          )}

        </div>
      </main>

      {/* RETAIL INTELLIGENCE MOCK PAY OVERLAY PANEL */}
      {showMockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="bg-neutral-900 text-neutral-100 rounded-lg shadow-2xl overflow-hidden max-w-sm w-full border border-neutral-800 flex flex-col justify-between">
            <div className="p-6 bg-gradient-to-br from-indigo-950 to-neutral-900 border-b border-indigo-900/30 text-center space-y-4">
              <div className="p-3 bg-indigo-50/10 rounded-full inline-block border border-indigo-500/20">
                <CreditCard className="h-6 w-6 text-indigo-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">Secure checkout integration</span>
                <h4 className="font-serif text-xl tracking-wide text-white">Razorpay Test Gateway</h4>
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs text-neutral-400 leading-relaxed font-sans">
              <p className="bg-neutral-950/50 p-3 border border-neutral-800 text-[11px] font-mono select-all">
                Order ID: <span className="text-neutral-200">{mockPaymentData?.razorpayOrderId}</span>
              </p>
              
              <div className="space-y-2 border-b border-neutral-800 pb-4">
                <div className="flex justify-between">
                  <span>Merchant</span>
                  <span className="text-white font-medium">Trinklets Jewellery</span>
                </div>
                <div className="flex justify-between">
                  <span>Boutique Buyer</span>
                  <span className="text-white font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Mobile</span>
                  <span className="text-white font-medium">{phone}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-indigo-300 font-semibold">Total Payable</span>
                  <span className="text-white font-bold font-serif text-base">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-indigo-950/20 p-3 rounded-sm border border-indigo-900/30 text-indigo-300">
                <Smartphone className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Simulated sandboxed transaction mode triggers dynamically because actual server credentials are unconfigured.</span>
              </div>
            </div>

            <div className="p-6 bg-neutral-950/40 border-t border-neutral-800 flex flex-col gap-2">
              <button
                onClick={handleSimulatePaymentCompletion}
                className="w-full text-center bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg transition-all text-white text-xs font-bold py-3 px-4 rounded-sm tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Complete Payment Successfully <CheckCircle className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => {
                  setShowMockModal(false);
                  addToast('Payment cancelled by user.', 'info');
                }}
                className="w-full text-center border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all text-[11px] py-2 px-4 rounded-sm font-semibold tracking-wider uppercase cursor-pointer"
              >
                Cancel Transactions
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
