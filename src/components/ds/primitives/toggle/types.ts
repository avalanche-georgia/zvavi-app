export type ToggleOption<T extends string> = {
  // Required when the label is not plain text (icon, text + badge)
  ariaLabel?: string
  disabled?: boolean
  label: React.ReactNode
  value: T
}
