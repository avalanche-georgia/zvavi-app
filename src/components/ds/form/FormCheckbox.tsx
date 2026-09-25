'use client'

import { type FieldPath, type FieldValues, useController } from 'react-hook-form'

import { Checkbox } from '../primitives'

type FormCheckboxProps<TFieldValues extends FieldValues> = {
  className?: string
  description?: React.ReactNode
  label: React.ReactNode
  labelAside?: React.ReactNode
  name: FieldPath<TFieldValues>
}

const FormCheckbox = <TFieldValues extends FieldValues>({
  className,
  description,
  label,
  labelAside,
  name,
}: FormCheckboxProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({ name })

  return (
    <Checkbox
      checked={!!field.value}
      className={className}
      description={description}
      label={label}
      labelAside={labelAside}
      onCheckedChange={field.onChange}
    />
  )
}

export default FormCheckbox
