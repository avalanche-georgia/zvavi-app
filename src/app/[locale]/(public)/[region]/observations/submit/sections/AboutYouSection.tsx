'use client'

import { FormTextField } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import type { ObservationSubmitFormSchema } from '../schema'

const AboutYouSection = () => {
  const t = useTranslations()

  return (
    <FormCard title={t('observations.submit.sections.aboutYou')}>
      <FormTextField<ObservationSubmitFormSchema>
        autoComplete="name"
        label={t('observations.submit.labels.submitterName')}
        name="submitterName"
        placeholder={t('observations.submit.placeholders.submitterName')}
        required
        requiredMessage={t('observations.submit.nameRequired')}
      />
      <FormTextField<ObservationSubmitFormSchema>
        hint={t('observations.submit.optional')}
        label={t('observations.submit.labels.submitterEducation')}
        name="submitterEducation"
        placeholder={t('observations.submit.placeholders.submitterEducation')}
      />
      <FormTextField<ObservationSubmitFormSchema>
        hint={t('observations.submit.hints.submitterContact')}
        label={t('observations.submit.labels.submitterContact')}
        name="submitterContact"
        placeholder={t('observations.submit.placeholders.submitterContact')}
      />
    </FormCard>
  )
}

export default AboutYouSection
