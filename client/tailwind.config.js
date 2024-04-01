/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'light-blue': '#6CC4EE',
          'dark-blue': '#1F275C',
        },
        fontSize: {
          'extra-large': '2.5rem',
          'smaller': '0.75rem',
        }
      },
    },
  },
  plugins: [],
}

