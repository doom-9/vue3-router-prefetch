import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      fileName: 'my-lib',
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
    },
  },
})
