'use client'

import { type FieldPath, type FieldValues, useController } from 'react-hook-form'

import { Switch } from '../primitives'

type FormSwitchProps<TFieldValues extends FieldValues> = {
  className?: string
  description?: React.ReactNode
  label: React.ReactNode
  name: FieldPath<TFieldValues>
}

// A record's on / off setting inside its form, when the list toggles the same
// setting with a Switch (e.g. a partner's Active)
const FormSwitch = <TFieldValues extends FieldValues>({
  className,
  description,
  label,
  name,
}: FormSwitchProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({ name })

  return (
    <Switch
      checked={!!field.value}
      className={className}
      description={description}
      label={label}
      onCheckedChange={field.onChange}
    />
  )
}

export default FormSwitch
