'use client'

import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import useFormFieldError from './useFormFieldError'
import { DatePicker, type DatePickerProps, Field } from '../primitives'

type FormDateFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Pick<
    DatePickerProps,
    'calendarLabel' | 'clearLabel' | 'locale' | 'max' | 'min' | 'placeholder' | 'todayLabel'
  >

// The field value is a Date, or null when empty. react-hook-form gets the trigger
// as its ref, so it can focus the field on an error.
const FormDateField = <TFieldValues extends FieldValues>({
  calendarLabel,
  className,
  clearLabel,
  description,
  hint,
  isLabelHidden,
  label,
  locale,
  max,
  min,
  name,
  placeholder,
  required,
  requiredMessage,
  todayLabel,
}: FormDateFieldProps<TFieldValues>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController<TFieldValues>({ name })
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
      <DatePicker
        ref={ref}
        calendarLabel={calendarLabel}
        clearLabel={clearLabel}
        locale={locale}
        max={max}
        min={min}
        onBlur={onBlur}
        onValueChange={onChange}
        placeholder={placeholder}
        required={required}
        todayLabel={todayLabel}
        value={value ?? null}
      />
    </Field>
  )
}

export default FormDateField
