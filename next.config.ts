import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admgel.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sutochno.ru',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'traveller-eu.ru',
        port: '',
        pathname: '/**',
      },

    ],
  },
};

export default nextConfig;
