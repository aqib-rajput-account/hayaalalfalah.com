import path from 'node:path'

const serviceUrl = (name, fallback) =>
  (process.env[name] || fallback).replace(/\/$/, '')

const communityServiceUrl = serviceUrl('COMMUNITY_SERVICE_URL', 'http://localhost:4004')
const prayerEventServiceUrl = serviceUrl('PRAYER_EVENT_SERVICE_URL', 'http://localhost:4003')
const libraryServiceUrl = serviceUrl('LIBRARY_SERVICE_URL', 'http://localhost:4006')
const financeServiceUrl = serviceUrl('FINANCE_SERVICE_URL', 'http://localhost:4007')
const identityServiceUrl = serviceUrl('IDENTITY_SERVICE_URL', 'http://localhost:4001')
const mosqueServiceUrl = serviceUrl('MOSQUE_SERVICE_URL', 'http://localhost:4002')
const governanceServiceUrl = serviceUrl('GOVERNANCE_SERVICE_URL', 'http://localhost:4005')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(import.meta.dirname, '..'),
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/mosques/:id/announcements',
        destination: `${communityServiceUrl}/api/mosques/:id/announcements`,
      },
      {
        source: '/api/mosques/:id/events',
        destination: `${prayerEventServiceUrl}/api/mosques/:id/events`,
      },
      {
        source: '/api/mosques/:id/books',
        destination: `${libraryServiceUrl}/api/mosques/:id/books`,
      },
      {
        source: '/api/mosques/:id/goals',
        destination: `${financeServiceUrl}/api/mosques/:id/goals`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${identityServiceUrl}/api/auth/:path*`,
      },
      {
        source: '/api/mosques/:path*',
        destination: `${mosqueServiceUrl}/api/mosques/:path*`,
      },
      {
        source: '/api/prayer-times/:path*',
        destination: `${prayerEventServiceUrl}/api/prayer-times/:path*`,
      },
      {
        source: '/api/events/:path*',
        destination: `${prayerEventServiceUrl}/api/events/:path*`,
      },
      {
        source: '/api/community/:path*',
        destination: `${communityServiceUrl}/api/community/:path*`,
      },
      {
        source: '/api/shura/:path*',
        destination: `${governanceServiceUrl}/api/shura/:path*`,
      },
      {
        source: '/api/library/:path*',
        destination: `${libraryServiceUrl}/api/library/:path*`,
      },
      {
        source: '/api/finance/:path*',
        destination: `${financeServiceUrl}/api/finance/:path*`,
      },
      {
        source: '/api/announcements/:path*',
        destination: `${communityServiceUrl}/api/announcements/:path*`,
      },
      {
        source: '/api/books/:path*',
        destination: `${libraryServiceUrl}/api/books/:path*`,
      },
      {
        source: '/api/goals/:path*',
        destination: `${financeServiceUrl}/api/goals/:path*`,
      },
    ]
  },
}

export default nextConfig
