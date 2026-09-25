'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
import { ChipGroup, FieldGroup, type ToggleOption } from '../primitives'

type FormChipGroupProps<
  TFieldValues extends FieldValues,
  T extends string,
> = FormFieldProps<TFieldValues> & {
  isDeselectable?: boolean
  // Value stored in the form when nothing is selected
  emptyValue?: '' | null
  options: ToggleOption<T>[]
}

const FormChipGroup = <TFieldValues extends FieldValues, T extends string>({
  className,
  description,
  emptyValue = null,
  hint,
  isDeselectable,
  isLabelHidden,
  label,
  name,
  options,
  required,
  requiredMessage,
  requiredText,
}: FormChipGroupProps<TFieldValues, T>) => {
  const { field } = useController<TFieldValues>({ name })
  const error = useFormFieldError<TFieldValues>(name, requiredMessage)

  const value: T | null = field.value || null

  const handleChange = (nextValue: T | null) => field.onChange(nextValue ?? emptyValue)

  return (
    <FieldGroup
      className={className}
      description={description}
      error={error}
      hint={hint}
      isLabelHidden={isLabelHidden}
      label={label}
      required={required}
      requiredText={requiredText}
    >
      <ChipGroup
        isDeselectable={isDeselectable}
        onChange={handleChange}
        options={options}
        value={value}
      />
    </FieldGroup>
  )
}

export default FormChipGroup
