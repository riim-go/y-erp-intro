import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
//import stdLibBrowser from 'vite-plugin-node-stdlib-browser';

export default defineConfig({
  base: '/',
  build: {
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vendor-vue';
            if (id.includes('naive-ui')) return 'naive';
          }
          // if (id.includes('/src/components/')) return 'components';
        },
      },
    },
  },
  plugins: [
    vue(),
    // stdLibBrowser({
    //   globals: false, // ✅ global polyfill 비활성화
    // }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        quietDeps: true,
      },
    },
  },
  server: {
    port: 9080,
    host: '0.0.0.0',
    open: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // ✅ global 중복 선언 방지
      },
    },
  },
});
