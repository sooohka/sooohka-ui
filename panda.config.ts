import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(64px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(64px)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-4px)' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideOutToBottom: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(4px)' },
        },
      },
      textStyles: {
        xs: { value: { fontSize: 'xs', lineHeight: '1.125rem' } },
        sm: { value: { fontSize: 'sm', lineHeight: '1.25rem' } },
        md: { value: { fontSize: 'md', lineHeight: '1.5rem' } },
        lg: { value: { fontSize: 'lg', lineHeight: '1.75rem' } },
        xl: { value: { fontSize: 'xl', lineHeight: '1.875rem' } },
        '2xl': { value: { fontSize: '2xl', lineHeight: '2rem' } },
        '3xl': { value: { fontSize: '3xl', lineHeight: '2.375rem' } },
        '4xl': { value: { fontSize: '4xl', lineHeight: '2.75rem', letterSpacing: '-0.02em' } },
        '5xl': { value: { fontSize: '5xl', lineHeight: '3.75rem', letterSpacing: '-0.02em' } },
        '6xl': { value: { fontSize: '6xl', lineHeight: '4.5rem', letterSpacing: '-0.02em' } },
        '7xl': { value: { fontSize: '7xl', lineHeight: '5.75rem', letterSpacing: '-0.02em' } },
      },
      semanticTokens: {
        colors: {
          primary: {
            DEFAULT: { value: `{colors.violet.500}` },
            hover: { value: `{colors.violet.600}` },
            active: { value: `{colors.violet.700}` },
          },
          border: {
            DEFAULT: { value: `{colors.gray.300}` },
            primary: { value: `{colors.violet.500}` },
          },
          text: {
            DEFAULT: { value: `{colors.gray.700}` },
            primary: { value: `{colors.violet.500}` },
          },
          bg: {
            DEFAULT: { value: `{colors.white}` },
            primary: { value: `{colors.violet.500}` },
          },
          danger: {
            DEFAULT: { value: `{colors.red.500}` },
          },
        },
      },
    },
  },
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  clean: true,
});
