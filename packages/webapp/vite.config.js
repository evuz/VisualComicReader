import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [reactRefresh()],
  optimizeDeps: {
    include: ['rxjs/operators'],
  },
  build: {
    outDir: 'build',
  },
})
