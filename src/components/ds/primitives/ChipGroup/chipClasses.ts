// One pill chip; pressed fills with accent. 40px tall, like sm Selects and date filters
export const chipClasses = [
  'focus-ring border-rule bg-surface text-copy-sm sm:text-copy text-ink flex min-h-10 items-center gap-1.5 rounded-full border px-3.5',
  'hover:border-rule-strong font-medium transition-colors',
  'data-pressed:border-accent data-pressed:bg-accent data-pressed:text-white',
  'data-disabled:text-disabled data-disabled:cursor-not-allowed',
].join(' ')
