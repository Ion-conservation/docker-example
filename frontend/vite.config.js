import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 将 '@' 指向 'src' 目录
      '@comp': resolve(__dirname, 'src/components'), // 自定义别名
      '@views': resolve(__dirname, 'src/views'),
      '@store': resolve(__dirname, 'src/store'),
      '@router': resolve(__dirname, 'src/router'),
      '@utils': resolve(__dirname, 'src/utils'),
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: true,
    watch: {
      usePolling: true, // 启用轮询
      interval: 1000, // 每秒检查一次
    },
    proxy: {
      '/backend': {
        target: 'http://backend:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
    }
  },
})
