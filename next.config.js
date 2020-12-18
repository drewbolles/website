/* eslint-disable */
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  optimizeImagesInDev: true,
  webpack: configuration => {
    configuration.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    });
    return configuration;
  },
});
