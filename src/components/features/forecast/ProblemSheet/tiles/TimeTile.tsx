import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import Tile from './Tile'
import useForecastDates from '../../model/useForecastDates'

const ticks = ['00', '06', '12', '18', '24']

// The part of the day the problem matters: a 24h track with its window filled
const TimeTile = ({ problem }: { problem: Pick<Problem, 'isAllDay' | 'timeOfDay'> }) => {
  const t = useTranslations()
  const { formatTime, getDayFraction } = useForecastDates()
  const { isAllDay, timeOfDay } = problem
  const { end = null, start = null } = timeOfDay ?? {}
  const hasWindow = !isAllDay && Boolean(start && end)

  const getWindow = () => {
    if (isAllDay) return { left: 0, width: 1 }
    if (!start || !end) return null

    const from = getDayFraction(start)
    const to = getDayFraction(end)

    // An end at or before the start runs to midnight
    return { left: from, width: (to > from ? to : 1) - from }
  }

  const window = getWindow()
  const value = isAllDay
    ? t('admin.forecast.form.problems.labels.allDay')
    : hasWindow
      ? `${formatTime(start!)} – ${formatTime(end!)}`
      : '—'

  return (
    <Tile
      isWide
      label={t('forecast.sections.avalancheProblems.modal.labels.timeOfDay')}
      value={value}
    >
      <div aria-hidden className="bg-off relative h-3.5 overflow-hidden rounded-sm">
        {window && (
          <i
            className="bg-accent absolute inset-y-0"
            style={{ left: `${window.left * 100}%`, width: `${window.width * 100}%` }}
          />
        )}
      </div>
      <div
        aria-hidden
        className="text-muted text-micro mt-1.5 flex justify-between tracking-normal"
      >
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </Tile>
  )
}

export default TimeTile
