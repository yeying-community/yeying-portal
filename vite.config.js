import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: { //在生产环境中移除console.log和debugger语句，减少打包后的文件大小。
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 将node_modules中的模块单独打包
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('.css')) {
            return "static/css/[name]-[hash].[ext]"
          }
          if (["png", "jpg", "svg", "PNG"].some(ext => assetInfo.name.endsWith(ext))) {
            return "static/img/[name]-[hash].[ext]"
          }
          if (["ttf", "woff", "woff2"].some(ext => assetInfo.name.endsWith(ext))) {
            return "static/fonts/[name]-[hash].[ext]"
          }
          return "static/css/[name]-[hash].[ext]"
        }

      },
    },
  },
  plugins: [
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 50,
      deleteOriginFile: true,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    vue(),
    // vueDevTools(),
  ],
  // css: {
  //   postcss: {
  //     plugins: [
  //       require('cssnano')({ preset: 'default' }), // 使用 cssnano 进一步压缩 CSS
  //     ],
  //   },
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
