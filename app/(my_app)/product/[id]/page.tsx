import Link from 'next/link';
import ProductDetailsClient from './ProductDetailsClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductByIdentifier, getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const product = await getProductByIdentifier(id);

  if (!product) {
    // Elegant product 404
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center space-y-6 px-4 select-none">
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-extralight tracking-widest text-neutral-900">Creation Not Found</h1>
            <p className="text-sm font-light text-neutral-400 max-w-sm">We could not locate the handcrafted trinklet item with ID &ldquo;{id}&rdquo;. It may have been retired from our catalog.</p>
          </div>
          <Link
          prefetch
            href="/shop"
            className="inline-flex bg-neutral-900 border border-transparent hover:bg-neutral-800 text-gold-100 uppercase tracking-widest text-xs font-bold px-8 py-3.5 rounded-sm transition-colors cursor-pointer"
          >
            Explore Active Catalog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Find related products in same category (exclude current product)
  const products = await getProducts();
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailsClient product={product} relatedProducts={related} />;
}
