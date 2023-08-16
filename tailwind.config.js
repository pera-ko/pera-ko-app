/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'money': ['Oswald, sans-serif']
      },
      gridTemplateColumns: {
        'auto-fit-minmax-75px': 'repeat(auto-fit, minmax(75px, 1fr))',
      },
      colors: {
        'link': '#008CC8',
        'error': '#B91C1C',
        'dark': '#242424'
      },
      borderRadius: {
        '5xl': '3rem'
      }
    },
  },
  plugins: [
    require('cssnano')({
      preset: 'default'
    })
  ],
}