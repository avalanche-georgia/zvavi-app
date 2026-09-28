'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
import { Field, Select, type SelectOption } from '../primitives'

type FormSelectProps<
  TFieldValues extends FieldValues,
  TValue extends string,
> = FormFieldProps<TFieldValues> & {
  options: SelectOption<TValue>[]
  placeholder?: string
}

const FormSelect = <TFieldValues extends FieldValues, TValue extends string>({
  className,
  description,
  hint,
  isLabelHidden,
  label,
  name,
  options,
  placeholder,
  required,
  requiredMessage,
}: FormSelectProps<TFieldValues, TValue>) => {
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
      <Select<TValue>
        onValueChange={field.onChange}
        options={options}
        placeholder={placeholder}
        value={field.value || null}
      />
    </Field>
  )
}

export default FormSelect
