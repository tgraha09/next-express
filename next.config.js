/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/home': { page: '/'}
      
    }
  }
}

module.exports = nextConfig
