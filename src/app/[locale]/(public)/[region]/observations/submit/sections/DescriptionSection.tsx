'use client'

import { avalancheFieldLimits } from '@domain/constants'
import { FormTextarea } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import type { ObservationSubmitFormSchema } from '../schema'

const DescriptionSection = () => {
  const t = useTranslations()

  return (
    <FormCard
      headerAside={t('observations.submit.optional')}
      title={t('observations.submit.sections.anythingElse')}
    >
      <FormTextarea<ObservationSubmitFormSchema>
        isLabelHidden
        label={t('observations.submit.labels.description')}
        maxLength={avalancheFieldLimits.descriptionMaxLength}
        name="description"
        placeholder={t('observations.submit.placeholders.description')}
      />
    </FormCard>
  )
}

export default DescriptionSection
