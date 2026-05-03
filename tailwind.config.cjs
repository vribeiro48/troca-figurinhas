/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        worldcup: "url('/background-worldcup.png')"
      },
      backgroundColor: {
        worldcup26: "#0C1B33",
        worldcup26Dark: "#7B0D1E"
      }
    },
  },
  plugins: [],
}
