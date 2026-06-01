import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';

const baseUrl = 'https://trinkletsjewellery.in';

export const dynamic = 'force-dynamic';

const staticRoutes = [
  '',
  '/shop',
  '/about',
  '/contact',
  '/cart',
  '/checkout',
  '/privacy',
  '/terms',
  '/shipping',
  '/refund',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : route === '/shop' ? 0.9 : 0.6,
  })) satisfies MetadataRoute.Sitemap;

  try {
    const products = await getProducts();
    const productEntries = products.map((product) => ({
      url: `${baseUrl}/product/${encodeURIComponent(product.id)}`,
      lastModified: product.createdAt ? new Date(product.createdAt) : now,
      changeFrequency: 'weekly',
      priority: product.featured ? 0.8 : 0.7,
    })) satisfies MetadataRoute.Sitemap;

    return [...staticEntries, ...productEntries];
  } catch (error) {
    console.error('Failed to build product sitemap entries:', error);
    return staticEntries;
  }
}
