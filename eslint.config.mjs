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
// Arbitrary values that should be tokens: hex colours, font sizes, radii, shadows, fixed control
// sizes (`h-[42px]`). Viewport / safe-area maths (`h-[94dvh]`) has no token and stays allowed
const arbitraryTokenValue =
  '/(\\[#[0-9a-fA-F]{3,8}\\]|\\b(text|rounded|shadow)-\\[|\\b(w|h|size|min-w|min-h|max-w|max-h)-\\[\\d+(\\.\\d+)?(px|rem)\\])/'
// Tailwind's default type and radius scales — not ds tokens (rounded-full / rounded-none are fine)
const defaultScaleClass =
  '/\\b(text-(xs|sm|base|lg|xl|[2-9]xl)|rounded-(xs|sm|md|lg|xl|2xl|3xl))\\b/'
// Colour functions in class strings or styles — colours come from tokens
const colourFunction = '/\\b(rgba?|hsla?|oklch)\\(/'
// Shared by both ds import blocks below (a later block replaces the rule's options, not merges them)
const dsImportPatterns = [
  {
    group: ['@components/features/*'],
    message: 'ds must not depend on features.',
  },
  { group: ['clsx'], message: 'Use cn() from @/lib/utils.' },
]

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
    // Feature code speaks the ds vocabulary too (DESIGN_SYSTEM.md → Tokens). ds has its own,
    // stricter block below; colour functions stay allowed here (map markers, brand gradients)
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/ds/**', '**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...['Literal[value={regex}]', 'TemplateElement[value.raw={regex}]'].flatMap((selector) => [
          {
            message: 'Use semantic colour tokens (ink, muted, rule, accent, …) instead of the raw palette.',
            selector: selector.replace('{regex}', rawPaletteClass),
          },
          {
            message: 'Use a ds token (text-caption, text-copy, rounded-card, …) instead of the Tailwind default scale.',
            selector: selector.replace('{regex}', defaultScaleClass),
          },
          {
            message: 'Use a token (text-*, rounded-*, shadow-*, colour) instead of an arbitrary value.',
            selector: selector.replace('{regex}', arbitraryTokenValue),
          },
        ]),
      ],
    },
  },
  {
    // Design-system guardrails — see DESIGN_SYSTEM.md
    files: ['src/components/ds/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        { format: ['camelCase', 'PascalCase'], selector: 'variable' },
      ],
      'no-restricted-imports': ['error', { patterns: dsImportPatterns }],
      'no-restricted-syntax': [
        'error',
        {
          message: "Use the global React.* namespace for types, not a type import from 'react'.",
          selector:
            "ImportDeclaration[source.value='react'][importKind='type'], ImportDeclaration[source.value='react'] > ImportSpecifier[importKind='type']",
        },
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
          {
            message: 'Use a colour token instead of rgb() / hsl().',
            selector: selector.replace('{regex}', colourFunction),
          },
        ]),
      ],
    },
  },
  {
    // ds components take their strings as props; only form bindings and gallery demos may translate
    files: ['src/components/ds/**/*.{ts,tsx}'],
    ignores: ['src/components/ds/form/**', 'src/components/ds/**/*.gallery.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...dsImportPatterns,
            { group: ['next-intl'], message: 'ds components take translated strings as props.' },
          ],
        },
      ],
    },
  },
  {
    // A test file lists one case after another; a test harness passes props through
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'max-lines': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
]
