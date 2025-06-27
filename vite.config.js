import {defineConfig} from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://10.10.130.6:88',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            }
        }
    }
})