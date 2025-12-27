import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  {
    ignores: ['scripts/**'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
  ),
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
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
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
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'off',
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
]
