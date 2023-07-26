/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    domains: ['books.google.com']
  }
}

module.exports = nextConfig
