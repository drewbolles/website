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
  ],
  plugins: [],
  env: {
    test: {
      plugins: ['transform-require-context'],
    },
  },
};
