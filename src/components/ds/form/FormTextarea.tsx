'use client'

import { useFieldError } from '@components/hooks'
import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import { Field, Textarea } from '../primitives'

type FormTextareaProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  maxLength?: number
  placeholder?: string
}

const FormTextarea = <TFieldValues extends FieldValues>({
  className,
  description,
  hint,
  label,
  maxLength,
  name,
  placeholder,
  required,
}: FormTextareaProps<TFieldValues>) => {
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
      <Textarea
        maxLength={maxLength}
        onValueChange={field.onChange}
        placeholder={placeholder}
        value={field.value ?? ''}
      />
    </Field>
  )
}

export default FormTextarea
