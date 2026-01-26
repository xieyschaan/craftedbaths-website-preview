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
  },
}

module.exports = nextConfig

