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
      type: 'pages',
      bindings: {
        CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
        CLOUDFLARE_API_TOKEN: 'CLOUDFLARE_API_TOKEN'
      }
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
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-select'],
            'ai-vendor': ['@cloudflare/ai', 'zod', 'zustand']
          }
        }
      }
    }
  }
});
