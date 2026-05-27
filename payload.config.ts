import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import Products from './collections/Products'
import Users from './collections/Users'
import Media from './collections/Media'
import sharp from 'sharp'
import { s3Storage } from "@payloadcms/storage-s3"

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
  debug: true,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
      generateFileURL: ({ filename }) => {
          return `${process.env.R2_PUBLIC_URL}/${filename}`
        }
    }),
  ]
})

export default config
