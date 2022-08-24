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

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [768, 1024, 1280],
  },
  async redirects() {
    return [
      {
        source: '/blog/2015/04/23/inline-critical-css-using-jekyll-and-gulp',
        destination: '/blog/inline-critical-css-using-jekyll-and-gulp',
        permanent: true,
      },
      {
        source:
          '/blog/2016/11/14/webpack-code-splitting-with-create-react-app-react-router',
        destination:
          '/blog/webpack-code-splitting-with-create-react-app-react-router',
        permanent: true,
      },
      {
        source: '/blog/2013/12/22/how-to-structure-your-next-sass-project',
        destination: '/blog/how-to-structure-your-next-sass-project',
        permanent: true,
      },
      {
        source: '/blog/2016/01/14/introducing-gotham-drupal-8-starter-theme',
        destination: '/blog/introducing-gotham-drupal-8-starter-theme',
        permanent: true,
      },
      {
        source: '/blog/2014/09/01/joining-chapter-three',
        destination: '/blog/joining-chapter-three',
        permanent: true,
      },
      {
        source: '/blog/2013/12/28/no-javascript-toggle-content-feature',
        destination: '/blog/no-javascript-toggle-content-feature',
        permanent: true,
      },
      {
        source: '/blog/2013/12/27/defining-your-content-views',
        destination: '/blog/defining-your-content-views',
        permanent: true,
      },
      {
        source:
          '/blog/2016/01/14/printing-entity-reference-field-programmatically-drupal-8',
        destination:
          '/blog/printing-entity-reference-field-programmatically-drupal-8',
        permanent: true,
      },
      {
        source: '/blog/2016/01/14/i-was-featured-in-lullabots-drupal-8-podcast',
        destination: '/blog/i-was-featured-in-lullabots-drupal-8-podcast',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/work',
        permanent: true,
      },
    ];
  },
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
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [withPWA, pwaOpts],
    [withOptimizedImages, { optimizeImagesInDev: true }],
  ],
  nextConfig,
);
