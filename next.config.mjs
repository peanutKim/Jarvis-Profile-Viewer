import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'jarvis-profile-viewer.vercel.app',
      },
    ],
    unoptimized: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
