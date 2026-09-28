'use client'

import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import ElevationZonesInfo from './ElevationZonesInfo'
import AspectElevationPicker from '../../AspectElevationPicker'
import type { ObservationFormFields } from '../schema'

const AspectsSection = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationFormFields>()

  return (
    <FormCard
      headerAside={t('observations.form.aspectsHint')}
      title={
        <>
          {t('observations.form.sections.aspects')} <ElevationZonesInfo />
        </>
      }
    >
      <Controller
        control={form.control}
        name="aspects"
        render={({ field }) => (
          // The card already frames it — drop the picker's own border and padding
          <AspectElevationPicker
            className="max-w-none rounded-none border-0 p-0"
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />
    </FormCard>
  )
}

export default AspectsSection
