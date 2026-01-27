/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for Cloudflare Pages – no Node image optimizer on Edge
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // Improve image loading performance
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig

// Initialize OpenNext Cloudflare adapter for local development
const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare')
initOpenNextCloudflareForDev()

