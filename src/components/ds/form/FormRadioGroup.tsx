'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
import { FieldGroup, RadioGroup, type RadioOption } from '../primitives'

type FormRadioGroupProps<
  TFieldValues extends FieldValues,
  T extends string,
> = FormFieldProps<TFieldValues> & {
  options: RadioOption<T>[]
}

const FormRadioGroup = <TFieldValues extends FieldValues, T extends string>({
  className,
  description,
  hint,
  isLabelHidden,
  label,
  name,
  options,
  required,
  requiredMessage,
  requiredText,
}: FormRadioGroupProps<TFieldValues, T>) => {
  const { field } = useController<TFieldValues>({ name })
  const error = useFormFieldError<TFieldValues>(name, requiredMessage)

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
      <RadioGroup<T> onChange={field.onChange} options={options} value={field.value ?? null} />
    </FieldGroup>
  )
}

export default FormRadioGroup
