'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
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
  isLabelHidden,
  label,
  name,
  placeholder,
  required,
  requiredMessage,
  unit,
}: FormTextFieldProps<TFieldValues>) => {
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
