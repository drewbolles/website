/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const withOptimizedImages = require('next-optimized-images');
const withManifest = require('next-manifest');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const manifestOpts = {
  manifest: {
    output: './public',
    name: 'Drew Bolles',
    short_name: 'Drew Bolles',
    start_url: '/?utm_source=web_app_manifest',
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
};

const offlineOpts = {
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
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [withManifest, manifestOpts],
    [withOffline, offlineOpts],
    [withOptimizedImages, { optimizeImagesInDev: true }],
  ],
  {
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
  },
);
