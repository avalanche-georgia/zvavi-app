'use client'

import { avalancheFieldLimits } from '@domain/constants'
import { FormTextarea } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import type { ObservationFormFields } from '../schema'

const DescriptionSection = () => {
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
        placeholder={t('observations.form.placeholders.description')}
      />
    </FormCard>
  )
}

export default DescriptionSection
