/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
