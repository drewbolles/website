module.exports = {
  purge: ['src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
      },
    },
  },
  variants: {
    extend: {
      padding: ['first'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
