/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ffdf09'
        },
        secondary: {
          100: '#010409',
          200: '#0d1117'
        },
        card: '#161b22',
        headerCard: '#222936'
      },
      backgroundImage: {
        starfield: "url('/assets/starfield.jpg')"
      }
    },
  },
  plugins: [],
}