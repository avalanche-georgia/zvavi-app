// Props every labelled field shares — form bindings pass them through unchanged
export type FieldChromeProps = {
  className?: string
  description?: React.ReactNode
  error?: string
  hint?: React.ReactNode
  label: React.ReactNode
  required?: boolean
}

export const fieldLabelClasses = 'text-copy text-ink font-semibold'
export const fieldErrorClasses = 'text-copy-sm text-danger'
export const fieldDescriptionClasses = 'text-copy-sm text-muted'
