import path from 'path'

import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/simple-resume/',
  plugins: [
    react(),
    UnoCSS({ /* options */ }),
    createHtmlPlugin({
      inject: {
        data: {
          buildTimestamp: Date.now(),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
