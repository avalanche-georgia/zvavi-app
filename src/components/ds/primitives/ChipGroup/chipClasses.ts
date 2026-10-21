// One pill chip; pressed fills with accent. 42px tall; on touch screens the ::after grows it to 44px
export const chipClasses = [
  'focus-ring border-rule bg-surface text-copy text-ink relative flex min-h-10.5 items-center gap-1.5 rounded-full border px-3.5',
  'after:absolute after:inset-x-0 pointer-coarse:after:-inset-y-px',
  'hover:border-rule-strong font-medium transition-colors',
  'data-pressed:border-accent data-pressed:bg-accent data-pressed:text-white',
  'data-disabled:text-disabled data-disabled:cursor-not-allowed',
].join(' ')
