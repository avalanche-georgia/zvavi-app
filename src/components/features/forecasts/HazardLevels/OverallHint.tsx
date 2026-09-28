'use client'

import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import { Button } from '@ds/primitives'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { elevationZones } from './constants'

// Advisory only: overall is usually the highest zone rating. Never blocks saving.
const OverallHint = () => {
  const t = useTranslations()
  const { setValue } = useFormContext<ForecastFormSchema>()
  const hazardLevels = useWatch<ForecastFormSchema, 'hazardLevels'>({ name: 'hazardLevels' })
  const highest = String(
    Math.max(...elevationZones.map((zone) => Number(hazardLevels[zone]))),
  ) as HazardLevelScale

  if (hazardLevels.overall === highest) {
    return (
      <p className="text-copy-sm text-success flex items-center gap-1.5">
        <Check aria-hidden className="size-4" />
        {t('admin.forecast.editor.hazard.matchesHighest')}
      </p>
    )
  }

  const handleSetOverall = () =>
    setValue('hazardLevels.overall', highest, { shouldDirty: true, shouldValidate: true })

  return (
    <p className="text-copy-sm text-body flex flex-wrap items-center gap-x-2">
      {t.rich('admin.forecast.editor.hazard.highestIs', {
        label: t(hazardLevelNamesByScale[highest]),
        level: highest,

        strong: (chunks) => <strong className="text-ink font-semibold">{chunks}</strong>,
      })}
      <Button onClick={handleSetOverall} size="sm" variant="text">
        {t('admin.forecast.editor.hazard.setOverall', { level: highest })}
      </Button>
    </p>
  )
}

export default OverallHint
