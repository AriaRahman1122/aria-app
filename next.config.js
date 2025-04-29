const nextConfig = {
  reactStrictMode: true,
  experimental: {
    fastRefresh: true,  // Explicitly enable Fast Refresh
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig