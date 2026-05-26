'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Star, Quote, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { RiShoppingBag2Fill } from "react-icons/ri";


export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToast } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load products in homepage:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const collections = [
    {
      name: 'Exquisite Rings',
      desc: 'Elegant bands crafted to express everlasting connections.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
      tag: 'Rings',
    },
    {
      name: 'Bespoke Necklaces',
      desc: 'Graceful statements that trace light beautifully.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
      tag: 'Necklaces',
    },
    {
      name: 'Glimmering Earrings',
      desc: 'Freshwater pearls & daily studs made for light stacking.',
      image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600',
      tag: 'Earrings',
    },
  ];

  const instagramShots = [
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1611085583191-a3b1a40ffd50?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1630012411391-72921ba0be3c?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=40&w=400',
  ];

  return (
    <>
      <Navbar />
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-brand-secondary flex items-center justify-center overflow-hidden">
        {/* Ambient Overlay backgrounds */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background Fine jewelry"
            fill
            priority
            className="object-cover opacity-15 filter scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-brand-secondary/95 to-brand-secondary" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 z-10 text-center space-y-8 select-none">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 backdrop-blur-xs border border-gold-500/15 rounded-full text-gold-600 text-xs font-semibold uppercase tracking-widest leading-none mx-auto"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-500" /> Wear The Main Character Energy
          </motion.div>

          {/* Core Brand Headlines */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif text-5xl sm:text-7xl font-extralight tracking-widest text-brand-dark leading-tight"
            >
              CRAFTED FOR YOU
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="max-w-2xl mx-auto text-sm sm:text-base font-light text-neutral-500 tracking-wide leading-relaxed font-sans"
            >
              Discover 𝗮𝗻𝘁𝗶-𝘁𝗮𝗿𝗻𝗶𝘀𝗵 jewellery crafted for everyday 𝗰𝗼𝗻𝗳𝗶𝗱𝗲𝗻𝗰𝗲, pieces that are 𝘁𝗿𝗲𝗻𝗱𝘆,𝗺𝗶𝗻𝗶𝗺𝗮𝗹 and 𝗽𝗲𝗿𝗳𝗲𝗰𝘁 for everyday styling because your outfit deserves more than basics             </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center bg-brand-dark text-gold-100 hover:bg-gold-500 hover:text-white transition-all duration-300 uppercase px-8 py-4 text-xs font-bold tracking-[0.25em] rounded-sm shadow-md gap-2 cursor-pointer w-full sm:w-auto"
            >
              Shop Collection <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-gold-500/20 bg-white/40 backdrop-blur-xs hover:bg-white text-neutral-700 hover:text-brand-dark transition-all uppercase px-8 py-4 text-xs font-bold tracking-[0.25em] rounded-sm cursor-pointer w-full sm:w-auto"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Floating scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Scroll Details</span>
          <div className="h-8 w-px bg-gold-300 animate-bounce" />
        </div>
      </section>

      {/* Editorial Quote */}
      <section className="bg-brand-cream py-20 px-4 border-b border-gold-500/15 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Quote className="h-8 w-8 text-gold-300 mx-auto opacity-75" />
          <p className="font-serif text-2xl sm:text-3xl italic text-neutral-700 leading-relaxed font-light">
            &ldquo;Jewellery is not just an accessory; it is a celebration of the feminine spirit, a quiet expression of timeless elegance.&rdquo;
          </p>
          <div className="h-px w-20 bg-gold-400 mx-auto my-4" />
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-sans">The Trinklets Editorial</span>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="bg-brand-cream py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">Curated Edits</span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-brand-dark font-normal">Featured Families</h2>
            <div className="h-0.5 w-12 bg-gold-300 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((col, index) => (
              <div
                key={index}
                className="group flex flex-col space-y-4 cursor-pointer bg-brand-secondary p-4 border border-gold-500/10 rounded-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-80 rounded-sm overflow-hidden bg-neutral-200">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1 block">
                  <h3 className="font-serif text-xl tracking-wide text-neutral-900 group-hover:text-gold-500 transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">{col.desc}</p>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/shop?category=${col.tag}`}
                    className="inline-flex items-center gap-1 text-xs uppercase font-semibold text-neutral-800 hover:text-gold-600 tracking-wider transition-colors"
                  >
                    Explore Family <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Products Grid Section */}
      <section className="bg-brand-secondary py-24 px-2 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start text-start gap-4 border-b border-gold-500/20 pb-6">
            <div className="space-y-2 text-start">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">Trending Trinklets</span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-brand-dark font-normal">The Best Sellers</h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase font-bold tracking-widest text-brand-dark/80 hover:text-gold-500 transition-colors flex items-center gap-1 pb-1"
            >
              Browse All Products <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loading ? (
            // Skeleton Loader
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-square bg-neutral-200 rounded-sm" />
                  <div className="h-4 bg-neutral-200 w-3/4 mx-auto rounded-sm" />
                  <div className="h-4 bg-neutral-200 w-1/2 mx-auto rounded-sm" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {featuredProducts.map((product) => {
                const discount = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                );
                return (
                  <div
                    key={product.id}
                    className="group bg-white border border-gold-500/10 p-4 rounded-sm hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 relative flex flex-col justify-between"
                  >
                    {/* Image */}
                    <div>
                      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-sm mb-4">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Circular Add to Cart Badge */}
                        {product.inStock && (
                          <button
                            onClick={() => addToCart(product)}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:-translate-y-2 z-10 h-12 w-12 rounded-full bg-neutral-900 hover:bg-gold-500 text-gold-100 hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                            title="Add to cart"
                          >
                            <RiShoppingBag2Fill />
                          </button>
                        )}

                        {discount > 0 && (
                          <span className="absolute top-2 left-2 bg-gold-400 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm shadow-xs">
                            {discount}% Off
                          </span>
                        )}

                        <Link
                          href={`/product/${product.id}`}
                          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <span className="bg-white/90 text-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest flex items-center gap-1 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors">
                            <Eye className="h-3.5 w-3.5" /> Details
                          </span>
                        </Link>
                      </div>

                      <div className="text-center space-y-1">
                        <p className="text-[11px] text-neutral-400 uppercase tracking-widest font-medium">
                          {product.category}
                        </p>
                        <h3 className="font-serif text-base tracking-wide text-neutral-900 leading-tight line-clamp-1">
                          <Link href={`/product/${product.id}`} className="hover:text-gold-500 transition-colors">
                            {product.name}
                          </Link>
                        </h3>
                        <div className="flex justify-center items-center gap-1.5 pt-0.5">
                          <span className="text-sm font-semibold text-neutral-950">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-neutral-400 line-through">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Instagram Gallery showcase */}
      <section className="bg-brand-cream py-24 px-4 sm:px-6 lg:px-8 border-t border-gold-500/15">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">@trinklets.jewellery</span>
            <h2 className="font-serif text-3xl tracking-wide text-brand-dark font-normal">Aesthetic Gallery</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramShots.map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden bg-neutral-100 rounded-sm group cursor-pointer shadow-xs">
                <Image
                  src={img}
                  alt={`Social life Trinklets aspect ${idx}`}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Star className="h-5 w-5 text-white animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
