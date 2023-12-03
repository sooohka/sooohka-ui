import { defineConfig } from '@pandacss/dev';

import { breakpoints, createSemanticTokens, createTokens, keyframes, textStyles } from '@/theme';

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base'],
  theme: {
    extend: {
      breakpoints,
      keyframes,
      textStyles,
      tokens: createTokens({ accentColor: 'plum', borderRadius: 'sm', grayColor: 'sand' }),
      semanticTokens: createSemanticTokens({ accentColor: 'plum', borderRadius: 'sm', grayColor: 'sand' }),
    },
  },
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  clean: true,
});
