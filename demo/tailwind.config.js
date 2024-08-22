/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        '4xl': '40px',
        '5xl': '50px',
       
      },screens: {
        'custom': '950px','custom2': '865px','custom3': '870px',
      },
    },
  },
  plugins: [],
}

