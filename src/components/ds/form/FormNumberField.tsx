'use client'

import { useFieldError } from '@components/hooks'
import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import { Field, NumberField } from '../primitives'

type FormNumberFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  max?: number
  min?: number
  placeholder?: string
  unit?: string
}

const FormNumberField = <TFieldValues extends FieldValues>({
  className,
  description,
  hint,
  label,
  max,
  min,
  name,
  placeholder,
  required,
  unit,
}: FormNumberFieldProps<TFieldValues>) => {
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
      <NumberField
        max={max}
        min={min}
        onValueChange={field.onChange}
        placeholder={placeholder}
        unit={unit}
        value={field.value ?? null}
      />
    </Field>
  )
}

export default FormNumberField
