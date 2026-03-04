'use client'

import { useState } from 'react'
import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import HazardLevelInfoDrawer from '@components/features/forecast/HazardLevelsByElevation/HazardLevelInfoDrawer'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { Forecast } from '@domain/types'
import clsx from 'clsx'
import { MousePointerClick } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ForecastMeta from './ForecastMeta'

type HazardLevelBannerProps = {
  forecast: Forecast
  onInfoClick?: VoidFunction
}

const HazardLevelBanner = ({ forecast, onInfoClick }: HazardLevelBannerProps) => {
  const t = useTranslations()
  const { hazardLevels } = forecast
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false)

  const titleKey = hazardLevelNamesByScale[hazardLevels.overall]
  const icon = hazardIcons[hazardLevels.overall]
  const isExtremeRisk = hazardLevels.overall === '5'

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (onInfoClick) {
      onInfoClick()
    } else {
      setIsInfoDrawerOpen(true)
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 rounded-2xl p-4 shadow-md',
        backgroundColorByHazardLevel[hazardLevels.overall],
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={clsx(
            'flex h-20 flex-col justify-between',
            isExtremeRisk ? 'text-white' : 'text-black',
          )}
        >
          <p className="text-sm font-semibold">{`${t('common.labels.overallDangerLevel')} - ${hazardLevels.overall}`}</p>
          <h4 className="text-3xl font-semibold">{t(titleKey)}</h4>
        </div>

        <button
          className="relative flex flex-col items-center gap-1"
          onClick={handleInfoClick}
          type="button"
        >
          <Image alt="Danger level" height={80} src={icon} width={80} />
          <MousePointerClick
            className={clsx(
              'absolute bottom-0 right-3.5 fill-white stroke-1',
              isExtremeRisk ? 'stroke-white/60' : 'text-black/80',
            )}
            size={18}
          />
        </button>
      </div>

      <hr className={isExtremeRisk ? 'border-white/20' : 'border-black/20'} />

      <ForecastMeta forecast={forecast} isExtremeRisk={isExtremeRisk} />

      {!onInfoClick && (
        <HazardLevelInfoDrawer
          isOpen={isInfoDrawerOpen}
          level={hazardLevels.overall}
          onClose={() => setIsInfoDrawerOpen(false)}
        />
      )}
    </div>
  )
}

export default HazardLevelBanner
