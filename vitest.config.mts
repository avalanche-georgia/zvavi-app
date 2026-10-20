import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// Vercel builds with NODE_ENV=production, and Vitest keeps a value that's already
// set. React's production build has no act(), so every render would fail there.
process.env.NODE_ENV = 'test'

export default defineConfig({
  // Next compiles JSX itself (tsconfig "preserve"); tests need the React 17+ runtime
  esbuild: { jsx: 'automatic' },
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
