import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CartProvider } from '@/context/CartContext';
import { NavigationLoadingProvider } from '@/context/NavigationLoading';
import './globals.css';
import ToastContainer from '@/components/ToastContainer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Trinklets Jewellery | Premium Fine Jewellery Shop',
  description: 'Premium, elegant, minimalistic handcrafted fine jewellery of Trinklets. Shop modern rose rings, bespoke necklaces, and classic pearl drop earrings online.',
  metadataBase: new URL('https://trinkletsjewellery.in'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-brand-dark bg-brand-cream selection:bg-gold-200/40 selection:text-brand-dark overflow-x-hidden min-h-screen">
        <CartProvider>
          <NavigationLoadingProvider>
            <ToastContainer />
            {children}
          </NavigationLoadingProvider>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
