'use client'

import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import AvalancheBadge from './AvalancheBadge'
import AvalancheRecordCard from './AvalancheRecordCard'
import LinkedAvalancheCardActions from './LinkedAvalancheCardActions'

type LinkedAvalancheCardProps = {
  avalanche: LinkableAvalanche
  forecastId: number | undefined
  isSaved: boolean
  onEdit: VoidFunction
  onRemove: VoidFunction
  onView: VoidFunction
}

// A catalog record this forecast links to
const LinkedAvalancheCard = (props: LinkedAvalancheCardProps) => {
  const { avalanche, forecastId, isSaved, onEdit, onRemove, onView } = props
  const t = useTranslations()
  const { forecastAvalanche, id } = avalanche
  const otherForecasts = forecastAvalanche.filter((link) => link.forecastId !== forecastId).length

  return (
    <AvalancheRecordCard
      actions={<LinkedAvalancheCardActions id={id} onEdit={onEdit} onRemove={onRemove} />}
      avalanche={avalanche}
      extraBadges={!isSaved && <AvalancheBadge kind="notSaved" />}
      footer={
        otherForecasts > 0 && (
          <p className="text-accent-hover flex items-center gap-1 text-[12.5px] font-medium">
            <Link2 aria-hidden className="size-3.5" />
            {t('admin.forecast.editor.avalanches.alsoOn', { count: otherForecasts })}
          </p>
        )
      }
      onView={onView}
    />
  )
}

export default LinkedAvalancheCard
