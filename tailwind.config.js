/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customOrange: '#F06428',
        customOrangeLight: '#FF8C00',
      },

    },
  },
  plugins: [],
}
