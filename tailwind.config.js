module.exports = {
  content: ['src/**/*.tsx'],
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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
