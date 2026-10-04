'use client'

import { backgroundColorByHazardLevel } from '@components/constants'
import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { Pyramid } from '@components/features/forecast/HazardLevelsByElevation'
import { hazardLevelNamesByScale } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { useWatch } from 'react-hook-form'

import { isDarkHazard } from './constants'

import { cn } from '@/lib/utils'

// The public forecast graphic, updating as levels change
const HazardPreview = () => {
  const t = useTranslations()
  const hazardLevels = useWatch<ForecastFormSchema, 'hazardLevels'>({ name: 'hazardLevels' })
  const { overall } = hazardLevels

  return (
    <div className="sticky top-22.5 flex flex-col items-center gap-3 @max-[640px]:hidden">
      {/* Pyramid positions itself against the bottom-right of this box */}
      <div className="relative h-60 w-52">
        <Pyramid hazardLevels={hazardLevels} isInteractive={false} />
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'grid size-6 place-items-center rounded-full text-xs font-bold',
            backgroundColorByHazardLevel[overall],
            isDarkHazard(overall) ? 'text-white' : 'text-ink',
          )}
        >
          {overall}
        </span>
        <span className="text-copy text-ink font-semibold">
          {t(hazardLevelNamesByScale[overall])}
        </span>
      </div>
      <p className="text-caption text-muted text-center">
        {t('admin.forecast.editor.hazard.previewCaption')}
      </p>
    </div>
  )
}

export default HazardPreview
