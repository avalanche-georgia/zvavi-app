// Shared look of every text-like control (text, number, textarea, stepper frame)
export const fieldControlClasses = [
  'w-full min-w-0 rounded-field border border-rule bg-surface text-copy-lg text-ink transition-colors',
  'placeholder:text-placeholder hover:border-rule-strong',
  'data-invalid:border-danger',
  'data-disabled:cursor-not-allowed data-disabled:bg-tile data-disabled:text-muted',
].join(' ')
