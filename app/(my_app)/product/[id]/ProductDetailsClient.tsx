'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ShoppingBag, ArrowLeft, Shield, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductDetailsClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setCartOpen } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCartOpen(true);
    router.push('/cart');
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="pt-32 pb-24 select-none bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-neutral-500 hover:text-brand-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Shop
            </Link>
          </div>

          {/* Product grid details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            
            {/* Visual Column */}
            <div className="space-y-4">
              
              {/* Primary Image View */}
              <div className="relative aspect-square w-full overflow-hidden bg-brand-secondary rounded-sm border border-gold-500/10">
                <Image
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-all"
                  referrerPolicy="no-referrer"
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-gold-400 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">
                    {discount}% Off
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 h-20 overflow-hidden bg-neutral-100 rounded-sm border ${
                        activeImageIdx === idx ? 'border-gold-500 ring-2 ring-gold-100' : 'border-neutral-200'
                      } cursor-pointer hover:border-gold-300 transition-all`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} aspect ${idx + 1}`}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Context/Cart Column */}
            <div className="flex flex-col justify-between py-2 space-y-8">
              
              {/* Product Info Heading */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">{product.category}</span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-neutral-950 font-normal leading-tight tracking-wide">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-neutral-950">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-neutral-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                      </span>
                    </>
                  )}
                </div>

                <div className="h-px bg-gold-500/15 my-4" />

                <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Interactive Purchase Panel */}
              <div className="space-y-6">
                
                {product.inStock ? (
                  <div className="space-y-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Quantity</span>
                      <div className="flex items-center border border-gold-500/15 bg-brand-secondary rounded-sm font-sans">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 text-neutral-500 hover:text-brand-dark transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-4 text-sm font-semibold text-brand-dark">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 text-neutral-500 hover:text-brand-dark transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <button
                        onClick={() => addToCart(product, quantity)}
                        className="w-full text-center bg-white hover:bg-brand-secondary text-brand-dark border border-brand-dark uppercase tracking-widest text-xs font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs font-sans"
                      >
                        <ShoppingCart className="h-4 w-4" /> Add To Cart
                      </button>

                      <button
                        onClick={handleBuyNow}
                        className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-gold-100 uppercase tracking-widest text-xs font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="h-4 w-4" /> Buy Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-100 p-4 rounded-sm text-center">
                    <span className="text-xs uppercase tracking-widest text-rose-800 font-bold">Temporarily Sold Out</span>
                    <p className="text-rose-600 text-xs mt-1">We are busy handcrafting this elegant piece. Enter your email in the journal updates below to get notified of the restock.</p>
                  </div>
                )}

              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gold-500/15 pt-6">
                <div className="flex items-center gap-2.5 text-xs text-neutral-500 font-sans">
                  <Shield className="h-4 w-4 text-gold-500 shrink-0" />
                  <span>100% Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-500 font-sans">
                  <Sparkles className="h-4 w-4 text-gold-500 shrink-0" />
                  <span>Certified 18k Plated</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-500 font-sans">
                  <RefreshCw className="h-4 w-4 text-gold-500 shrink-0" />
                  <span>7-Day Return Scheme</span>
                </div>
              </div>

            </div>

          </div>

          {/* Related Products Grid */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="border-t border-gold-500/15 pt-16 space-y-10">
              <div className="text-left space-y-2">
                <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">Handcrafted Sister Pieces</span>
                <h2 className="font-serif text-2xl sm:text-3xl tracking-wide text-brand-dark font-normal">Related Creations</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedP) => {
                  const relatedDiscount = Math.round(
                    ((relatedP.originalPrice - relatedP.price) / relatedP.originalPrice) * 100
                  );
                  return (
                    <div
                      key={relatedP.id}
                      className="group bg-white border border-gold-500/10 p-4 rounded-sm hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 relative flex flex-col justify-between"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-sm mb-4">
                          <Image
                            src={relatedP.images[0]}
                            alt={relatedP.name}
                            fill
                            loading="lazy"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {relatedDiscount > 0 && (
                            <span className="absolute top-2 left-2 bg-gold-400 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm shadow-xs">
                              {relatedDiscount}% Off
                            </span>
                          )}
                          <Link
                            href={`/product/${relatedP.id}`}
                            className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                          >
                            <span className="bg-white/90 text-neutral-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest flex items-center gap-1 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors">
                              <Eye className="h-3 w-3" /> View Detail
                            </span>
                          </Link>
                        </div>

                        {/* Title and stats */}
                        <div className="text-center space-y-1">
                          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">{relatedP.category}</p>
                          <h3 className="font-serif text-sm tracking-wide text-neutral-900 leading-tight line-clamp-1">
                            <Link href={`/product/${relatedP.id}`} className="hover:text-gold-500 transition-colors">
                              {relatedP.name}
                            </Link>
                          </h3>
                          <div className="flex justify-center items-center gap-1.5 pt-0.5">
                            <span className="text-xs font-semibold text-neutral-950">₹{relatedP.price.toLocaleString('en-IN')}</span>
                            {relatedP.originalPrice > relatedP.price && (
                              <span className="text-[10px] text-neutral-400 line-through">₹{relatedP.originalPrice.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        {relatedP.inStock ? (
                          <button
                            onClick={() => addToCart(relatedP)}
                            className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-gold-100 text-[11px] font-bold uppercase tracking-wider py-2 rounded-sm transition-colors cursor-pointer"
                          >
                            Add To Cart
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full text-center bg-neutral-100 text-neutral-400 text-[11px] font-bold uppercase tracking-wider py-2 rounded-sm line-through cursor-not-allowed"
                          >
                            Sold Out
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
