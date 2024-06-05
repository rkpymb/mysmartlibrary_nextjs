const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Only disable PWA in development
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
      domains: ['img.youtube.com', 'localhost', 'res.cloudinary.com'],
  },
  eslint: {
      ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  async redirects() {
      return [
          {
              source: '/dashboards',
              destination: '/dashboards/crypto',
              permanent: true,
          },
      ];
  },
};

module.exports = withPWA(nextConfig);
