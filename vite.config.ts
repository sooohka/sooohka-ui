import path from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
  resolve: {
    alias: [
      { find: '@styled-system', replacement: path.resolve(__dirname, 'styled-system') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
