import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error loading products from Payload:', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
