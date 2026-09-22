'use client'

import { AspectSelector } from '@components/features/admin/Forecasts/ForecastForm/common'
import { InputBlock } from '@components/ui'
import type { Aspect, ElevationZone } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const zones: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']

const AspectsField = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const aspects = form.watch('aspects')

  const handleChange = (zone: ElevationZone) => (values: Aspect[]) => {
    form.setValue('aspects', { ...aspects, [zone]: values })
  }

  return (
    <div className="flex flex-col gap-3">
      {zones.map((zone) => (
        <InputBlock key={zone} label={t(`common.elevationZones.${zone}`)}>
          <AspectSelector onChange={handleChange(zone)} selectedAspects={aspects[zone]} />
        </InputBlock>
      ))}
    </div>
  )
}

export default AspectsField
