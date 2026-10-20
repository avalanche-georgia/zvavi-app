import CalendarDayCell from './CalendarDayCell'
import useArchiveFormat from '../hooks/useArchiveFormat'
import {
  type ArchiveFilters,
  type ArchiveForecast,
  getMonthLength,
  isWholeMonth,
  matchesFilters,
} from '../model'

import { cn } from '@/lib/utils'

type CalendarMonthRowProps = {
  dayMap: Map<string, ArchiveForecast>
  filters: ArchiveFilters
  monthId: string
  onDayHover: (day: string | null) => void
  onDaySelect: (forecast: ArchiveForecast) => void
  onMonthToggle: (monthId: string) => void
  today: string
}

// The month label (a button filtering the list to that month) and its 31 cells
const CalendarMonthRow = ({
  dayMap,
  filters,
  monthId,
  onDayHover,
  onDaySelect,
  onMonthToggle,
  today,
}: CalendarMonthRowProps) => {
  const { formatMonth, formatMonthShort } = useArchiveFormat()
  const monthLength = getMonthLength(monthId)
  const isActive = isWholeMonth(filters.from, filters.to, monthId)

  return (
    <>
      <button
        aria-label={formatMonth(monthId)}
        aria-pressed={isActive}
        className={cn(
          'focus-ring text-caption rounded-xs text-left leading-5 font-semibold uppercase transition-colors',
          isActive ? 'text-accent' : 'text-muted hover:text-ink',
        )}
        onClick={() => onMonthToggle(monthId)}
        type="button"
      >
        {formatMonthShort(monthId)}
      </button>
      {Array.from({ length: 31 }, (_, index) => {
        const day = `${monthId}-${String(index + 1).padStart(2, '0')}`
        const forecast = dayMap.get(day)

        if (index >= monthLength) return <span key={day} />

        return (
          <CalendarDayCell
            key={day}
            day={day}
            forecast={forecast}
            isDimmed={!!forecast && !matchesFilters(forecast, filters)}
            isToday={day === today}
            onDayHover={onDayHover}
            onDaySelect={onDaySelect}
          />
        )
      })}
    </>
  )
}

export default CalendarMonthRow
