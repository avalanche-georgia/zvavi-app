import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { ElevationKey, HazardLevels, HazardLevelScale } from '@domain/types'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import InfoSection from './InfoSection'
import ScaleItem from './ScaleItem'
import { descriptionLabelKeys } from '../model/dangerDescription'
import { hazardScaleLevels, hazardTextClass } from '../model/hazard'

import { cn } from '@/lib/utils'

// What a danger level means: travel advice, likelihood, size and
// distribution — then the whole 1–5 scale with this forecast's level marked
type DangerInfoProps = {
  hazardLevels: HazardLevels
  // The overall level, or one elevation band's
  scope: ElevationKey
}

const DangerInfo = ({ hazardLevels, scope }: DangerInfoProps) => {
  const t = useTranslations()
  const level = hazardLevels[scope]
  const scopeLabel =
    scope === 'overall'
      ? t('common.labels.overallDangerLevel')
      : t('common.labels.zoneDangerLevel', { zone: t(`common.elevationZones.${scope}`) })

  // "travel advice | likelihood | size and distribution"
  const getParts = (scaleLevel: HazardLevelScale) =>
    t(`forecast.hazardLevels.descriptions.${scaleLevel}`)
      .split(' | ')
      .map((part) => part.trim())
      .filter(Boolean)

  const parts = getParts(level)
  // "This forecast" for the overall level, the band's name for a band
  const currentLabel =
    scope === 'overall' ? t('forecast.page.thisForecast') : t(`common.elevationZones.${scope}`)
  const isRated = level !== '0'

  return (
    <>
      <div className="flex items-center gap-3.5 px-4 pt-4">
        <Image
          alt=""
          className={cn('size-16 shrink-0 rounded-xl', backgroundColorByHazardLevel[level])}
          height={64}
          src={hazardIcons[level]}
          width={64}
        />
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[21px] leading-tight font-bold tracking-[-.02em]">
            {isRated && `${level} · `}
            {t(hazardLevelNamesByScale[level])}
          </h2>
          <p className="text-muted text-copy-sm mt-0.5">{scopeLabel}</p>
        </div>
      </div>
      {!isRated && <p className="text-ink text-copy-lg mx-4 mt-3.5 leading-[1.55]">{parts[0]}</p>}
      {isRated &&
        descriptionLabelKeys.map(
          (labelKey, index) =>
            parts[index] && (
              <InfoSection
                key={labelKey}
                title={t(`forecast.hazardLevels.descriptionLabels.${labelKey}`)}
              >
                <p className="text-ink text-copy-lg leading-[1.55]">{parts[index]}</p>
              </InfoSection>
            ),
        )}
      <InfoSection title={t('forecast.page.dangerScale')}>
        <ul className="flex flex-col gap-1.5">
          {hazardScaleLevels.map((scaleLevel) => (
            <ScaleItem
              key={scaleLevel}
              badge={scaleLevel}
              badgeClassName={cn(
                'shadow-[inset_0_0_0_1px_rgba(0,0,0,.1)]',
                backgroundColorByHazardLevel[scaleLevel],
                hazardTextClass(scaleLevel),
              )}
              currentLabel={scaleLevel === level ? currentLabel : undefined}
              description={getParts(scaleLevel)[0]}
              name={t(hazardLevelNamesByScale[scaleLevel])}
            />
          ))}
        </ul>
      </InfoSection>
    </>
  )
}

export default DangerInfo
