'use client'

import { useTranslations } from 'next-intl'

import AspectsField from './AspectsField'
import ClassificationFields from './ClassificationFields'
import DateField from './DateField'
import DescriptionField from './DescriptionField'
import FormSection from './FormSection'
import HoneypotField from './HoneypotField'
import LocationMapField from './LocationMapField'
import SubmitterFields from './SubmitterFields'

const FormFields = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-8">
      <HoneypotField />

      <FormSection title={t('observations.submit.sections.whenAndWhere')}>
        <DateField />
        <LocationMapField />
      </FormSection>

      <FormSection title={t('observations.submit.sections.avalancheDetails')}>
        <ClassificationFields />
        <AspectsField />
        <DescriptionField />
      </FormSection>

      <FormSection title={t('observations.submit.sections.aboutYou')}>
        <SubmitterFields />
      </FormSection>
    </div>
  )
}

export default FormFields
