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

  if (!forecast) return <span className={cn('bg-tile h-5 rounded-xs', isToday && todayClasses)} />

  const level = forecast.hazardLevels.overall

  return (
    <button
      aria-label={t('forecast.history.glance.dayLabel', {
        date: formatDay(day),
        level: t(hazardLevelNamesByScale[level]),
      })}
      className={cn(
        'focus-ring inset-ring-ink/8 hover:inset-ring-ink h-5 rounded-xs inset-ring transition-opacity hover:inset-ring-2',
        backgroundColorByHazardLevel[level],
        isToday && todayClasses,
        isDimmed && 'opacity-20',
      )}
      onBlur={() => onDayHover(null)}
      onClick={() => onDaySelect(forecast)}
      onFocus={() => onDayHover(day)}
      onMouseEnter={() => onDayHover(day)}
      onMouseLeave={() => onDayHover(null)}
      type="button"
    />
  )
}

export default CalendarDayCell
