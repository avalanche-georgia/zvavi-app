'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
import { DateField, Field } from '../primitives'

type FormDateFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  // yyyy-MM-dd
  max?: string
  // yyyy-MM-dd
  min?: string
}

// The field value is a Date, or null when empty
const FormDateField = <TFieldValues extends FieldValues>({
  className,
  description,
  hint,
  isLabelHidden,
  label,
  max,
  min,
  name,
  required,
  requiredMessage,
}: FormDateFieldProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({ name })
  const error = useFormFieldError<TFieldValues>(name, requiredMessage)

  return (
    <Field
      className={className}
      description={description}
      error={error}
      hint={hint}
      isLabelHidden={isLabelHidden}
      label={label}
      required={required}
    >
      <DateField
        max={max}
        min={min}
        onValueChange={field.onChange}
        required={required}
        value={field.value ?? null}
      />
    </Field>
  )
}

export default FormDateField
