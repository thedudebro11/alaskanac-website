import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects() {
    return [
      { source: '/ac-maintenance', destination: '/alaskafy-your-system', permanent: true },
      { source: '/ac-maintenance/', destination: '/alaskafy-your-system/', permanent: true },
      { source: '/new-air-conditioning-system', destination: '/ac-installation', permanent: true },
      { source: '/new-air-conditioning-system/', destination: '/ac-installation/', permanent: true },
      { source: '/air-conditioning-service', destination: '/services', permanent: true },
      { source: '/air-conditioning-service/', destination: '/services/', permanent: true },
      { source: '/heating-service', destination: '/heating-and-furnaces', permanent: true },
      { source: '/heating-service/', destination: '/heating-and-furnaces/', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
