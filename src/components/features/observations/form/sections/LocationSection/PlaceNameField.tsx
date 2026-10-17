'use client'

import { avalancheFieldLimits } from '@domain/constants'
import { FormTextField } from '@ds/form'
import { useTranslations } from 'next-intl'

import type { ObservationFormFields } from '../../schema'

// Optional free-text name of the spot, shown with the published report
const PlaceNameField = () => {
  const t = useTranslations()

  return (
    <FormTextField<ObservationFormFields>
      hint={t('observations.form.placeName.hint')}
      label={t('observations.form.placeName.label')}
      maxLength={avalancheFieldLimits.locationMaxLength}
      name="location"
      placeholder={t('observations.form.placeName.placeholder')}
    />
  )
}

export default PlaceNameField
