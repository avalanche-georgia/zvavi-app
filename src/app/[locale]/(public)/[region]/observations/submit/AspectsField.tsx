'use client'

import { AspectElevationPicker, InputBlock } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const AspectsField = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()

  return (
    <InputBlock label={t('observations.submit.labels.aspects')}>
      <Controller
        control={form.control}
        name="aspects"
        render={({ field }) => (
          <AspectElevationPicker className="mt-1" onChange={field.onChange} value={field.value} />
        )}
      />
    </InputBlock>
  )
}

export default AspectsField
