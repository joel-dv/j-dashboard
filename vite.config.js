import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('/node_modules/three/')) {
            return 'three'
          }

          if (id.includes('/node_modules/p5/')) {
            return 'p5'
          }

          if (
            id.includes('/node_modules/@react-three/fiber/') ||
            id.includes('/node_modules/react-reconciler/') ||
            id.includes('/node_modules/its-fine/') ||
            id.includes('/node_modules/react-use-measure/') ||
            id.includes('/node_modules/zustand/')
          ) {
            return 'r3f'
          }

          if (
            id.includes('/node_modules/react-router/') ||
            id.includes('/node_modules/react-router-dom/')
          ) {
            return 'router'
          }

          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'react-vendor'
          }

          return undefined
        },
      },
    },
  },
})
