import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import { useTranslations } from 'next-intl'

import useArchiveFormat from '../hooks/useArchiveFormat'
import type { ArchiveForecast } from '../model'

import { cn } from '@/lib/utils'

type CalendarDayCellProps = {
  day: string
  forecast: ArchiveForecast | undefined
  // Covered, but filtered out of the list
  isDimmed: boolean
  isToday: boolean
  onDayHover: (day: string | null) => void
  onDaySelect: (forecast: ArchiveForecast) => void
}

// 1.5px: today must stand out on 20px cells, where a 2px ring swallows the colour
const todayClasses = 'inset-ring-[1.5px] inset-ring-ink'

const CalendarDayCell = ({
  day,
  forecast,
  isDimmed,
  isToday,
  onDayHover,
  onDaySelect,
}: CalendarDayCellProps) => {
  const t = useTranslations()
  const { formatDay } = useArchiveFormat()

  if (!forecast) return <span className={cn('bg-tile rounded-bar h-5', isToday && todayClasses)} />

  const level = forecast.hazardLevels.overall

  return (
    <button
      aria-label={t('forecast.history.glance.dayLabel', {
        date: formatDay(day),
        level: t(hazardLevelNamesByScale[level]),
      })}
      className={cn(
        'focus-ring inset-ring-ink/8 hover:inset-ring-ink rounded-bar h-5 inset-ring transition-opacity hover:inset-ring-2',
        backgroundColorByHazardLevel[level],
        isToday && todayClasses,
        isDimmed && 'opacity-20',
      )}
      onBlur={() => onDayHover(null)}
      onClick={() => onDaySelect(forecast)}
      onFocus={() => onDayHover(day)}
      onMouseEnter={() => onDayHover(day)}
      onMouseLeave={() => onDayHover(null)}
      // ~190 days would bury the filters for keyboard users; the list below
      // holds the same forecasts
      tabIndex={-1}
      type="button"
    />
  )
}

export default CalendarDayCell
