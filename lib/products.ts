import config from '@payload-config'
import { getPayload } from 'payload'

type MediaDoc = {
  filename?: string
  url?: string
}

type ProductDoc = {
  id: string
  sku?: string
  name?: string
  price?: number
  originalPrice?: number
  category?: string
  description?: string
  inStock?: boolean
  featured?: boolean
  images?: {
    image?: string | MediaDoc
  }[]
  createdAt?: string
}

export type StorefrontProduct = {
  id: string
  payloadId: string
  name: string
  price: number
  originalPrice: number
  category: string
  images: string[]
  description: string
  inStock: boolean
  featured: boolean
  createdAt?: string
}

function mediaPath(media: string | MediaDoc | undefined): string | null {
  if (!media || typeof media === 'string') {
    return null
  }

  if (media.url) {
    return media.url
  }

  if (media.filename) {
    return `${process.env.R2_PUBLIC_URL}/${media.filename}`
  }

  return null
}

function normalizeProduct(doc: ProductDoc): StorefrontProduct {
  const images = (doc.images ?? [])
    .map((item) => mediaPath(item.image))
    .filter((src): src is string => Boolean(src))

  return {
    id: doc.sku || doc.id,
    payloadId: doc.id,
    name: doc.name || '',
    price: doc.price || 0,
    originalPrice: doc.originalPrice || doc.price || 0,
    category: doc.category || '',
    images,
    description: doc.description || '',
    inStock: doc.inStock ?? true,
    featured: doc.featured ?? false,
    createdAt: doc.createdAt,
  }
}

export async function getProducts(): Promise<StorefrontProduct[]> {
  const payload = await getPayload({ config })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 100,
    sort: '-createdAt',
  })

  return products.docs.map((doc) => normalizeProduct(doc as ProductDoc))
}

export async function getProductByIdentifier(identifier: string): Promise<StorefrontProduct | null> {
  const payload = await getPayload({ config })

  const bySku = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 1,
    where: {
      sku: {
        equals: identifier,
      },
    },
  })

  const doc = bySku.docs[0]

  if (doc) {
    return normalizeProduct(doc as ProductDoc)
  }

  try {
    const byId = await payload.findByID({
      collection: 'products',
      id: identifier,
      depth: 1,
    })

    return normalizeProduct(byId as ProductDoc)
  } catch {
    return null
  }
}
