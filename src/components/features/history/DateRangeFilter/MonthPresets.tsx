import { useTranslations } from 'next-intl'

import useArchiveFormat from '../hooks/useArchiveFormat'
import { getPresetMonths, isWholeMonth } from '../model'

import { cn } from '@/lib/utils'

type MonthPresetsProps = {
  activeMonths: string[]
  from: string | null
  onMonthSelect: (monthId: string) => void
  seasonStartYear: number
  to: string | null
}

// Nov–Apr of the season (plus any busy off-season month): one tap picks the
// whole month, a second clears it. Months without forecasts are disabled.
const MonthPresets = ({
  activeMonths,
  from,
  onMonthSelect,
  seasonStartYear,
  to,
}: MonthPresetsProps) => {
  const t = useTranslations()
  const { formatMonth, formatMonthShort } = useArchiveFormat()

  return (
    <div
      aria-label={t('forecast.history.filters.months')}
      className="grid grid-cols-6 gap-1.5"
      role="group"
    >
      {getPresetMonths(seasonStartYear, activeMonths).map((monthId) => {
        const isActive = isWholeMonth(from, to, monthId)
        const hasForecasts = activeMonths.includes(monthId)

        return (
          <button
            key={monthId}
            aria-label={formatMonth(monthId)}
            aria-pressed={isActive}
            className={cn(
              'focus-ring rounded-control text-copy-sm h-11 border font-medium transition-colors',
              'disabled:text-disabled disabled:cursor-not-allowed disabled:border-dashed',
              isActive
                ? 'border-accent bg-accent text-white'
                : 'border-rule text-ink enabled:hover:bg-tile',
            )}
            disabled={!hasForecasts}
            onClick={() => onMonthSelect(monthId)}
            type="button"
          >
            {formatMonthShort(monthId)}
          </button>
        )
      })}
    </div>
  )
}

export default MonthPresets
