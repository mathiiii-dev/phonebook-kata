/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    api: 'http://localhost:8010/proxy',
  },
}

module.exports = nextConfig
