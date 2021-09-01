module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: null,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [],
  env: {
    test: {
      plugins: ['transform-require-context'],
    },
  },
};
