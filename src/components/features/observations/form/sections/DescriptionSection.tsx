'use client'

import { avalancheFieldLimits } from '@domain/constants'
import { FormTextarea } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import type { ObservationFormFields } from '../schema'

type DescriptionSectionProps = {
  // Extra fields at the end of the card (the admin form's involvement)
  children?: React.ReactNode
  // Replaces the public prompt (the admin form asks for any notes)
  placeholder?: string
}

const DescriptionSection = ({ children, placeholder }: DescriptionSectionProps) => {
  const t = useTranslations()

  return (
    <FormCard
      headerAside={t('observations.form.optional')}
      title={t('observations.form.sections.anythingElse')}
    >
      <FormTextarea<ObservationFormFields>
        isLabelHidden
        label={t('observations.form.labels.description')}
        maxLength={avalancheFieldLimits.descriptionMaxLength}
        name="description"
        placeholder={placeholder ?? t('observations.form.placeholders.description')}
      />
      {children}
    </FormCard>
  )
}

export default DescriptionSection
