import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trinklets Jewellery | Anti-Tarnish Everyday Jewellery',
  description:
    'Shop anti-tarnish jewellery from Trinklets, including minimal necklaces, bracelets, earrings, and everyday styling pieces.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Trinklets Jewellery | Anti-Tarnish Everyday Jewellery',
    description:
      'Shop anti-tarnish jewellery from Trinklets, including minimal necklaces, bracelets, earrings, and everyday styling pieces.',
    url: '/',
    siteName: 'Trinklets Jewellery',
    type: 'website',
  },
};

export default async function Home() {
  const products = await getProducts().catch((error) => {
    console.error('Failed to load featured homepage products:', error);
    return [];
  });
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'Trinklets Jewellery',
    url: 'https://trinkletsjewellery.in',
    description:
      'Anti-tarnish jewellery crafted for everyday confidence, including necklaces, bracelets, earrings, and rings.',
    sameAs: ['https://www.instagram.com/trinklets.jewellery'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient featuredProducts={featuredProducts} />
    </>
  );
}
