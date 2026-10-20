// One pill chip; pressed fills with accent
export const chipClasses = [
  'focus-ring border-rule bg-surface text-copy text-ink flex min-h-10.5 items-center gap-1.5 rounded-full border px-3.5',
  'hover:border-rule-strong font-medium transition-colors',
  'data-pressed:border-accent data-pressed:bg-accent data-pressed:text-white',
  'data-disabled:text-disabled data-disabled:cursor-not-allowed',
].join(' ')
