export type ChipSize = 'md' | 'sm'

// sm: smaller text for secondary picks (quick dates, toolbar periods); same 44px height
export const chipSizeClasses: Record<ChipSize, string> = {
  md: 'text-copy px-3.5',
  sm: 'text-copy-sm px-3',
}

// One pill chip; pressed fills with accent. 44px tall: a full touch target
export const chipClasses = [
  'focus-ring border-rule bg-surface text-ink flex min-h-11 items-center gap-1.5 rounded-full border',
  'hover:border-rule-strong font-medium transition-colors',
  'data-pressed:border-accent data-pressed:bg-accent data-pressed:text-white',
  'data-disabled:text-disabled data-disabled:cursor-not-allowed',
].join(' ')
