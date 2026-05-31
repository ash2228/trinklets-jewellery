'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { AnimatePresence, motion } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-50 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold-600" />
                <h3 className="font-serif text-2xl font-medium tracking-wide">Your Cart ({cartCount})</h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 cursor-pointer hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-500" />
              </button>
            </div>

            {/* List of items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-amber-50 rounded-full">
                    <ShoppingBag className="h-10 w-10 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-medium">Your cart is empty</h4>
                    <p className="text-neutral-500 text-sm mt-1 max-w-xs">Explore our elegant handcrafted collections to add your first premium piece.</p>
                  </div>
                  <Link
                  prefetch
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-2 inline-flex items-center justify-center bg-neutral-900 text-gold-100 hover:bg-neutral-800 transition-colors uppercase px-6 py-2.5 text-xs font-semibold tracking-widest border border-transparent rounded-sm"
                  >
                    Explore Shop
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-2 bg-white border border-neutral-100 rounded-sm">
                    {/* Item Image */}
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-neutral-100 rounded-sm">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-medium text-sm text-neutral-900 leading-tight line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">{item.category}</p>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        {/* Quantity picker */}
                        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-neutral-500 hover:text-neutral-800 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-medium text-neutral-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-neutral-500 hover:text-neutral-800 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm font-semibold text-neutral-900">₹{item.price.toLocaleString('en-IN')}</span>
                          {item.quantity > 1 && (
                            <p className="text-xs text-neutral-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-200 bg-white space-y-4">
                <div className="flex justify-between text-neutral-900">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-serif text-2xl font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                
                <p className="text-[11px] text-neutral-400 text-center">
                  Shipping, taxes, and custom luxury card wrapping are calculated at checkout.
                </p>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <Link
                  prefetch
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-gold-100 transition-colors uppercase py-3.5 text-xs font-bold tracking-widest border border-transparent rounded-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    Proceed to Checkout
                  </Link>

                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full text-center border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition-colors uppercase py-2.5 text-xs font-bold tracking-widest rounded-sm cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
