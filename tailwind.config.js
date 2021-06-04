const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-minmax-75px': 'repeat(auto-fit, minmax(75px, 1fr))',
      },
      colors: {
        'link': 'royalblue'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
