import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',

  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
  },

  admin: {
    defaultColumns: [
      'customerName',
      'customerPhone',
      'totalAmount',
      'status',
      'createdAt',
    ],
  },

  fields: [
    {
      name: 'customerName',
      type: 'text',
    },
    {
      name: 'customerPhone',
      type: 'text',
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'postalCode', type: 'text' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'quantity', type: 'number' },
        { name: 'price', type: 'number' },
      ],
    },
    {
      name: 'totalAmount',
      type: 'number',
    },
    {
      name: 'status',
      type: 'text',
    },
    {
      name: 'createdAt',
      type: 'date',
    },
  ],
}