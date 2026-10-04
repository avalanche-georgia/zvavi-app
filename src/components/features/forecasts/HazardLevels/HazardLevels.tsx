'use client'

import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { elevationZones } from './constants'

import HazardPreview from './HazardPreview'
import HazardScaleRow from './HazardScaleRow'
import OverallHint from './OverallHint'

// Overall + per-zone danger ratings, next to a live preview of the public graphic
const HazardLevels = ({ sectionId }: { sectionId: string }) => {
  const t = useTranslations()

  return (
    <FormCard
      className="@container"
      description={t('admin.forecast.editor.hazard.description')}
      sectionId={sectionId}
      title={t('admin.forecast.editor.hazard.title')}
    >
      <div className="grid grid-cols-[208px_minmax(0,1fr)] gap-8 @max-[640px]:grid-cols-1">
        <HazardPreview />
        <div className="flex flex-col gap-2">
          <HazardScaleRow label={t('common.words.overall')} zone="overall" />
          <div className="pl-33 @max-[520px]:pl-0">
            <OverallHint />
          </div>
          <div className="border-rule mt-2 border-t pt-4">
            <span className="text-micro text-muted font-semibold uppercase">
              {t('admin.forecast.editor.hazard.byElevation')}
            </span>
          </div>
          {elevationZones.map((zone) => (
            <HazardScaleRow key={zone} label={t(`common.elevationZones.${zone}`)} zone={zone} />
          ))}
        </div>
      </div>
    </FormCard>
  )
}

export default HazardLevels
