'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
import { Field, Textarea } from '../primitives'

type FormTextareaProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  maxLength?: number
  placeholder?: string
}

const FormTextarea = <TFieldValues extends FieldValues>({
  className,
  description,
  hint,
  isLabelHidden,
  label,
  maxLength,
  name,
  placeholder,
  required,
  requiredMessage,
}: FormTextareaProps<TFieldValues>) => {
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
