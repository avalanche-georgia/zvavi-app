export type SelectSize = 'md' | 'sm'

// md: form fields. sm: toolbars and filter bars, next to sm Buttons
export const triggerSizeClasses: Record<SelectSize, string> = {
  md: 'h-11.5 px-3',
  sm: 'h-10 rounded-control px-3 text-copy',
}

export const itemSizeClasses: Record<SelectSize, string> = {
  md: 'py-2.5 text-copy-lg',
  sm: 'py-2 text-copy',
}
