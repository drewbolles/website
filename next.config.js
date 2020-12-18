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
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 200,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        output: './public',
        name: 'Drew Bolles',
        short_name: 'Drew Bolles',
        start_url: 'https://www.drewbolles.com?utm_source=web_app_manifest',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/safari-pinned-tab.svg',
            type: 'image/svg',
            purpose: 'maskable',
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
