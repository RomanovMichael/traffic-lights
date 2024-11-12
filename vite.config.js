import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      vue({
        template: {
          compilerOptions: {
            isCustomElement: items => ['AppDataView'].includes(items)
          }
        }
      })
    ),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src/components', import.meta.url)),
      STORES: fileURLToPath(new URL('./src/stores', import.meta.url)),
      UTILS: fileURLToPath(new URL('./src/utils', import.meta.url)),
      CONFIGS: fileURLToPath(new URL('./src/configs', import.meta.url)),
      API: fileURLToPath(
        new URL('./src/composables/requests.js', import.meta.url)
      )
    }
  }
})
