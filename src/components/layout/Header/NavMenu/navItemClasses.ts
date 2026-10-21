import { cn } from '@/lib/utils'

// Top-level nav entry: link or dropdown trigger. The current page (or the group
// holding it) wears the accent selected style.
export const navItemClasses = (isActive: boolean) =>
  cn(
    'focus-ring rounded-lg text-copy flex items-center gap-1 px-3 py-2 whitespace-nowrap transition-colors',
    isActive
      ? 'bg-accent-soft text-accent font-semibold'
      : 'text-body font-medium hover:bg-tile hover:text-ink data-popup-open:bg-tile data-popup-open:text-ink',
  )
