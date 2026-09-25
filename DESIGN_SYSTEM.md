# Design System

The architecture of the Zvavi UI kit (`ds`) and the long-running plan to migrate away from the legacy
kit (`src/components/ui`). **Read this before any UI task.** Every task that touches UI should leave
the codebase a little closer to the end state described here.

---

## Why

The legacy kit grew ad hoc:
- It mixes three headless libraries: Headless UI, Radix and base-ui.
- It uses raw Tailwind palette classes (`gray-*`, `red-*`, …) and arbitrary values (`text-[13px]`,
  `rounded-[11px]`) instead of tokens.
- Its controls are 32px tall and don't link labels to inputs.

New designs, starting with the submit-observation redesign, need components the legacy kit doesn't
have. Restyling the legacy kit in place would change every admin form at once, so we build a new kit
next to it and migrate screen by screen.

---

## Architecture

### Location and coexistence

```
src/components/
├── ds/                  # new kit — the only place new generic UI goes
│   ├── primitives/      # Button, TextField, Textarea, Field, ChipGroup, SegmentedControl,
│   │                    # Stepper, ToggleGrid, Badge, …
│   ├── patterns/        # FormCard, StickyActionBar, SuccessState, UnitInput, OverlayButton, …
│   └── form/            # react-hook-form bindings: FormChipGroup, FormStepper, FormTextField, …
├── ui/                  # legacy kit — frozen, deleted piece by piece
└── features/            # domain components, built from ds
```

- Import through the `@ds/*` alias.
- `ui/` is **frozen**:
  - Don't add components to it.
  - Don't restyle its components.
  - Don't add variants to them.
  - A legacy export gets `@deprecated` (pointing to its replacement) as soon as its ds replacement
    exists. Deprecating before a replacement exists only adds editor noise.
- Code in `ds/` must never import from `ui/` or `features/`. ESLint enforces this, and also bans raw
  palette classes and arbitrary token values inside `ds/` (see `eslint.config.mjs`).
- Each component gets its own folder: `ds/primitives/Button/{Button.tsx, Button.gallery.tsx, index.ts}`.
- When `ui/` is empty, `ds` is simply the kit. There is no final rename.

### Tiers

| Tier | What it is | May know about |
|---|---|---|
| **Primitive** (`ds/primitives`) | A single generic control. Controlled (`value` / `onChange`). base-ui provides the behaviour. | Tokens only |
| **Pattern** (`ds/patterns`) | A generic arrangement of primitives (a card with header, a sticky action bar) | Primitives |
| **Form binding** (`ds/form`) | A thin `useController` wrapper around a primitive + its `Field`: wires `value`/`onChange` and the translated error (via `useFieldError`) | react-hook-form, app hooks |
| **Domain component** (`features/*`) | Anything that knows about avalanches, regions or observations (SizePicker, aspect/elevation picker, LocationMap, PhotoGrid) | Everything above |

Rule of thumb: if a component would make sense in an unrelated app, it goes in `ds`. Otherwise it goes
in `features`.

### Library

- **base-ui (`@base-ui/react`)** for all interactive behaviour: Field, ToggleGroup, NumberField, Tabs,
  Dialog, Popover, Select, Menu, and so on.
- No new Headless UI or Radix usage.
- Existing exceptions stay until their migration phase:
  - vaul (Drawer). Base-ui portals inside a vaul Drawer break on mobile; see memory
    `feedback_vaul_baseui_portal`.
  - react-day-picker (Calendar)
  - @dnd-kit (sortable lists)
  - sonner (toasts)
  - react-leaflet (maps)

### Variants

- Variants are typed `Record` maps merged with `cn()`, the same pattern as today's `Button`.
- We don't use `cva` for now. `cn()` only merges classes and resolves conflicts; the `Record` maps
  describe the variants.
- Revisit `cva` once components start needing compound variants (variant × size combinations with
  their own styles) or many variant axes.

```ts
type ButtonVariant = 'ghost' | 'primary' | 'text'
type ButtonSize = 'lg' | 'md' | 'sm'

const variantClasses: Record<ButtonVariant, string> = { … }
const sizeClasses: Record<ButtonSize, string> = { … }

className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
```

---

## Tokens

All tokens live in the `@theme` block of `src/app/globals.css`. Tailwind v4 generates utilities from
them.

| Layer | Tokens | Utilities |
|---|---|---|
| **Semantic colour** | text `ink`, `body`, `muted`, `placeholder`, `disabled` · lines `rule`, `rule-strong` · surfaces `surface`, `canvas`, `tile`, `tile-hover`, `off`, `map` · brand `primary(-hover/-soft/-ink)`, `brand-blue` · `accent(-hover/-soft)` · status `danger`, `danger-border`, `success`, `success-soft` · domain `hazard-*`, `size-*` | `text-ink`, `bg-surface`, `border-rule`, … |
| **Type scale** | `title-lg` 28, `title` 24, `heading` 17, `copy-lg` 15, `copy` 14, `copy-sm` 13, `caption` 12.5, `micro` 10.5. Line-height and tracking are part of the token | `text-heading`, … |
| **Radii** | `card` 16, `media` 12, `field` 11, `control` 10, `badge` 5 (pills use `rounded-full`) | `rounded-card`, … |
| **Shadows** | `raised` (segmented thumb), `overlay` (map buttons), `float` (sticky bar), `pin` | `shadow-float`, … |
| **Focus** | `focus-ring` utility: 2px accent outline, 2px offset, on `:focus-visible` | `focus-ring` |

- **There is no raw-palette layer yet.** Semantic tokens hold the hex values directly. A primitive
  layer only pays off with theming (dark mode, a second brand); add it then.
- **Control heights are not tokens.** Each primitive's `size` map sets them with the spacing scale
  (`h-10`, `h-11.5`, `h-12.5`), so the primitive itself is the source of truth.
- The type scale merges near-duplicate sizes from handoffs: 13.5 → 13, 14.5 → 14, 15.5 → 15.
- **Adding a type, radius or shadow token:** also add its name to `src/lib/designTokens.ts`.
  `cn()` (tailwind-merge) needs the name there, or it treats `text-title` as a colour and drops it
  when merged with `text-ink`. The gallery lists tokens from the same file.

Rules:
- Components in `ds/` use **semantic and scale tokens only**:
  - no raw palette classes (`gray-500`)
  - no hex values
  - no arbitrary sizes like `text-[13px]`
- If a value is missing, add a token rather than an arbitrary value.
- **Accent** (`--color-accent`, brand blue `#0c5aa6`) is the one colour for selected states, links,
  text buttons and focus rings.
- **Primary** (brand orange) is for the main call to action and for brand moments.

---

## Component rules

- **Hit targets are at least 44×44px** on touch.
  - This matches Apple HIG and WCAG 2.5.5 (AAA). WCAG 2.5.8 (AA) sets 24px as the floor.
  - Our users often report from the field with gloves or cold hands.
  - Visually smaller controls must extend their hit area, for example with an invisible `::before`.
- **Focus ring:** a 2px accent outline with a 2px offset on every interactive element, using
  `focus-visible` rather than `focus`.
- **Labels:**
  - Every input gets a real `<label>`, via base-ui `Field.Label`.
  - Hints and errors are linked through `aria-describedby`, and errors set `aria-invalid`.
- **Errors:** form bindings render `data-field-error`, so `useScrollToFirstError` keeps working.
- **i18n:** components take their strings as props, and callers translate them with the project rules.
  `ds/` primitives never call `useTranslations()` themselves.
- **Keep files under ~100 lines.** Split sub-parts into their own files.
- **Gallery:** every ds component gets a `<Name>.gallery.tsx` demo next to it, covering all variants
  and states (default, hover, focus, selected, disabled, error). Register it in
  `src/components/features/admin/DesignSystemGallery/entries.ts`. The gallery is at `/admin/ds`, linked
  from the admin sidebar in local dev. Demo copy is English-only fixture text; it's developer tooling.

---

## Legacy policy (day-to-day)

- **New screen or redesign:** use ds only. If something is missing, build it in `ds/` first as its own
  commit or PR.
- **Small fix in a legacy screen:** keep using the legacy component. Don't migrate as a side quest
  unless the swap is trivial and the result is visually identical, or the redesign asks for it.
- **Migrating a component:** migrate one screen area at a time (see the phases below). Remove the
  legacy component once `grep` finds no consumers left, and tick it off in the tracker.
- **When editing any file:** replace `clsx` with `cn` (existing rule).

---

## Migration plan

| Phase | Scope | Status |
|---|---|---|
| **1. Foundation** | Tokens, Inter 700 as `font-sans`, `globals.css` cleanup (dead Arial rule, border default → `rule`), accent → `#0c5aa6`, `@ds/*` alias, `cn()` aware of custom tokens, lint rules, gallery page with tokens | ✅ |
| **2. Primitives for submit** | Button, Badge, Field / FieldGroup, TextField, NumberField, Textarea, ChipGroup, ToggleGrid, SegmentedControl, Stepper. Patterns FormCard, StickyActionBar, SuccessState. Form bindings. Gallery demos | ✅ |
| **3. Submit page redesign** | `local/observations/design_handoff_submit_observation/` built on ds | ✅ |
| **4. Rest of observations** | List toolbar, detail views, aspect/elevation picker moved to `features/` with a bare variant | ☐ |
| **5. Legacy, by screen area** | Public pages (auth, forecasts, about) → admin forms → admin tables, modals and drawers | ☐ |
| **6. Cleanup** | Delete `ui/`. Remove `@headlessui/react`, `@radix-ui/*` and `clsx` | ☐ |

### Component tracker

Update this table when a legacy component's last consumer is migrated.

| Legacy (`ui/`) | Library | ds replacement | Removed |
|---|---|---|---|
| Button (+ `shared/ButtonLink`) | Headless UI | `primitives/Button` | ☐ |
| InputBlock | — | `primitives/Field` | ☐ |
| TextInput, SearchInput | Headless UI | `primitives/TextField` | ☐ |
| Textarea | Headless UI | `primitives/Textarea` | ☐ |
| NumberInput | base-ui | `primitives/Stepper` / `TextField` | ☐ |
| ChipGroup | base-ui | `primitives/ChipGroup` | ☐ |
| SegmentedControl | base-ui | `primitives/SegmentedControl` | ☐ |
| RadioGroup, RadioOption | Headless UI / base-ui | `primitives/RadioGroup` or `ToggleGrid` | ☐ |
| Checkbox | Headless UI | `primitives/Checkbox` | ☐ |
| Switch | base-ui | `primitives/Switch` | ☐ |
| Select | Radix | `primitives/Select` (base-ui) | ☐ |
| DatePicker, Calendar, TimeInput, TimePicker, DatePickerTimeInput | Headless UI + react-day-picker | `primitives/DateField` (TBD) | ☐ |
| Modal | Headless UI | `primitives/Dialog` (base-ui) | ☐ |
| Popover | Radix | `primitives/Popover` (base-ui) | ☐ |
| Tooltip, InfoIcon | Radix | `primitives/InfoTip` (base-ui Popover); a plain Tooltip TBD | ☐ |
| DropdownMenu | base-ui | `primitives/Menu` | ☐ |
| Drawer, Sheet | vaul / base-ui | `patterns/Sheet` (TBD) | ☐ |
| IconButton | custom | `primitives/IconButton` | ☐ |
| Alert | custom | `patterns/Alert` | ☐ |
| Spinner, Skeleton | custom | `primitives/Spinner`, `Skeleton` | ☐ |
| Pagination, DataTable | custom | `patterns/…` | ☐ |
| AspectElevationPicker | base-ui | moves to `features/observations/` | ☐ |
| MiniCompass | custom | moves to `features/` | ☐ |
| AutoScrollList, BrandedQRCode, FallbackImage, SortableItem | custom | reviewed individually (may stay generic in ds) | ☐ |

Non-kit Headless UI and Radix users also block Phase 6:
- `shared/Spoiler`
- `SetNewPasswordForm`
- the auth login and forgot-password pages
- `Header/NavMenu/DesktopNav`
- `shared/LanguageToggle`

### Deferred

- **Storybook** replaces the gallery page later. It's tracked in `local/tech-debt.md`.
