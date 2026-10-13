import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import InfoSection from './InfoSection'
import ScaleItem from './ScaleItem'
import { descriptionLabelKeys } from '../HazardLevelsByElevation/HazardLevelDescriptionRows'
import { hazardScaleLevels, hazardTextClass } from '../model/hazard'

import { cn } from '@/lib/utils'

// What the overall danger level means: travel advice, likelihood, size and
// distribution — then the whole 1–5 scale with this forecast's level marked
const DangerInfo = ({ level }: { level: HazardLevelScale }) => {
  const t = useTranslations()

  // "travel advice | likelihood | size and distribution"
  const getParts = (scaleLevel: HazardLevelScale) =>
    t(`forecast.hazardLevels.descriptions.${scaleLevel}`)
      .split(' | ')
      .map((part) => part.trim())
      .filter(Boolean)

  const parts = getParts(level)
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
          <p className="text-muted text-copy-sm mt-0.5">{t('common.labels.overallDangerLevel')}</p>
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
              currentLabel={scaleLevel === level ? t('forecast.page.thisForecast') : undefined}
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
