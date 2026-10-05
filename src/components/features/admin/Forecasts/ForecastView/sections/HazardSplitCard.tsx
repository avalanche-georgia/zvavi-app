import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevels } from '@domain/types'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import ElevationRows from './ElevationRows'
import { HazardTile } from '../../shared'

const eyebrowClasses = 'text-muted text-xs font-semibold tracking-[.06em] uppercase'

// Overall on the left, the three elevation bands on the right; stacks when narrow
const HazardSplitCard = ({ hazardLevels }: { hazardLevels: HazardLevels }) => {
  const t = useTranslations()
  const { overall } = hazardLevels

  return (
    <FormCard title={t('admin.forecast.editor.hazard.title')}>
      <div className="@container">
        <div className="grid grid-cols-[auto_1px_minmax(0,1fr)] items-center gap-6 @max-[560px]:grid-cols-1">
          <div className="flex items-center gap-4">
            <HazardTile className="rounded-card text-title-lg size-16" level={overall} size="lg" />
            <div className="flex flex-col gap-0.5">
              <span className={eyebrowClasses}>{t('admin.forecasts.view.overall')}</span>
              <span className="text-ink text-xl font-semibold">
                {t(hazardLevelNamesByScale[overall])}
              </span>
            </div>
          </div>
          <div aria-hidden className="bg-rule self-stretch @max-[560px]:h-px" />
          <div className="flex flex-col gap-2">
            <span className={eyebrowClasses}>{t('admin.forecast.editor.hazard.byElevation')}</span>
            <ElevationRows hazardLevels={hazardLevels} />
          </div>
        </div>
      </div>
    </FormCard>
  )
}

export default HazardSplitCard
