import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === 'production' ? '/React_Challege_Practice/' : '',

  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        client: 'index.html', // Entry point for client-side code
      },
    },
    outDir: 'dist',
  },
});
