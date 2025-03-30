/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-dark': '#1e1e2d',
        'app-darker': '#171723',
        'app-light': '#f6f6f6',
        'app-green': '#4caf50',
        'app-red': '#f44336',
        'app-blue': '#2196f3',
        'app-yellow': '#ffeb3b',
        'app-purple': '#9c27b0',
      },
    },
  },
  plugins: [],
}