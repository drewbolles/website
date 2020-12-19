/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const pwaOpts = {
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [withPWA, pwaOpts],
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
