'use client'

import type { PartnerFormData, PartnerTier } from '@domain/types'
import { useFormFieldError } from '@ds/form'
import { ChipGroup, FieldGroup } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useController } from 'react-hook-form'

const tiers: PartnerTier[] = [1, 2, 3]

// The form keeps the tier as a number; chips work with strings
const TierField = () => {
  const t = useTranslations()
  const { field } = useController<PartnerFormData, 'tier'>({ name: 'tier' })
  const error = useFormFieldError<PartnerFormData>('tier')

  const options = tiers.map((tier) => ({
    label: `${tier} · ${t(`partners.levels.${tier}`)}`,
    value: String(tier),
  }))

  const handleChange = (value: string | null) =>
    field.onChange(value ? (Number(value) as PartnerTier) : null)

  return (
    <FieldGroup
      error={error}
      label={t('admin.partners.form.labels.tier')}
      required
      requiredText={t('common.validation.required')}
    >
      <ChipGroup
        onChange={handleChange}
        options={options}
        value={field.value ? String(field.value) : null}
      />
    </FieldGroup>
  )
}

export default TierField
