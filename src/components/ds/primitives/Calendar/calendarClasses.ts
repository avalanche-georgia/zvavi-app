import type { ClassNames } from 'react-day-picker'

// Range days get a soft strip on the cell behind the button; the range ends and
// the week's first / last cell round it off. With a dropdown caption the native
// select is invisible over its label, so the label reads as a quiet button. The
// nav bar spans the caption row, so only its buttons take clicks — the caption
// (and its dropdown) stays clickable underneath.
export const calendarClasses: Partial<ClassNames> = {
  button_next: 'pointer-events-auto',
  button_previous: 'pointer-events-auto',
  caption_label: 'text-copy text-ink flex items-center gap-1 font-semibold',
  chevron: 'text-muted',
  day: 'first:rounded-l-control last:rounded-r-control p-0 text-center',
  dropdown: 'absolute inset-0 cursor-pointer opacity-0',
  dropdown_root:
    'rounded-control hover:bg-tile has-focus-visible:outline-accent relative inline-flex h-9 items-center px-2 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 data-disabled:text-muted data-disabled:hover:bg-transparent',
  dropdowns: 'text-copy text-ink flex items-center gap-1 font-semibold',
  hidden: 'invisible',
  month: 'flex flex-col gap-2',
  month_caption: 'flex h-9 items-center justify-center',
  month_grid: 'w-full border-separate border-spacing-0',
  months: 'relative flex flex-col gap-4',
  nav: 'pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between',
  range_end: 'bg-accent-soft rounded-r-control',
  range_middle: 'bg-accent-soft',
  range_start: 'bg-accent-soft rounded-l-control',
  root: 'relative w-fit',
  weekday: 'text-caption text-muted size-10 font-medium',
}
