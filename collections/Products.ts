import type { CollectionConfig } from 'payload'
import { randomUUID } from 'crypto'

const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Stable storefront URL identifier, for example ring001.',
      },
      defaultValue: randomUUID()
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'originalPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Rings',
          value: 'Rings',
        },
        {
          label: 'Necklaces',
          value: 'Necklaces',
        },
        {
          label: 'Earrings',
          value: 'Earrings',
        },
        {
          label: 'Bracelets',
          value: 'Bracelets',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          displayPreview: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
}

export default Products
