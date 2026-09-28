'use client'

import { avalancheFieldLimits } from '@domain/constants'
import { FormNumberField } from '@ds/form'
import { FieldGroup } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ObservationFormFields } from '../schema'

const { slabDepth, width } = avalancheFieldLimits

const DimensionsFields = () => {
  const t = useTranslations()

  return (
    <FieldGroup
      hint={t('observations.form.what.dimensionsHint')}
      label={t('observations.form.what.dimensions')}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <FormNumberField<ObservationFormFields>
          label={t('observations.form.labels.slabDepth')}
          max={slabDepth.max}
          min={slabDepth.min}
          name="slabDepth"
          placeholder="—"
          unit={t('observations.form.units.cm')}
        />
        <FormNumberField<ObservationFormFields>
          label={t('observations.form.labels.width')}
          max={width.max}
          min={width.min}
          name="width"
          placeholder="—"
          unit={t('observations.form.units.m')}
        />
      </div>
    </FieldGroup>
  )
}

export default DimensionsFields
