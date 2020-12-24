/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const markdownIt = require('markdown-it');
const markdownItPrism = require('markdown-it-prism');

const pwaOpts = {
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
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
    target: 'serverless',
    webpack: configuration => {
      configuration.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          markdownIt: markdownIt({ html: true }).use(markdownItPrism),
        },
      });
      return configuration;
    },
  },
);
