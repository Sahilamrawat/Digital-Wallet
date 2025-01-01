/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif','Oswald'],
        heading: ['Open Sans', 'Arial', 'sans-serif'],
        denk: ['Denk One', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
