'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastContainer from '@/components/ToastContainer';
import { Eye, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/storefront/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Hook query parameter values on initial render
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setTimeout(() => {
        setActiveCategory(categoryParam);
      }, 0);
    }
  }, [searchParams]);

  const categories = ['All', 'Necklaces', 'Earrings', 'Bracelets', 'Rings'];

  // Filter products based on search & category
  const filteredProducts = products?.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'newest') {
      return b.id.localeCompare(a.id); // alphabetical fallback simulation
    }
    // 'featured'
    return b.featured ? 1 : -1;
  });

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Sync browser query parameter
    if (category === 'All') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="pt-28 pb-20 select-none bg-brand-cream">
      
      {/* Editorial Header */}
      <section className="bg-brand-secondary py-16 px-4 border-b border-gold-500/15 text-center mb-12">
        <div className="max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold">Unveiling Craft</span>
          <h1 className="font-serif text-4xl font-extralight tracking-widest text-brand-dark">
            {activeCategory === 'All' ? 'Our Entire Collection' : activeCategory}
          </h1>
          <p className="text-sm font-light text-neutral-500 max-w-sm mx-auto leading-relaxed">
            Every piece is designed to tell an individual narrative. Handcrafted with top quality materials.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gold-500/20 mb-10">
          
          {/* Quick Category Filters */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-sm transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-brand-dark border-brand-dark text-gold-100 shadow-xs'
                    : 'bg-white hover:bg-brand-secondary text-neutral-600 border-gold-500/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & Sort picker */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
            
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gold-500/15 focus:border-gold-500 focus:outline-none text-sm placeholder:text-neutral-400 rounded-sm shadow-2xs matches-focus"
              />
              <Search className="h-4 w-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>

            {/* Sort Picker */}
            <div className="relative w-full sm:w-auto shrink-0 flex items-center gap-2 bg-white border border-gold-500/15 px-3 py-2 rounded-sm shadow-2xs">
              <ArrowUpDown className="h-3.5 w-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold uppercase tracking-widest text-neutral-600 focus:outline-none cursor-pointer w-full sm:w-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Collection</option>
              </select>
            </div>

          </div>

        </div>

        {/* Dynamic Products Grid */}
        {loading ? (
          // Skeletons
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="aspect-square bg-neutral-200 rounded-sm" />
                <div className="h-4 bg-neutral-200 w-3/4 mx-auto rounded-sm" />
                <div className="h-4 bg-neutral-200 w-1/2 mx-auto rounded-sm" />
              </div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          // Empty State
          <div className="py-20 text-center space-y-4 bg-neutral-50 rounded-sm border border-neutral-200/40">
            <div className="p-4 bg-amber-50 rounded-full inline-block">
              <SlidersHorizontal className="h-8 w-8 text-gold-500" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-neutral-800">No matching trinklets found</h3>
              <p className="text-neutral-500 text-sm mt-1 max-w-sm mx-auto">There are no items that match your search query or filters. Clear filters and explore different categories.</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                router.push('/shop');
              }}
              className="mt-2 inline-flex bg-neutral-900 hover:bg-neutral-800 text-gold-100 uppercase tracking-widest text-xs font-bold px-6 py-2.5 rounded-sm transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product) => {
              const discount = Math.round(
                ((product.originalPrice - product.price) / product.originalPrice) * 100
              );
              return (
                <div
                  key={product.id}
                  className="group bg-white border border-gold-500/10 p-4 rounded-sm hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 relative flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Section */}
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 rounded-sm mb-4">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-gold-400 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm shadow-xs">
                          {discount}% Off
                        </span>
                      )}
                      
                      {/* Interactive details overlay on hover */}
                      <Link
                        href={`/product/${product.id}`}
                        className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      >
                        <span className="bg-white/90 text-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest flex items-center gap-1 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors">
                          <Eye className="h-3.5 w-3.5" /> Quick View
                        </span>
                      </Link>
                    </div>

                    {/* Metadata Card Text */}
                    <div className="text-center space-y-1">
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
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

                  <div className="pt-4">
                    {product.inStock ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full text-center bg-neutral-900 hover:bg-neutral-800 text-gold-100 text-xs font-bold uppercase tracking-wider py-2.5 rounded-sm transition-colors cursor-pointer"
                      >
                        Add To Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full text-center bg-neutral-200 text-neutral-400 text-xs font-bold uppercase tracking-wider py-2.5 rounded-sm line-through cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default function Shop() {
  return (
    <>
      <Navbar />
      <CartDrawer />

      <Suspense fallback={
        <div className="pt-32 text-center text-sm font-light text-neutral-400">
          Loading boutique options...
        </div>
      }>
        <ShopContent />
      </Suspense>

      <Footer />
    </>
  );
}
