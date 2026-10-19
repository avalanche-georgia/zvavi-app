import type { ClassNames } from 'react-day-picker'

// Range days get a soft strip on the cell behind the button; the range ends and
// the week's first / last cell round it off
export const calendarClasses: Partial<ClassNames> = {
  caption_label: 'text-copy text-ink font-semibold',
  day: 'first:rounded-l-control last:rounded-r-control p-0 text-center',
  hidden: 'invisible',
  month: 'flex flex-col gap-2',
  month_caption: 'flex h-9 items-center justify-center',
  month_grid: 'w-full border-separate border-spacing-0',
  months: 'relative flex flex-col gap-4',
  nav: 'absolute inset-x-0 top-0 z-10 flex items-center justify-between',
  range_end: 'bg-accent-soft rounded-r-control',
  range_middle: 'bg-accent-soft',
  range_start: 'bg-accent-soft rounded-l-control',
  root: 'relative w-fit',
  weekday: 'text-caption text-muted size-10 font-medium',
}
