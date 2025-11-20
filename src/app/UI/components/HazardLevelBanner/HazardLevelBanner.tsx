import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { hazardLevelsByScale } from '@/business/constants'
import { backgroundColorByHazardLevel, hazardIcons } from '@/UI/constants'

import ForecastMeta from './ForecastMeta'

import type { Forecast } from '@/business/types'

const HazardLevelBanner = ({ forecast }: { forecast: Forecast }) => {
  const t = useTranslations()
  const { hazardLevels } = forecast

  const title = hazardLevelsByScale[hazardLevels.overall]
  const icon = hazardIcons[hazardLevels.overall]
  const isExtremeRisk = hazardLevels.overall === '5'

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 rounded-2xl p-4',
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
          <p className="text-sm font-semibold">{`${t('common.labels.overallRiskLevel')} - ${hazardLevels.overall}`}</p>
          <h4 className="text-3xl font-semibold">{title}</h4>
        </div>

        <Image alt="Risk level" height={80} src={icon} />
      </div>

      <hr className={isExtremeRisk ? 'border-white/20' : 'border-black/20'} />

      <ForecastMeta forecast={forecast} isExtremeRisk={isExtremeRisk} />
    </div>
  )
}

export default HazardLevelBanner
