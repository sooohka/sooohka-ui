import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            50: { value: '#f1f9fe' },
            100: { value: '#e2f2fc' },
            200: { value: '#bfe3f8' },
            300: { value: '#87cef2' },
            400: { value: '#53baea' },
            500: { value: '#209cd7' },
            600: { value: '#127db7' },
            700: { value: '#106494' },
            800: { value: '#11557b' },
            900: { value: '#144766' },
            950: { value: '#0d2d44' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
