// Shared look of every text-like control (text, number, textarea, stepper frame)
export const fieldControlClasses = [
  'w-full min-w-0 rounded-field border border-rule bg-surface text-copy-lg text-ink transition-colors',
  'placeholder:text-placeholder hover:border-rule-strong',
  'data-invalid:border-danger',
  'data-disabled:cursor-not-allowed data-disabled:bg-tile data-disabled:text-muted',
].join(' ')

export type ControlSize = 'md' | 'sm'

// Height of a single-line control (Select, DatePicker, TextField, SearchField).
// md: form fields. sm: toolbars and filter bars, next to sm Buttons.
export const controlSizeClasses: Record<ControlSize, string> = {
  md: 'h-11.5 px-3',
  sm: 'h-10 rounded-control px-3 text-copy',
}
