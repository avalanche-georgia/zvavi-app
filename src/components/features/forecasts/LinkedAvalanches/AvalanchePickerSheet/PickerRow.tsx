import { formatAvalancheId, SizeTile } from '@components/features/observations'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import AvalancheBadge from '../AvalancheBadge'
import useAvalancheLabels from '../useAvalancheLabels'

import { cn } from '@/lib/utils'

type PickerRowProps = {
  avalanche: LinkableAvalanche
  isLinked: boolean
  isSelected: boolean
  onToggle: VoidFunction
}

const PickerRow = ({ avalanche, isLinked, isSelected, onToggle }: PickerRowProps) => {
  const t = useTranslations()
  const { getDate, getTitle } = useAvalancheLabels()
  const { forecastAvalanche, id, location, size, status } = avalanche
  const isChecked = isLinked || isSelected
  const forecastCount = forecastAvalanche.length

  return (
    <button
      aria-checked={isChecked}
      className={cn(
        'focus-ring grid w-full grid-cols-[20px_40px_minmax(0,1fr)] items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors',
        isSelected ? 'bg-accent-soft' : 'hover:bg-canvas',
        isLinked && 'cursor-not-allowed opacity-60',
      )}
      disabled={isLinked}
      onClick={onToggle}
      role="checkbox"
      type="button"
    >
      <span
        className={cn(
          'grid size-5 place-items-center rounded-md border',
          isChecked ? 'border-accent bg-accent text-white' : 'border-rule-strong bg-surface',
        )}
      >
        {isChecked && <Check aria-hidden className="size-3.5" strokeWidth={3} />}
      </span>
      <SizeTile className="size-10 rounded-lg" size={size} />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-copy text-ink font-semibold">{getTitle(avalanche)}</span>
          <AvalancheBadge kind={isLinked ? 'alreadyLinked' : status} />
        </span>
        <span className="text-caption text-body truncate">
          <span className="font-mono">{formatAvalancheId(id)}</span> · {getDate(avalanche)}
          {location && ` · ${location}`}
        </span>
        <span className="text-caption text-muted">
          {forecastCount > 0
            ? t('admin.forecast.editor.avalanches.picker.onForecasts', { count: forecastCount })
            : t('admin.forecast.editor.avalanches.picker.notOnForecasts')}
        </span>
      </span>
    </button>
  )
}

export default PickerRow
