const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true, 
  });
  

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
      domains: ['img.youtube.com', 'localhost', 'res.cloudinary.com', 'api.mysmartlibrary.in'],
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
