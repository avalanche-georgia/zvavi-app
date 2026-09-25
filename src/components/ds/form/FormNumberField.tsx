'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
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
  isLabelHidden,
  label,
  max,
  min,
  name,
  placeholder,
  required,
  requiredMessage,
  unit,
}: FormNumberFieldProps<TFieldValues>) => {
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
