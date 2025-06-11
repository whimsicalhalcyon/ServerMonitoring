import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(),  tailwindcss()],
  base: process.env.NODE_ENV === process.env.NODE_ENV === 'production'
      ? '/ServerMonitoring/'
      : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

