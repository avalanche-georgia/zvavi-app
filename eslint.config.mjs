import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Raw Tailwind palette classes (`bg-gray-100`, `text-red-500`, …) — banned in the design system
const rawPaletteClass =
  '/\\b(bg|text|border|ring|outline|fill|stroke|from|via|to|divide|placeholder|decoration|shadow|caret)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\\d/'
// Arbitrary values that should be tokens: hex colours, font sizes, radii, shadows
const arbitraryTokenValue = '/(\\[#[0-9a-fA-F]{3,8}\\]|\\b(text|rounded|shadow)-\\[)/'

const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  {
    ignores: ['scripts/**'],
  },
  // Next.js flat configs (react, react-hooks, jsx-a11y, @typescript-eslint, import all included)
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Legacy configs that don't conflict with the above
  ...compat.extends('eslint:recommended', 'plugin:prettier/recommended'),
  {
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
      'sort-destructure-keys': sortDestructureKeys,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      'import/extensions': 'off',
      'import/no-cycle': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'no-import-assign': 'off',
      'no-param-reassign': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: ['block-like', 'const', 'let'],
        },
        {
          blankLine: 'any',
          next: ['const', 'let'],
          prev: ['const', 'let'],
        },
        {
          blankLine: 'always',
          next: ['block-like', 'return'],
          prev: '*',
        },
      ],
      'prettier/prettier': 'error',
      'react/destructuring-assignment': 'off',
      'react/forbid-prop-types': 'off',
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.tsx'],
        },
      ],
      'react/jsx-props-no-spreading': [
        2,
        {
          html: 'ignore',
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          reservedFirst: ['key', 'ref'],
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      semi: ['error', 'never'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^@?\\w'],
            ['^@/.*(constants|helpers|hooks)(/.*|$)', '^\\.\\/.*(constants|helpers|hooks)(/.*|$)'],
            [
              '^@/.*(common|components|assets)(/.*|$)',
              '^\\.\\/.*(common|components|assets)(/.*|$)',
              '^\\.\\/.*',
              '^../.*',
            ],
            ['^import\\s+type', '^import.*\\{.*type.*\\}.*from'],
          ],
        },
      ],
      'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: true }],
      'sort-keys': ['error', 'asc'],
      'sort-keys-fix/sort-keys-fix': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'max-lines': [
        'error',
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
  {
    // Design-system guardrails — see DESIGN_SYSTEM.md
    files: ['src/components/ds/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@components/ui', '@components/ui/*', '@components/features/*', '**/ui/*'],
              message: 'ds must not depend on the legacy kit or on features.',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        ...['Literal[value={regex}]', 'TemplateElement[value.raw={regex}]'].flatMap((selector) => [
          {
            message:
              'Use semantic colour tokens (ink, muted, rule, accent, …) instead of the raw palette.',
            selector: selector.replace('{regex}', rawPaletteClass),
          },
          {
            message:
              'Use a token (text-*, rounded-*, shadow-*, colour) instead of an arbitrary value.',
            selector: selector.replace('{regex}', arbitraryTokenValue),
          },
        ]),
      ],
    },
  },
]
