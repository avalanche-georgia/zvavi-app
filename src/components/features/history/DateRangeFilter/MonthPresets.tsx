import { useTranslations } from 'next-intl'

import useArchiveFormat from '../hooks/useArchiveFormat'
import { isWholeMonth } from '../model'

import { cn } from '@/lib/utils'

type MonthPresetsProps = {
  activeMonths: string[]
  from: string | null
  onMonthSelect: (monthId: string) => void
  to: string | null
}

// The season's months with forecasts: one tap picks the whole month, a second
// clears it
const MonthPresets = ({ activeMonths, from, onMonthSelect, to }: MonthPresetsProps) => {
  const t = useTranslations()
  const { formatMonth, formatMonthShort } = useArchiveFormat()

  return (
    <div
      aria-label={t('forecast.history.filters.months')}
      className="grid grid-cols-6 gap-1.5"
      role="group"
    >
      {activeMonths.map((monthId) => {
        const isActive = isWholeMonth(from, to, monthId)

        return (
          <button
            key={monthId}
            aria-label={formatMonth(monthId)}
            aria-pressed={isActive}
            className={cn(
              'focus-ring rounded-control text-copy-sm h-11 border font-medium transition-colors',
              isActive
                ? 'border-accent bg-accent text-white'
                : 'border-rule text-ink hover:bg-tile',
            )}
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
