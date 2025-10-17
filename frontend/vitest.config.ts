
import {defineConfig} from 'vitest/config';
export default defineConfig({
  test: {
    globals:true,
    environment:'jsdom',
    setupFiles: './src/setupTests.ts',
    include:['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
   // exclude: ['node_modules', 'dist', 'coverage', '.git'],
   coverage:{
    provider:"v8",
    reporter:['text','json','html'],
    exclude: ['node_modules/', 'dist/', 'coverage/', 'src/setupTests.ts', './eslint.config.ts', './vite.config.ts', './vitest.config.ts'],
   }
  },
})