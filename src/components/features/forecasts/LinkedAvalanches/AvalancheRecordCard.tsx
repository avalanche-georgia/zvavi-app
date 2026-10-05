'use client'

import { AspectMiniGrid, formatAvalancheId, SizeTile } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import AvalancheBadge from './AvalancheBadge'
import useAvalancheLabels from './useAvalancheLabels'

type AvalancheRecordCardProps = {
  // Right column: form → edit / unlink; view → "Open record"
  actions: React.ReactNode
  avalanche: LinkableAvalanche
  // After the status badge, e.g. the form's "Not saved"
  extraBadges?: React.ReactNode
  // Under the aspects, e.g. the form's "Also on N forecasts"
  footer?: React.ReactNode
  onView: VoidFunction
}

// A catalog avalanche record: size tile, title, id · date · place · quantity, aspects
const AvalancheRecordCard = (props: AvalancheRecordCardProps) => {
  const { actions, avalanche, extraBadges, footer, onView } = props
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const { getDate, getTitle } = useAvalancheLabels()
  const { aspects, id, location, quantity, size, status } = avalanche
  const aspectSummary = aspects && getSummary(aspects)
  const meta = [getDate(avalanche), location, quantity > 1 && `×${quantity}`].filter(Boolean)

  return (
    <div className="border-rule bg-surface @container grid grid-cols-[52px_minmax(0,1fr)_auto] gap-3.5 rounded-[14px] border p-3.5 @max-[620px]:grid-cols-[52px_minmax(0,1fr)]">
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
          {extraBadges}
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
          <p className="text-caption text-muted">
            {t('admin.forecast.editor.avalanches.noAspects')}
          </p>
        )}
        {footer}
      </div>
      <div className="@max-[620px]:col-span-2">{actions}</div>
    </div>
  )
}

export default AvalancheRecordCard
