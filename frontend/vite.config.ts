import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [vue()],
    define: {
      VITE_BUILE: JSON.stringify(env.VITE_BUILE),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 将 '@' 指向 'src' 目录
        '@components': resolve(__dirname, 'src/components'), // 自定义别名
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
        interval: 500, // 每秒检查一次
      },
      proxy: {
        '/users': {
          target: 'http://backend-dev:3000',
          changeOrigin: true
        },
        '/cities': {
          target: 'http://backend-dev:3000',
          changeOrigin: true
        }
      }
    },
  };
});
