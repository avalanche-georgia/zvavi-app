# Copilot Instructions

## Stack Versions

- **Next.js 16** (App Router) — not 14 or 15
- **React 19** (stable) — not 18
- **Tailwind CSS v4** — not v3
- **TypeScript 6**
- **next-intl v4**
- **Zod v4**

---

## Tailwind CSS v4 — Critical Differences from v3

This project uses **Tailwind v4**. Do not suggest v3 syntax.

**Data attribute variants** — no square brackets:
```tsx
// v4 ✅
'data-hover:bg-gray-100'
'data-focus:outline-2'
'data-disabled:opacity-50'
'data-checked:bg-primary'

// v3 ❌ — do not suggest
'data-[hover]:bg-gray-100'
'data-[focus]:outline-2'
'data-[disabled]:opacity-50'
'data-[checked]:bg-primary'
```

**CSS variable shorthand**:
```tsx
// v4 ✅
'h-(--radix-select-trigger-height)'
'w-(--breakpoint-md)'

// v3 ❌
'h-[var(--radix-select-trigger-height)]'
'w-[var(--breakpoint-md)]'
```

**Outline**:
```tsx
'focus:outline-hidden'  // v4 ✅  (was focus:outline-none in v3)
```

**Opacity shorthand**:
```tsx
'bg-black/3'   // v4 ✅  (was bg-black/[0.03] in v3)
'bg-white/8'   // v4 ✅  (was bg-white/[0.08] in v3)
```

**Border radius scale shifted**:
```tsx
'rounded-xs'  // v4 = old rounded-sm (2px)
'rounded-sm'  // v4 = old rounded (4px)
'rounded-md'  // v4 = old rounded-md (6px) — unchanged
```

**Class ordering** is enforced by `prettier-plugin-tailwindcss` (not eslint-plugin-tailwindcss). Classes are auto-sorted on format — do not manually reorder them.

**Config** lives in `src/app/globals.css` as a `@theme {}` block. There is no `tailwind.config.ts`.

---

## Translations (next-intl v4)

Always use `useTranslations()` without a namespace argument. Use the full key path:

```tsx
// ✅
const t = useTranslations()
t('admin.members.statuses.active')
t('common.actions.save')

// ❌ do not use namespace prefix
const t = useTranslations('admin.members')
t('statuses.active')
```

---

## Code Style

- **No semicolons** — Prettier enforces this
- **Arrow function components** — `const Foo = () => <div />`
- **Type imports** — `import type { Foo } from '...'` for type-only imports
- **Import order** — managed by `simple-import-sort`, auto-fixed on save
- **100 line limit** per `.tsx` file — split if larger
- **Object keys** — sorted alphabetically
- **JSX props** — sorted alphabetically (`key` and `ref` first)

## Zod v4

```ts
z.string({ error: () => ({ message: 'required' }) })  // ✅
z.string({ errorMap: () => ({ message: 'required' }) }) // ❌ v3 API
```

## UI Components

Migrating from Headless UI / Radix UI to **`@base-ui/react`**. Prefer base-ui for new components.
