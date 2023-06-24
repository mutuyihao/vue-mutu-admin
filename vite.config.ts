import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import removeConsole from "vite-plugin-remove-console";
import viteCompression from "vite-plugin-compression"

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: { output: { experimentalLogSideEffects:true,experimentalMinChunkSize: 5000 } }
  // },
  build: {
    rollupOptions: { output: { manualChunks: { ['axios']: ['axios'], ['pinia']: ['pinia'], ['echarts']: ['echarts'] } } }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    removeConsole(),
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
