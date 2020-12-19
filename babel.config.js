module.exports = {
  presets: ["next/babel"],
  plugins: [],
  env: {
    test: {
      plugins: ["transform-require-context"],
    },
  },
};
