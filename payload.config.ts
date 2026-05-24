import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import Products from './collections/Products.ts'
import Users from './collections/Users.ts'

const config = buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: 'users',
  },
  collections: [Users, Products],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
})

export default config