'use client'

import { useFormFieldError } from '@ds/form'
import { FieldGroup, ToggleGrid } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useController } from 'react-hook-form'

import type { ObservationFormFields } from '../schema'

const sizeValues = ['1', '2', '3', '4', '5'] as const

type SizeValue = (typeof sizeValues)[number]

const sizeOptions = sizeValues.map((value) => ({ label: value, value }))

// Destructive size 1–5 (EAWS). Required and deliberately without a default.
const SizeField = () => {
  const t = useTranslations()
  const { field } = useController<ObservationFormFields, 'size'>({ name: 'size' })
  const error = useFormFieldError<ObservationFormFields>(
    'size',
    t('observations.form.what.sizeRequired'),
  )

  const value = field.value == null ? null : (String(field.value) as SizeValue)

  const handleChange = (nextValue: SizeValue | null) =>
    field.onChange(nextValue === null ? null : Number(nextValue))

  const description = value ? (
    <span className="text-body">
      <b className="font-semibold">{value}</b> ·{' '}
      {t(`observations.form.what.sizeDescriptors.${value}`)}
    </span>
  ) : (
    t('observations.form.what.sizePrompt')
  )

  return (
    <FieldGroup
      description={description}
      error={error}
      hint={t('observations.form.what.sizeHint')}
      label={t('observations.form.labels.size')}
      required
      requiredText={t('common.validation.required')}
    >
      <ToggleGrid onChange={handleChange} options={sizeOptions} value={value} />
    </FieldGroup>
  )
}

export default SizeField
