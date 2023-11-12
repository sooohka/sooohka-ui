/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      aria: {
        invalid: 'invalid="true"',
      },
      colors: {
        primary: {
          50: '#f1f9fe',
          100: '#e2f2fc',
          200: '#bfe3f8',
          300: '#87cef2',
          400: '#53baea',
          500: '#209cd7',
          600: '#127db7',
          700: '#106494',
          800: '#11557b',
          900: '#144766',
          950: '#0d2d44',
        },
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
