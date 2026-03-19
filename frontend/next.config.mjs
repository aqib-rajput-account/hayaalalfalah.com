/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/mosques/:id/announcements',
        destination: 'http://localhost:4004/api/mosques/:id/announcements',
      },
      {
        source: '/api/mosques/:id/events',
        destination: 'http://localhost:4003/api/mosques/:id/events',
      },
      {
        source: '/api/mosques/:id/books',
        destination: 'http://localhost:4006/api/mosques/:id/books',
      },
      {
        source: '/api/mosques/:id/goals',
        destination: 'http://localhost:4007/api/mosques/:id/goals',
      },
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:4001/api/auth/:path*',
      },
      {
        source: '/api/mosques/:path*',
        destination: 'http://localhost:4002/api/mosques/:path*',
      },
      {
        source: '/api/prayer-times/:path*',
        destination: 'http://localhost:4003/api/prayer-times/:path*',
      },
      {
        source: '/api/events/:path*',
        destination: 'http://localhost:4003/api/events/:path*',
      },
      {
        source: '/api/community/:path*',
        destination: 'http://localhost:4004/api/community/:path*',
      },
      {
        source: '/api/shura/:path*',
        destination: 'http://localhost:4005/api/shura/:path*',
      },
      {
        source: '/api/library/:path*',
        destination: 'http://localhost:4006/api/library/:path*',
      },
      {
        source: '/api/finance/:path*',
        destination: 'http://localhost:4007/api/finance/:path*',
      },
      {
        source: '/api/announcements/:path*',
        destination: 'http://localhost:4004/api/announcements/:path*',
      },
      {
        source: '/api/books/:path*',
        destination: 'http://localhost:4006/api/books/:path*',
      },
      {
        source: '/api/goals/:path*',
        destination: 'http://localhost:4007/api/goals/:path*',
      },
    ]
  },
}

export default nextConfig
