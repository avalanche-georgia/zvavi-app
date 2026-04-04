# CLAUDE.md

Developer and agent guide for the Zvavi avalanche forecasting app.

## Commands

```bash
pnpm dev              # dev server at http://localhost:3000
pnpm build            # convert-messages + production build
pnpm lint             # ESLint + Prettier (always run with --fix in CI/hooks)
pnpm convert-messages # compile messages/en/*.yml + messages/ka/*.yml → JSON
pnpm export-translations # export en.json + ka.json → messages/translations.csv
```

When fixing lint issues, run `npx eslint --fix` (not without `--fix`) to auto-resolve formatting and import sorting in one pass.

---

## Directory Map

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (public)/        # public routes (forecasts, about, auth, verify, …)
│   │   └── admin/           # protected admin routes (forecasts, members)
│   ├── api/notify/          # Telegram notification webhooks
│   ├── tanstack-query/      # QueryClient configuration + custom useQuery wrapper
│   └── routes.ts            # centralized route constants + builder helpers
├── components/
│   ├── features/            # feature-specific components (admin, forecast, members, …)
│   ├── ui/                  # reusable primitives (Button, Modal, Drawer, inputs, …)
│   ├── layout/              # Header, Footer, AdminSidebar, PageWrapper, …
│   ├── shared/              # cross-feature shared components
│   ├── hooks/               # useAuth, useBoolean, …
│   └── icons/               # SVG icon components
├── data/
│   ├── hooks/               # React Query hooks (forecasts/, members/)
│   ├── query-keys/          # cache key definitions
│   └── helpers/             # convertCamelToSnake, convertSnakeToCamel, handleSupabaseError, …
├── domain/
│   ├── types.ts             # all TypeScript type definitions
│   ├── constants.ts         # enums, label maps, date format strings
│   └── context/             # SupabaseContext provider + useSupabase hook
├── lib/
│   ├── supabase/            # client.ts, server.ts, middleware.ts
│   └── observability/       # error reporter
├── i18n/                    # next-intl config + routing setup
└── types/                   # shared TypeScript types
messages/
├── en/                      # YAML source files (English)
└── ka/                      # YAML source files (Georgian)
supabase/
└── migrations/              # SQL migrations (tables, enums, RPC functions)
```

---

## Key Patterns

### Data Flow
1. Page calls a data hook (`useForecastsQuery`, `useMembersQuery`, etc.)
2. Hook queries Supabase; response converted via `convertSnakeToCamel()`
3. Mutation hooks (`useForecastCreate`, `useMemberUpdate`, etc.) convert via `convertCamelToSnake()` before insert
4. On success, `queryClient.invalidateQueries(keys.all)` refreshes cache

### Form Pattern
- `react-hook-form` + `zodResolver` + `FormProvider`
- `getInitialFormData(item | null)` initializes form state from domain type or defaults
- `InputBlock` wraps label + input + error display
- `Controller` used for complex fields (DatePicker, Select, AspectSelector)
- A custom hook (e.g., `useMemberFormSubmit`, `useForecastFormSubmit`) handles submit logic, toasts, and navigation

### i18n Workflow
1. Edit YAML in `messages/en/` and/or `messages/ka/`
2. Run `pnpm convert-messages` to regenerate JSON bundles
3. Use `useTranslations()` (no namespace arg) with full key paths:
   ```tsx
   const t = useTranslations()
   t('admin.members.statuses.active')   // correct
   ```
   Never use `useTranslations('admin.members')` + short keys.

### Route Constants
All route paths live in `src/app/routes.ts`. Use the exported helpers instead of hardcoded strings:
```ts
routes.verify(code)
routes.admin.forecasts.edit(id)
```

### SVG Imports
```tsx
import MyIcon from '@assets/icons/my-icon.svg?component'  // React component
import iconUrl from '@assets/icons/my-icon.svg'            // static URL
```

### UI Components
Gradually migrating from Headless UI / Radix to **base-ui** (`@base-ui/react`). New components should use base-ui.

---

## Path Aliases (tsconfig)

| Alias | Resolves to |
|-------|-------------|
| `@/*` | `./src/app/*` |
| `@components/*` | `./src/components/*` |
| `@data/*` | `./src/data/*` |
| `@domain/*` | `./src/domain/*` |
| `@/lib/*` | `./src/lib/*` |
| `src/*` | `./src/*` |

No `@i18n` alias — use `src/i18n/navigation` directly.

---

## Code Style

- TypeScript + arrow-function React components
- Prettier: no semicolons, 2-space indent
- Files stay under ~100 logical lines; split if larger
- Import sorting via `simple-import-sort` (auto-fixed by `--fix`)
- Object/destructured keys sorted alphabetically
- JSX props sorted; `key` and `ref` reserved first
- Use `type` imports for type-only imports (`@typescript-eslint/consistent-type-imports`)
- Zod v4: use `{ error: () => ({ message: '...' }) }` not `{ errorMap: ... }`
- For DB inserts use `convertCamelToSnake` from `@data/helpers`

---

## Commit Messages

Conventional commit format: `feat(scope): summary`, `fix:`, `refactor:`, `chore:`, etc.
Imperative subject; reference issues/PRs when applicable.

---

## Security

- Secrets in `.env.local` only — never commit Supabase keys or service tokens
- Access env values via `process.env`
- Regenerate locale bundles (`pnpm convert-messages`) and sync Supabase config before merging
