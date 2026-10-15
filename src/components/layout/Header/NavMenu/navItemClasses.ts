import { cn } from '@/lib/utils'

// Top-level nav entry: link or dropdown trigger
export const navItemClasses = (isActive: boolean) =>
  cn(
    'focus-ring rounded-lg text-copy flex items-center gap-1 px-3 py-2 whitespace-nowrap transition-colors',
    'hover:bg-tile hover:text-ink data-popup-open:bg-tile data-popup-open:text-ink',
    isActive ? 'text-ink font-semibold' : 'text-body font-medium',
  )
