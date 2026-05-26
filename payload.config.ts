import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import Products from './collections/Products'
import Users from './collections/Users'
import Media from './collections/Media'
import sharp from 'sharp'

const config = buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: 'users',
  },
  collections: [Users, Products, Media],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  sharp,
  debug: true
})

export default config
