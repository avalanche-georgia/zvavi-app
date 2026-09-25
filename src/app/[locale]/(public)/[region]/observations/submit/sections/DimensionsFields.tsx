'use client'

import { avalancheFieldLimits } from '@domain/constants'
import { FormNumberField } from '@ds/form'
import { FieldGroup } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ObservationSubmitFormSchema } from '../schema'

const { slabDepth, width } = avalancheFieldLimits

const DimensionsFields = () => {
  const t = useTranslations()

  return (
    <FieldGroup
      hint={t('observations.submit.what.dimensionsHint')}
      label={t('observations.submit.what.dimensions')}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <FormNumberField<ObservationSubmitFormSchema>
          label={t('observations.submit.labels.slabDepth')}
          max={slabDepth.max}
          min={slabDepth.min}
          name="slabDepth"
          placeholder="—"
          unit={t('observations.submit.units.cm')}
        />
        <FormNumberField<ObservationSubmitFormSchema>
          label={t('observations.submit.labels.width')}
          max={width.max}
          min={width.min}
          name="width"
          placeholder="—"
          unit={t('observations.submit.units.m')}
        />
      </div>
    </FieldGroup>
  )
}

export default DimensionsFields
