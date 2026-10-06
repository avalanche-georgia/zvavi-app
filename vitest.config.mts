import path from 'node:path'
import { defineConfig } from 'vitest/config'

const fromRoot = (relativePath: string) => path.resolve(import.meta.dirname, relativePath)

// Mirrors tsconfig `paths`. Order matters: the more specific `@/lib` must come before `@/`.
export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\/lib\//, replacement: `${fromRoot('src/lib')}/` },
      { find: /^@\//, replacement: `${fromRoot('src/app')}/` },
      { find: /^@data(?=\/|$)/, replacement: fromRoot('src/data') },
      { find: /^@domain(?=\/|$)/, replacement: fromRoot('src/domain') },
      { find: /^@ds\//, replacement: `${fromRoot('src/components/ds')}/` },
      { find: /^src\//, replacement: `${fromRoot('src')}/` },
    ],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
