'use client'

import { useId } from 'react'
import { backgroundColorByHazardLevel } from '@components/constants'
import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { ElevationKey, HazardLevelScale } from '@domain/types'
import { RatingScale, type RatingScaleOption } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useController } from 'react-hook-form'

import { hazardScaleValues, isDarkHazard } from './constants'

import { cn } from '@/lib/utils'

type HazardScaleRowProps = {
  label: string
  zone: ElevationKey
}

// One zone's 0–5 danger rating, coloured by level
const HazardScaleRow = ({ label, zone }: HazardScaleRowProps) => {
  const t = useTranslations()
  const labelId = useId()
  const { field } = useController<ForecastFormSchema, `hazardLevels.${ElevationKey}`>({
    name: `hazardLevels.${zone}`,
  })
  const isOverall = zone === 'overall'
  const value = field.value as HazardLevelScale

  const options = hazardScaleValues.map((level) => ({
    label: t(hazardLevelNamesByScale[level]),
    value: level,
  }))

  const renderSegment = (option: RatingScaleOption<HazardLevelScale>, isSelected: boolean) => (
    <>
      <span className={cn('font-semibold', isOverall ? 'text-lg' : 'text-base')}>
        {option.value}
      </span>
      <span
        className={cn('text-[11px] font-medium @max-[800px]:hidden', !isSelected && 'text-muted')}
      >
        {option.label}
      </span>
      {!isSelected && (
        <span
          aria-hidden
          className={cn(
            'absolute inset-x-2 bottom-1.5 h-0.75 rounded-full',
            backgroundColorByHazardLevel[option.value],
          )}
        />
      )}
    </>
  )

  const getSegmentClassName = (option: RatingScaleOption<HazardLevelScale>, isSelected: boolean) =>
    cn(
      'relative',
      isOverall ? 'h-15.5 @max-[520px]:h-12.5' : 'h-13.5 @max-[800px]:h-12 @max-[520px]:h-11.5',
      isSelected && [
        backgroundColorByHazardLevel[option.value],
        isDarkHazard(option.value) ? 'text-white' : 'text-ink',
        'ring-1 ring-black/10 ring-inset',
      ],
    )

  return (
    <div className="grid grid-cols-[118px_minmax(0,1fr)] items-center gap-3.5 @max-[520px]:grid-cols-1 @max-[520px]:gap-1.5">
      <div className="flex flex-col @max-[520px]:flex-row @max-[520px]:justify-between">
        <span className={cn('text-copy text-ink', isOverall && 'font-semibold')} id={labelId}>
          {label}
        </span>
        <span className="text-caption text-muted hidden @max-[800px]:block">
          {t(hazardLevelNamesByScale[value])}
        </span>
      </div>
      <RatingScale
        ariaLabelledBy={labelId}
        onChange={(level) => field.onChange(level)}
        options={options}
        renderSegment={renderSegment}
        segmentClassName={getSegmentClassName}
        value={value}
      />
    </div>
  )
}

export default HazardScaleRow
