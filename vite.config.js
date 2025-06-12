import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig(({ mode }) => ({
  // 基础路径配置
  base: './',
  
  // 构建配置
  build: {
    target: 'esnext', // 使用现代浏览器特性
    outDir: 'dist',
    assetsDir: 'static',
    reportCompressedSize: false,
    cssCodeSplit: true, // 启用CSS代码分割（比false更节省内存）
    minify: mode === 'production' ? 'esbuild' : false, // 生产环境使用esbuild
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000, // 提高警告阈值到2MB
    
    // Rollup配置
    rollupOptions: {
      external: ['vm-browserify', 'crypto'],
      output: {
        // 智能分块策略
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const lib = id.split('node_modules/')[1].split('/')[0]
            // 对已知大库单独分块
            if ([
              'element-plus',
              '@ant-design',
              'echarts',
              'lodash',
              'axios'
            ].includes(lib)) {
              return `lib-${lib}`
            }
            // 按组织分组
            if (lib.startsWith('@yeying')) return 'yeying-group'
            return 'vendor'
          }
        },
        
        // 文件命名规则
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          const ext = name?.split('.').pop()
          return {
            'css': 'static/css/[name]-[hash].[ext]',
            'png|jpg|jpeg|svg|gif': 'static/img/[name]-[hash].[ext]',
            'woff|woff2|ttf|eot': 'static/fonts/[name]-[hash].[ext]'
          }[ext] || 'static/assets/[name]-[hash].[ext]'
        }
      }
    }
  },

  // 依赖优化
  optimizeDeps: {
    exclude: ['vm-browserify'],
    include: [ // 明确包含需要预构建的依赖
      'vue',
      'vue-router',
      'pinia',
      'element-plus/es/components'
    ]
  },

  // 插件配置
  plugins: [
    vue({
      reactivityTransform: false // 禁用实验性功能
    }),
    
    // 按需自动导入
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver({ importStyle: 'css' })], // 按需导入样式
      dts: 'src/auto-imports.d.ts'
    }),
    
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css', // 单独加载CSS
          exclude: /^El[A-Z]/ // 排除全量导入
        })
      ],
      dts: 'src/components.d.ts'
    }),
    
    // 构建分析（仅生产环境）
    mode === 'production' && visualizer({
      open: false,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: false // 禁用brotli分析减少内存
    }),
    
    // Gzip压缩（仅生产环境）
    mode === 'production' && viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
      deleteOriginFile: false,
      verbose: false // 关闭详细日志
    })
  ].filter(Boolean), // 过滤假值插件

  // 解析配置
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 解决常见模块问题
      'stream': 'stream-browserify',
      'util': 'util/'
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },

  // 开发服务器配置
  server: {
    host: '0.0.0.0',
    port: 8991,
    strictPort: true,
    proxy: {
      '/registry': {
        target: 'http://47.116.193.171:8451',
        changeOrigin: true
      },
      '/whoami': {
        target: 'http://47.116.193.171:8451',
        changeOrigin: true
      }
    }
  },

  // CSS配置
  css: {
    devSourcemap: false, // 关闭开发sourcemap
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  }
}))