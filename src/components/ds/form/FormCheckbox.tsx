'use client'

import { type FieldPath, type FieldValues, useController } from 'react-hook-form'

import useFormFieldError from './useFormFieldError'
import { Checkbox } from '../primitives'

type FormCheckboxProps<TFieldValues extends FieldValues> = {
  className?: string
  description?: React.ReactNode
  label: React.ReactNode
  labelAside?: React.ReactNode
  name: FieldPath<TFieldValues>
  // Replaces the generic "Required" for a required agreement
  requiredMessage?: string
}

const FormCheckbox = <TFieldValues extends FieldValues>({
  className,
  description,
  label,
  labelAside,
  name,
  requiredMessage,
}: FormCheckboxProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({ name })
  const error = useFormFieldError<TFieldValues>(name, requiredMessage)

  return (
    <Checkbox
      checked={!!field.value}
      className={className}
      description={description}
      error={error}
      label={label}
      labelAside={labelAside}
      onCheckedChange={field.onChange}
    />
  )
}

export default FormCheckbox
