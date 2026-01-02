/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html.twig',
    './assets/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#A4BD01',
        'light-blue': '#EBF2FA',
        'dark-blue': '#06668C',
      },
    },
  },
  plugins: [],
}

