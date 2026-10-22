# Design System

The architecture of the Zvavi UI kit (`ds`) and the record of the migration away from the legacy
kit (`src/components/ui`, now removed). **Read this before any UI task.** Every task that touches UI
should leave the codebase a little closer to the end state described here.

---

## Why

The legacy kit (removed) grew ad hoc:
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
│   ├── primitives/      # Button, Badge, Checkbox, Field, FieldGroup, TextField, NumberField, FallbackImage,
│   │                    # Textarea, ChipGroup, ToggleGrid, SegmentedControl, Select, Stepper, InfoTip,
│   │                    # IconButton, RatingScale, Menu, Pagination, SearchField,
│   │                    # StatusPill, CountBadge, Skeleton, Spinner, AvalancheLoader, Dialog (+ DialogList),
│   │                    # RadioGroup, Popover, Calendar, DatePicker, DateRangePicker, TimeField, MultiChipGroup
│   ├── patterns/        # ClampedText, ContentCard, FormCard, StickyActionBar, SuccessState, DataTable, LoadingState,
│   │                    # ConfirmDialog, FooterActions, Sheet, Drawer, QuickDateField, SortableItem
│   └── form/            # react-hook-form bindings: FormTextField, FormTextarea, FormNumberField,
│                        # FormStepper, FormChipGroup, FormRadioGroup, FormCheckbox, FormSwitch, FormSelect, FormDateField,
│                        # useFormFieldError
└── features/            # domain components, built from ds
    └── admin/shared/    # admin-wide building blocks that need translations or routing, so they
                         # can't live in ds: list toolbar pieces, URL list state, RecordMenu,
                         # record / form sheets (URL selection, unsaved-input confirmation)
```

- Import through the `@ds/*` alias.
- Code in `ds/` must never import from `features/`. ESLint enforces this, and also bans raw
  palette classes and arbitrary token values inside `ds/` (see `eslint.config.mjs`).
- Each component gets its own folder: `ds/primitives/Button/{Button.tsx, Button.gallery.tsx, index.ts}`.
- App-specific pieces that need app assets or translations live in `components/shared`, not `ds`
  (e.g. `BrandedQRCode`, which carries our logo).

### Tiers

| Tier | What it is | May know about |
|---|---|---|
| **Primitive** (`ds/primitives`) | A single generic control, always controlled: `value` + `onValueChange` for inputs (`onChange` for choice groups, `onCheckedChange` for Checkbox). base-ui provides the behaviour. | Tokens only |
| **Pattern** (`ds/patterns`) | A generic arrangement of primitives (a card with header, a sticky action bar) | Primitives |
| **Form binding** (`ds/form`) | A thin `useController` wrapper around a primitive + its `Field`: wires `value`/`onChange` and the translated error (via `useFormFieldError`, which wraps `@components/hooks` `useFieldError`) | react-hook-form, app hooks |
| **Domain component** (`features/*`) | Anything that knows about avalanches, regions or observations (SizePicker, aspect/elevation picker, LocationMap, PhotoGrid) | Everything above |

Rule of thumb: if a component would make sense in an unrelated app, it goes in `ds`. Otherwise it goes
in `features`.

### Library

- **base-ui (`@base-ui/react`)** for all interactive behaviour: Field, ToggleGroup, NumberField, Tabs,
  Dialog, Popover, Select, Menu, and so on.
- No Headless UI or Radix: both were removed with the legacy kit.
- **react-day-picker** for the month grid, only behind ds `primitives/Calendar`. base-ui has no
  calendar yet; when it ships, only that component changes. Pass `locale` from
  `react-day-picker/locale` (it carries translated aria labels, Georgian included).
- Other libraries, each behind one ds or shared component:
  - @dnd-kit (sortable lists, `patterns/SortableItem`)
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
| **Semantic colour** | text `ink`, `body`, `muted`, `placeholder`, `disabled` · lines `rule`, `rule-strong` · surfaces `surface`, `canvas`, `tile`, `tile-hover`, `off`, `map` · brand `primary(-hover/-soft/-ink)`, `brand-blue` · `accent(-hover/-soft)` · status `danger`, `danger-border`, `success`, `success-soft`, `warning`, `warning-soft`, `alert-ink` · domain `hazard-*`, `size-*` | `text-ink`, `bg-surface`, `border-rule`, … |
| **Type scale** | `display` 34, `title-lg` 28, `title` 24, `title-sm` 22, `heading` 17, `copy-lg` 15, `copy` 14, `copy-sm` 13, `caption` 12.5, `micro` 10.5. Line-height (whole pixels, so nothing below lands on a fraction of a pixel) and tracking are part of the token | `text-heading`, … |
| **Letter spacing** | `eyebrow` 0.06em (uppercase eyebrows and small labels) | `tracking-eyebrow` |
| **Radii** | `card` 16, `media` 12, `field` 11, `control` 10, `item` 8 (options and segments inside a padded popup or track), `badge` 5, `bar` 3 (bar-scale segments), `sheet` 20 (pills use `rounded-full`) | `rounded-card`, … |
| **Shadows** | `raised` (segmented thumb), `overlay` (map buttons), `float` (sticky bar), `pin`, `menu`, `sheet` (bottom sheet), `panel` (desktop side panel) | `shadow-float`, … |
| **Motion** | `sheet` easing (sheet slide in / out) | `ease-sheet` |
| **Focus** | `focus-ring` utility: 2px accent outline, 2px offset, on `:focus-visible` | `focus-ring` |
| **Empty slot** | `border-slot` utility: 1.5px dashed border (empty lists, drop zones); colour from `border-*` | `border-slot` |

- **There is no raw-palette layer yet.** Semantic tokens hold the hex values directly. A primitive
  layer only pays off with theming (dark mode, a second brand); add it then.
- **Control heights are not tokens.** Each primitive's `size` map sets them with the spacing scale
  (`h-10`, `h-11.5`, `h-12.5`), so the primitive itself is the source of truth.
- The type scale merges near-duplicate sizes from handoffs: 13.5 → 13, 14.5 → 14, 15.5 → 15.
- **Adding a type, radius, shadow or tracking token:** also add its name to `src/lib/designTokens.ts`.
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

- **One row, one height.** Controls that share a row (a toolbar, a filter bar) use the same size,
  so their edges line up: admin list toolbars `md` (46px), public filter bars `sm` (40px), chips 40px.
  This holds in admin too — admin is lower priority for polish effort, not exempt from the system.
  `sm` controls (40px: buttons, segments, chips, fields, selects) set text at 13px on phones and
  14px from `sm` (640px): one size per row on every screen, and long Georgian labels fit at 375px.
- **Hit targets are at least 44×44px** on touch.
  - This matches Apple HIG and WCAG 2.5.5 (AAA). WCAG 2.5.8 (AA) sets 24px as the floor.
  - Our users often report from the field with gloves or cold hands.
  - Exception: chips are 40px on every pointer (owner's call — 44px rows of chips looked too heavy;
    a hit-area `::after` gets clipped in sideways-scrolling chip rows).
  - Visually smaller controls extend their hit area **on touch screens only**, with the
    `pointer-coarse:` variant (e.g. `after:absolute pointer-coarse:after:-inset-3`). With a mouse the
    hit area hugs the visible control; an invisible margin there makes the cursor flip to a pointer
    far away from it.
- **Focus ring:** a 2px accent outline with a 2px offset on every interactive element, using
  `focus-visible` rather than `focus`.
- **Labels:**
  - Every input gets a real `<label>` via base-ui `Field.Label`; groups get a `<fieldset>` + legend.
  - Hints, descriptions and errors are linked through `aria-describedby`. Inputs inside `Field` also
    get `aria-invalid`.
  - Required: text inputs carry `required` themselves. Groups (`FieldGroup`) and cards (`FormCard`)
    can't, so they announce it through `requiredText` (visually hidden, after the label).
  - A flow that replaces itself (e.g. `SuccessState`) moves focus to its new heading.
- **Errors:** form bindings render `data-field-error`, so `useScrollToFirstError` keeps working.
- **Buttons** (`primitives/Button`) — pick the variant by role and the size by placement, never by look:
  - `primary`: the one main action of a footer or bar (Save, Done, Create & link, Link avalanches).
    At most one per footer.
  - `secondary`: every other boxed action (Cancel, Keep editing, Edit, Add …).
  - `danger`: confirming a destructive action (Remove, Unlink, Discard, Delete). The button that only
    *asks* (a trash / unlink icon, a "Delete" that opens a confirmation) stays quiet: `IconButton
    tone="danger"` or `secondary`.
  - `text`: an inline link-style action inside content (e.g. "Set overall to 1").
  - `disclosure`: shows or hides more of the content in place ("Read more" / "Show less"). Ink with a
    quiet underline, so it reads as part of the text rather than a link. Use it through
    `patterns/ClampedText`, which only shows it when the text is actually cut.
  - `inverse`: a secondary action on a dark (`bg-ink`) surface.
  - A router link that acts as a button uses `getButtonClasses({ variant, size })` — same variants,
    no restyling.
  - Size `md` in sheet footers and sticky action bars; `sm` inside content (section headers, cards,
    empty states, confirmation popovers).
  - Dismiss before confirm, right-aligned: `[Cancel] [Primary]`. Sheet / panel footers use
    `patterns/FooterActions`: buttons always on the right, an optional hint on the left — on its own
    line above the buttons when the footer is narrow.
  - No colour or height overrides through `className` — add a variant instead.
- **Selects** (`primitives/Select`): size `md` in forms; in a toolbar, the row's size (see "One row,
  one height"). TextField and SearchField take the same `size`. `isActive` gives the accent border while the select narrows a list down. "All …"
  options use a sentinel value (e.g. `'all'`); `onValueChange` never passes `null`.
- **Popovers** (`primitives/Popover`): for content that needs more room than a menu — a `Calendar`,
  a short form. Pass `isOpen` / `onOpenChange` when a Done button inside closes it.
- **Dates** (`primitives/DatePicker`): every single date or date + time field. It shows the date in the
  page's language, `min` / `max` bound the calendar, `clearLabel` adds a ×, `todayLabel` a "Today"
  shortcut, `withTime` (with `timeLabel`) a 24-hour time input (a new date starts at `defaultTime`).
  Form bindings pass `ref` and `onBlur` through, so react-hook-form can focus it on an error;
  `useDatePickerText()` (`@components/hooks`) gives the translated labels and the `locale`.
- **Date ranges** (`primitives/DateRangePicker`): every from–to filter, one field instead of two. The
  value is `{ from, to }` as `yyyy-MM-dd` (either may be `null`). The popup shows quick ranges
  (`presets`; tapping the active one clears it), the From and To ends (the highlighted one is set by
  the next click; tap the other to switch; each clears on its own, so "from a date" and "up to a date"
  need no extra mode) and a range calendar (two months from 640px). `isActive` while it filters,
  `formatValue` for the page's own text (e.g. a month's name). `useDateRangePickerText()` gives the
  labels and `locale`.
- **Times** (`primitives/TimeField`): every time input, always 24-hour. A list in `step`-minute steps
  (30 by default) that narrows as you type; the colon goes in as the hour is complete ("1234" reads
  "12:34", "930" reads "9:30"), and the typed time applies on Enter or leaving the field. The DatePicker's `withTime` uses it. Never a native `type="time"` input: it
  follows the browser's 12 / 24-hour setting.
- **"When" fields** (`patterns/QuickDateField`): a date (+ time) with shortcuts under it and the
  picked date in words (`useDateSummary()`), e.g. a forecast's valid-until (Tomorrow / In 2 days)
  and an observation's date (Today / Yesterday / Not sure). `withTime` makes the time required;
  the `time` slot takes an optional `TimeField` instead. New "when" questions use it too.
- **Georgian time**: `DatePicker` with `withTime` holds a moment and shows / sets it in Georgian time; without
  a time it holds a calendar day. `DatePicker` and `DateRangePicker` default "today" to Georgia's
  (`getTbilisiToday`); pass `max={getTbilisiTodayIso()}` for "not in the future". See CLAUDE.md.
- **Calendar** (`primitives/Calendar`): weeks start on Monday. A bare `Calendar` is for custom panels;
  its "today" is the browser's, so pass `today={getTbilisiToday()}`.
- **Menus** (`primitives/Menu`): `align` picks the trigger edge (`end` for overflow menus, `start`
  for nav dropdowns). Navigation rows pass `render={<Link href=… />}` to `MenuItem`; `isActive`
  marks the current page.
- **Sheets** (`patterns/Sheet`): bottom sheet on mobile, side panel from `lg`. `isTall` fixes the
  mobile height; `isWide` widens the desktop panel (`w-160` instead of `w-120`) for records with more
  to lay out side by side, e.g. a member's facts and QR code. No width overrides through `className`.
- **Dialogs** (`primitives/Dialog`) are closable by default: ×, backdrop and Esc (`closeLabel` and
  `onOpenChange` required). `isWide` (`w-160` instead of `w-120`) for long reading. `isCloseDisabled`
  only for a required acknowledgement (the first-visit disclaimer): no ×, backdrop and Esc do nothing,
  only its own footer button closes it. `isBusy` while its action runs: nothing closes it (× disabled,
  backdrop and Esc ignored); `ConfirmDialog` sets it for you while `onConfirm`'s promise runs.
- **Drag to reorder** (`patterns/SortableItem`): the lifted row gets a `primary` ring; give the item
  its row's radius (a flat list row rounds only while lifted: `data-dragging:rounded-media`). There is
  no separate drop-target highlight: the other rows move aside as you drag, which shows the spot.
- **Sheets vs dialogs when closing**: `Sheet`'s `isDismissible={false}` only stops the backdrop and
  swipe (unsaved input; ✕ / Cancel / Esc then ask to discard). `Dialog`'s `isBusy` / `isCloseDisabled`
  block every way out, Esc included.
- **Confirming a destructive action** (delete, remove, unlink, discard unsaved input) — always asked,
  never replaced by an Undo, never swapped inline into a footer or action bar:
  - An icon button that asks (trash / unlink on a card): wrap it in `primitives/ConfirmPopover`. It
    opens right at the click, starts focus on Cancel; Esc, an outside click or another one closes it.
  - Anything else (menu items, text buttons, a sheet's ✕ / Cancel / Esc / Back with unsaved input):
    `ConfirmationDialog` from `@components/shared` — centred, so it can't be missed. Pass a `type`
    and the handlers; texts only to be more specific than the defaults
    (`common.confirmation.<type>`):
    ```tsx
    <ConfirmationDialog
      isOpen={isOpen}
      message={t('admin.forecasts.deleteMessage', { id })}
      onCancel={close}
      onConfirm={remove}
      title={t('admin.forecasts.deleteTitle', { id })}
      type="delete"
    />
    ```
    | `type` | Tone | For |
    |---|---|---|
    | `delete` | danger | deleting a saved record |
    | `discard` | warning | dropping unsaved input (sheet close, form Cancel) |
    | `leave` | warning | leaving a page with a filled-in form |
    | `publish` | info | making something public |
    | `confirm` | info | anything else weighty (the default) |

    Look (`patterns/ConfirmDialog` on `primitives/Dialog`): a white header with the tone tile, the
    title and ×; the body on `bg-canvas` between rules; a white footer with [Cancel] [Confirm]. The
    tile names the dialog's **type, never the action** — danger octagon, warning triangle, info
    circle. Danger is any destructive or irreversible step (delete, unpublish, revoke), with a
    danger button; warning and info use the primary button. Focus starts on Cancel for danger and
    warning, on Confirm for info. Below `sm` it's a bottom sheet with full-width stacked buttons,
    primary on top.

    Texts: the **title is the action** ("Delete forecast #180"; a "?" only for warning questions —
    "Discard unsaved changes?"), the **body its consequence** (end irreversible ones with "This
    can't be undone."; names and counts in `<b>`), the confirm button the **verb** ("Delete").
    `children` replace the message for rich content: several paragraphs, a `ConfirmationList` of the
    records the action touches (links + muted meta, five shown, then "+N more"), or a summary.
    Inside a Sheet render it within the sheet (e.g. in its footer) so it nests: Esc closes only the
    dialog. For an async action, return its promise from `onConfirm`: Confirm spins with its "…ing"
    label and nothing dismisses the dialog until it settles; resolved → closes, rejected → stays
    open (delete handlers toast the reason, then rethrow). A new kind of confirmation is a new
    `type` in `confirmationTypes.ts`, not a one-off. `patterns/ConfirmDialog` takes every label as a
    prop and stays translation-free.
- **Icon-only buttons** (`primitives/IconButton`) always show their label as a `Tooltip` on hover and
  keyboard focus (pass `tooltip` for a shorter label than the accessible name). Tooltips don't show
  on touch, so the icon must be clear without it.
- **Loading indicators** — pick by what is loading, never invent another:
  - A page, route fallback or any block (map, list, panel, sheet body, table): the mountain loader.
    In features use `Loading` from `@components/shared` (translated, `isPage` for a whole page); in
    `ds/` use `patterns/LoadingState`. Both render `primitives/AvalancheLoader` (sizes `sm` 40px, `md`
    64px, `lg` 112px). Fit it to the space with `className` (e.g. `h-60 py-0`), never by restyling the
    loader.
  - Inline and tiny (button busy state, menu row, "load more" trigger, a link pending): `primitives/Spinner`,
    or `Button`'s `isBusy`. The mountain is unreadable below ~40px.
  - The final layout is known (cards, rows, metrics): `primitives/Skeleton`.
  - Measurable progress (an upload): a progress ring, not either of the above.
  - Never put `animate-spin` (or any animation) on an `<svg>` itself — spin a wrapping `<span>`, as
    `Spinner` does. Chrome repaints an animated `<svg>` on every frame, and while the page repaints
    like that it now and then shows a stale frame of a hover background mid-transition (it runs
    those on the GPU): hover backgrounds blink. `AvalancheLoader` animates inside its SVG and still
    does this while it's on screen.
  - No bare `LoaderIcon` + `animate-spin` for a block. Colours are the `snow-*` / `rock-*` tokens.
- **i18n:** components take their strings as props, and callers translate them with the project rules.
  `ds/` primitives never call `useTranslations()` themselves.
- **Keep files under ~100 lines.** Split sub-parts into their own files.
- **Gallery:** every ds component is covered by a `<Name>.gallery.tsx` demo next to it (the text-like
  inputs share `Field.gallery.tsx`), covering all variants
  and states (default, hover, focus, selected, disabled, error). Register it in
  `src/components/features/admin/DesignSystemGallery/entries.ts` with its `group` (`groups.ts`); the
  page groups the entries and sorts them by title. The gallery is at `/admin/ds`, linked
  from the admin sidebar in local dev. Demo copy is English-only fixture text; it's developer tooling.
- **Definition of done** for a ds component (the audit checklist; `node scripts/ds-audit.mjs` checks the
  mechanical parts):
  - **Code:** tier API (`value` + `onValueChange` for inputs, `onChange` for choice groups,
    `onCheckedChange` for Checkbox / Switch); strings as props; variants and sizes as `Record` maps
    merged with `cn()`; no colour / height overrides through `className` inside ds; files ≤ ~100
    logical lines; `index.ts` exports exactly the public surface.
  - **Look:** tokens only (no palette, hex, `rgb()`, Tailwind default radii / font sizes); sizes sm 40 /
    md 46 / lg 50 for boxed controls; `rounded-field` (md) / `rounded-control` (sm); the shared Field
    classes for anything field-like; `focus-ring` on every interactive element. Floating panels
    (Select / TimeField lists, Menu, Popover, ConfirmPopover) share one chrome: `rounded-media
    shadow-menu border border-rule`, options inside `rounded-item`. Disabled edge arrows (Stepper,
    Calendar, sheet steps) use `opacity-50`, like disabled buttons.
  - **States:** every one it can be in (list below), shown in its gallery entry.
  - **UX:** ≥ 44×44 hit target on touch (`pointer-coarse:`); Tab / Enter / Space / Esc work and overlays
    return focus; no information only on hover; long and Georgian labels wrap or clamp on purpose.
  - **Proof:** a `<Name>.gallery.tsx` registered in `entries.ts` with its group, and a `<Name>.test.tsx`.
- **A new ds component ships complete**, before any screen uses it:
  - **Every state it can be in**: idle / empty (placeholder), filled, hover, focus-visible, open or
    active, selected, disabled, error (invalid inside a `Field`), and loading or busy when it waits
    on something. Leave a state out only when it can't happen, and say why in the PR.
  - **Our look**: tokens only, the shared `Field` classes for anything field-like, sizes that match
    its neighbours (e.g. `sm` next to `sm` Buttons).
  - **Tests**: `<Name>.test.tsx` next to it (Vitest + Testing Library), covering its behaviour,
    each state and basic keyboard use. `pnpm test` runs them; `pnpm build` runs them
    first, so a failing test fails the Vercel build and the PR check.
- **Accessibility is a low priority.** Take what base-ui and plain HTML give for free (real buttons
  and inputs, labels, focus rings, Esc to close), and don't spend effort beyond that:
  - **Admin:** basic keyboard use is the ceiling — Tab reaches controls, Enter / Space act, Esc
    closes, focus is visible. Nothing more.
  - **Public pages:** most readers are mountain people; very few use assistive technology.
  - So no extra ARIA work, screen-reader-only flows or accessibility-only tests, and an accessibility
    finding in review is a nit, never a reason to block or redesign.

---

## Legacy policy

The legacy kit `src/components/ui/` was removed (phase 6), together with `@headlessui/react`,
`@radix-ui/*` and `clsx`. Everything is built from ds now; if something is missing, build it in `ds/`
first as its own commit or PR. Feature code still has raw palette classes and arbitrary values — move
them to tokens when you touch a screen (`local/ds-next/feature-tokens.md`).

---

## Migration plan

| Phase | Scope | Status |
|---|---|---|
| **1. Foundation** | Tokens, Inter 700 as `font-sans`, `globals.css` cleanup (dead Arial rule, border default → `rule`), accent → `#0c5aa6`, `@ds/*` alias, `cn()` aware of custom tokens, lint rules, gallery page with tokens | ✅ |
| **2. Primitives for submit** | Button, Badge, Field / FieldGroup, TextField, NumberField, Textarea, ChipGroup, ToggleGrid, SegmentedControl, Stepper. Patterns FormCard, StickyActionBar, SuccessState. Form bindings. Gallery demos | ✅ |
| **3. Submit page redesign** | `local/observations/design_handoff_submit_observation/` built on ds | ✅ |
| **4. Rest of observations** | List toolbar, detail views, aspect/elevation picker moved to `features/` with a bare variant | ☐ |
| **5. Legacy, by screen area** | Public pages (auth, forecasts, about) → admin forms → admin tables, modals and drawers. Admin lists, forms, the overview, every sheet and the mobile menus are done | ✅ |
| **6. Cleanup** | Delete `ui/`. Remove `@headlessui/react`, `@radix-ui/*` and `clsx` | ✅ |

### Component tracker

Every legacy component is gone; the table stays as a map from old names to their ds replacements.

| Legacy (`ui/`) | Library | ds replacement | Removed |
|---|---|---|---|
| Button (+ `shared/ButtonLink`) | Headless UI | `primitives/Button`; links use `getButtonClasses` | ✅ |
| InputBlock | — | `primitives/Field` | ✅ |
| TextInput | Headless UI | `primitives/TextField` | ✅ |
| SearchInput | Headless UI | `primitives/SearchField` | ✅ |
| Textarea | Headless UI | `primitives/Textarea` | ✅ |
| NumberInput | base-ui | `primitives/Stepper` / `NumberField` | ✅ |
| ChipGroup | base-ui | `primitives/ChipGroup` | ✅ |
| SegmentedControl | base-ui | `primitives/SegmentedControl` | ✅ |
| RadioGroup | Headless UI | `primitives/SegmentedControl` | ✅ |
| RadioOption | base-ui | `primitives/RadioGroup` (long labels, one per row) or `ToggleGrid` | ✅ |
| Checkbox | Headless UI | `primitives/Checkbox` | ✅ |
| Switch | base-ui | `primitives/Switch` | ✅ |
| Select | Radix | `primitives/Select` (base-ui) | ✅ |
| DatePicker, Calendar, TimeInput, DatePickerTimeInput | Headless UI + react-day-picker | `primitives/DatePicker` (date and date + time fields), `primitives/Calendar` (month grid, e.g. in a `Popover`) | ✅ |
| DateField (ds, native inputs) | — | `primitives/DatePicker` | ✅ |
| TimePicker | Headless UI | `primitives/DatePicker` (`withTime`) | ✅ |
| Modal (+ legacy `shared/ConfirmationDialog`) | Headless UI | `primitives/Dialog` (base-ui), `patterns/ConfirmDialog` + new translated `@components/shared` `ConfirmationDialog` | ✅ |
| Popover | Radix | `primitives/Popover` (base-ui) | ✅ |
| Tooltip, InfoIcon | Radix | `primitives/Tooltip` (base-ui Tooltip; hover/focus labels), `primitives/InfoTip` (base-ui Popover; explanations); no provider needed | ✅ |
| DropdownMenu | base-ui | `primitives/Menu` | ✅ |
| Sheet, Drawer (bottom sheet) | base-ui / vaul | `patterns/Sheet` (+ `SheetHeader`, `SheetStepButtons`; `shared/DetailsSheet` for a sheet opened from a button) | ✅ |
| Mobile nav menus (not in `ui/`: `Header/NavMenu/MobileNav`, `admin/sidebar/MobileDrawer`) | vaul (removed) | `patterns/Drawer` | ✅ |
| IconButton | custom | `primitives/IconButton` | ✅ |
| Spinner | custom | `primitives/Spinner` (inline), `primitives/AvalancheLoader` via `patterns/LoadingState` / `shared/Loading` (blocks and pages); legacy `ui/Spinner` removed | ✅ |
| Skeleton | custom | `primitives/Skeleton` | ✅ |
| Pagination, DataTable | custom | `primitives/Pagination`, `patterns/DataTable` | ✅ |
| AspectElevationPicker | base-ui | moved to `features/observations/` | ✅ |
| MiniCompass | custom | moved to `features/observations/` | ✅ |
| AutoScrollList | embla | none — partners page shows static grids; removed with `embla-carousel-auto-scroll` | ✅ |
| BrandedQRCode, FallbackImage, SortableItem | custom | `shared/BrandedQRCode` (app logo), `primitives/FallbackImage`, `patterns/SortableItem` | ✅ |

### Deferred

- **Storybook** replaces the gallery page later. It's tracked in `local/tech-debt.md`.
