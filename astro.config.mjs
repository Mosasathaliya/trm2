import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  outDir: './dist',
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});
