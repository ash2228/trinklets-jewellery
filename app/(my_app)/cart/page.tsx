'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Award, Heart, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  // Fine premium jewelry shipping calculations
  const shippingThreshold = 2000;
  const shippingFee = cartTotal > shippingThreshold || cartTotal === 0 ? 0 : 150;
  const jewelleryGst = Math.round(cartTotal * 0.03); // Standard Indian Jewelry GST is 3%
  const finalTotal = cartTotal + shippingFee + jewelleryGst;

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="pt-28 pb-20 select-none min-h-[80vh] bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center py-12 max-w-sm mx-auto space-y-2 border-b border-gold-500/15 mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-bold">Your Selection</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-brand-dark font-light tracking-widest">Shopping Cart</h1>
            <div className="h-0.5 w-12 bg-gold-300 mx-auto mt-2" />
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-6 max-w-md mx-auto bg-brand-secondary p-8 border border-gold-500/10 rounded-sm">
              <div className="p-5 bg-white rounded-full inline-block border border-gold-500/20">
                <ShoppingBag className="h-10 w-10 text-gold-500" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-light tracking-wide text-brand-dark">Your bag is empty</h2>
                <p className="text-neutral-500 text-sm font-light leading-relaxed">
                  Browse our exquisite rings, classic drop pearl earrings, and layered minimalism chains to find your next favorite statement accessory.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  
                  href="/shop"
                  className="inline-flex bg-brand-dark border border-transparent hover:bg-gold-500 hover:text-white text-gold-100 uppercase tracking-widest text-xs font-bold px-8 py-4 rounded-sm transition-all shadow-md cursor-pointer"
                >
                  Explore Showcase
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Product list side */}
              <div className="lg:col-span-8 space-y-6">
                <h3 className="font-serif text-xl tracking-wide text-brand-dark font-normal border-b border-gold-500/15 pb-4">
                  Selected Pieces ({cartCount})
                </h3>

                <div className="divide-y divide-gold-500/10">
                  {cart.map((item) => (
                    <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between first:pt-0">

                      <div className="flex gap-4 sm:gap-6 items-center flex-1">
                        {/* Thumbnail */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-sm bg-brand-secondary shrink-0 border border-gold-500/10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title details */}
                        <div className="space-y-1 sm:space-y-2">
                          <h4 className="font-serif text-base sm:text-lg text-brand-dark font-medium tracking-wide">
                            {item.name}
                          </h4>
                          <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">{item.category}</p>
                          <div className="text-xs text-neutral-500 font-mono">
                            Unit Price: ₹{item.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Trash */}
                      <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">

                        <div className="flex items-center border border-gold-500/20 bg-brand-secondary rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 text-neutral-500 hover:text-brand-dark transition-colors cursor-pointer text-sm"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-brand-dark">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 text-neutral-500 hover:text-brand-dark transition-colors cursor-pointer text-sm"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right flex items-center gap-6">
                          <div className="w-24">
                            <span className="text-sm font-semibold text-brand-dark">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            {item.originalPrice > item.price && (
                              <p className="text-xs text-neutral-400 line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>

                {/* Extra values callout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-secondary p-6 rounded-sm border border-gold-500/10 mt-8">
                  <div className="flex gap-3 items-start">
                    <ShieldCheck className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase font-bold text-brand-dark tracking-wider">Premium Velvet Box Packaging</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                        Complementary custom satin-lined leatherette boxes and wax-sealed note templates.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Award className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase font-bold text-brand-dark tracking-wider">LIFETIME PLATING GUARANTEE</h4>
                      <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                        Every purchase is backed by a 1-year color-retention guarantee and certificates.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Order summary side */}
              <div className="lg:col-span-4 bg-brand-secondary border border-gold-500/15 p-6 sm:p-8 rounded-sm space-y-6 shadow-xs">
                <h3 className="font-serif text-xl tracking-wide text-brand-dark font-normal border-b border-gold-500/10 pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3.5 text-sm font-light text-neutral-600">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-medium text-brand-dark">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/20 p-1.5 rounded-sm">
                    <span>GST (3% Jewelry Tax)</span>
                    <span className="font-medium text-brand-dark">₹{jewelleryGst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Premium Insured Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 text-xs uppercase font-bold bg-emerald-50 px-2 py-0.5">Complementary</span>
                    ) : (
                      <span className="font-medium text-brand-dark">₹{shippingFee}</span>
                    )}
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-[11px] text-amber-800 bg-white/60 rounded-sm p-2 flex items-center gap-1 font-sans">
                      <Heart className="h-3 w-3 shrink-0 text-gold-500 animate-pulse" /> Add ₹{(shippingThreshold - cartTotal).toLocaleString('en-IN')} more for free routing.
                    </p>
                  )}

                  <div className="h-px bg-gold-500/15 my-4" />

                  <div className="flex justify-between text-brand-dark items-end">
                    <span className="font-medium text-base">Grand Total</span>
                    <span className="font-serif text-2xl font-bold tracking-tight text-neutral-950">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                  
                    href="/checkout"
                    className="w-full text-center bg-brand-dark hover:bg-gold-500 hover:text-white text-gold-100 uppercase tracking-widest text-xs font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md font-sans"
                  >
                    Proceed to checkout <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                  
                    href="/shop"
                    className="w-full text-center block bg-white border border-gold-500/15 hover:bg-brand-cream text-neutral-600 hover:text-brand-dark uppercase tracking-widest text-xs font-bold py-3 rounded-sm transition-all font-sans"
                  >
                    Add More Items
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
