import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    runtime: {
      mode: 'local',
      type: 'pages'
    }
  }),
  outDir: './dist/cloudflare',
  vite: {
    ssr: {
      external: ['@cloudflare/ai']
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});
