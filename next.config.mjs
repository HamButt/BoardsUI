/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    basePath: 'http://localhost:5000',
    apiKey: 'USPpc8CLH2FQgxdjzStX3hgyE8jbRF6D',
    clientId: 'IXEohvKJtIcp7LM0qE7-mQaHXBdHZDPUKwY5dodFB6s',
    unsplashUrl: 'https://api.unsplash.com/search/photos',
    // gifUrl: "https://api.giphy.com/v1/gifs/search?api_key=USPpc8CLH2FQgxdjzStX3hgyE8jbRF6D&q=${gifSearchValue}&limit=10&offset=0&rating=g&lang=en"
  },
  img: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
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
 

};

export default nextConfig;
