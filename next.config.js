/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  return {
    reactStrictMode: false,
    images: { unoptimized: true },
    env: {
      basePath: isDev ? 'http://localhost:5000' : 'https://boards-backend.up.railway.app',
      copyLinkUrl: isDev ? 'http://localhost:3000' : 'https://praiseboard.vercel.app'
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'boards-backend.up.railway.app',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    });

    return config;
  },
  }
}
