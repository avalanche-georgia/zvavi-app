import { cn } from '@/lib/utils'

// Top-level nav entry: link or dropdown trigger. The current page (or the group
// holding it) wears the accent selected style. One weight for every state: a bolder
// active item would be wider and shift its neighbours when the page changes.
export const navItemClasses = (isActive: boolean) =>
  cn(
    'focus-ring rounded-control text-copy flex items-center gap-1 px-3 py-2 font-medium whitespace-nowrap transition-colors',
    isActive
      ? 'bg-accent-soft text-accent'
      : 'text-body hover:bg-tile hover:text-ink data-popup-open:bg-tile data-popup-open:text-ink',
  )
