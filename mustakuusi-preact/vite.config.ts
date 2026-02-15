import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  css: {
    modules: {
      localsConvention: "camelCase",
    }
  },
  base: '/m',
  build: {
    outDir: '../dist/m'
  }
})
