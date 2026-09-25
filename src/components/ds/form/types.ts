import type { FieldPath, FieldValues } from 'react-hook-form'

import type { FieldChromeProps } from '../primitives'

// A form-bound field: label/hint chrome + the form field name. The error comes from the form.
export type FormFieldProps<TFieldValues extends FieldValues> = Omit<FieldChromeProps, 'error'> & {
  name: FieldPath<TFieldValues>
}
