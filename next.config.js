/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['img.youtube.com', 'localhost','api.driteducation.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
}


module.exports = nextConfig
