'use client'

import { AspectMiniGrid, formatAvalancheId, SizeTile } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import AvalancheBadge from './AvalancheBadge'
import LinkedAvalancheCardActions from './LinkedAvalancheCardActions'
import useAvalancheLabels from './useAvalancheLabels'

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
  const { getSummary } = useAspectSummary()
  const { getDate, getTitle } = useAvalancheLabels()
  const { aspects, forecastAvalanche, id, location, quantity, size, status } = avalanche
  const otherForecasts = forecastAvalanche.filter((link) => link.forecastId !== forecastId).length
  const aspectSummary = aspects && getSummary(aspects)
  const meta = [getDate(avalanche), location, quantity > 1 && `×${quantity}`].filter(Boolean)
  const key = 'admin.forecast.editor.avalanches'

  return (
    <div className="border-rule bg-surface @container grid grid-cols-[52px_minmax(0,1fr)_auto] gap-3.5 rounded-[14px] border p-3.5">
      <SizeTile className="size-13 rounded-[11px]" size={size} />
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            className="text-ink hover:text-accent focus-ring text-left text-[15px] font-semibold hover:underline"
            onClick={onView}
            type="button"
          >
            {getTitle(avalanche)}
          </button>
          <AvalancheBadge kind={status} />
          {!isSaved && <AvalancheBadge kind="notSaved" />}
        </div>
        <p className="text-copy-sm text-body flex flex-wrap gap-x-1.5">
          <span className="text-muted font-mono text-xs leading-5">{formatAvalancheId(id)}</span>
          {meta.map((part) => (
            <span key={String(part)}>· {part}</span>
          ))}
        </p>
        {aspects && aspectSummary ? (
          <div className="flex flex-wrap items-center gap-3">
            <AspectMiniGrid aspects={aspects} />
            <span className="text-caption text-body">{aspectSummary}</span>
          </div>
        ) : (
          <p className="text-caption text-muted">{t(`${key}.noAspects`)}</p>
        )}
        {otherForecasts > 0 && (
          <p className="text-accent-hover flex items-center gap-1 text-[12.5px] font-medium">
            <Link2 aria-hidden className="size-3.5" />
            {t(`${key}.alsoOn`, { count: otherForecasts })}
          </p>
        )}
      </div>
      <LinkedAvalancheCardActions id={id} onEdit={onEdit} onRemove={onRemove} />
    </div>
  )
}

export default LinkedAvalancheCard
