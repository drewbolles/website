/* eslint-disable */
const withOffline = require('next-offline');
const withOptimizedImages = require('next-optimized-images');
const withManifest = require('next-manifest');

module.exports = withManifest(
  withOffline(
    withOptimizedImages({
      optimizeImagesInDev: true,
      workboxOpts: {
        swDest: 'service-worker.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offlineCache',
              expiration: {
                maxEntries: 200,
              },
            },
          },
        ],
      },
      manifest: {
        output: './public',
        name: 'Drew Bolles',
        short_name: 'Drew Bolles',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
      },
      async rewrites() {
        return [
          {
            source: '/service-worker.js',
            destination: '/_next/static/service-worker.js',
          },
        ];
      },
      webpack: configuration => {
        configuration.module.rules.push({
          test: /\.md$/,
          use: 'frontmatter-markdown-loader',
        });
        return configuration;
      },
    }),
  ),
);
