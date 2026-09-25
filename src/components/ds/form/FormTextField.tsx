'use client'

import { useFieldError } from '@components/hooks'
import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import { Field, TextField } from '../primitives'

type FormTextFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  autoComplete?: string
  placeholder?: string
  unit?: string
}

const FormTextField = <TFieldValues extends FieldValues>({
  autoComplete,
  className,
  description,
  hint,
  label,
  name,
  placeholder,
  required,
  unit,
}: FormTextFieldProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({ name })
  const getFieldError = useFieldError<TFieldValues>()

  return (
    <Field
      className={className}
      description={description}
      error={getFieldError(name)}
      hint={hint}
      label={label}
      required={required}
    >
      <TextField
        autoComplete={autoComplete}
        name={field.name}
        onBlur={field.onBlur}
        onValueChange={field.onChange}
        placeholder={placeholder}
        required={required}
        unit={unit}
        value={field.value ?? ''}
      />
    </Field>
  )
}

export default FormTextField
