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

  // Filled stretches of the 24h track; a window past midnight wraps around
  const getSegments = () => {
    if (isAllDay) return [{ left: 0, width: 1 }]
    if (!start || !end) return []

    const from = getDayFraction(start)
    const to = getDayFraction(end)

    if (to > from) return [{ left: from, width: to - from }]

    return [
      { left: from, width: 1 - from },
      { left: 0, width: to },
    ]
  }

  const getValue = () => {
    if (isAllDay) return t('admin.forecast.form.problems.labels.allDay')
    if (!start || !end) return '—'

    return `${formatTime(start)} – ${formatTime(end)}`
  }

  return (
    <Tile
      isWide
      label={t('forecast.sections.avalancheProblems.modal.labels.timeOfDay')}
      value={getValue()}
    >
      <div aria-hidden className="bg-off rounded-badge relative h-3.5 overflow-hidden">
        {getSegments().map(({ left, width }) => (
          <i
            key={left}
            className="bg-accent absolute inset-y-0"
            style={{ left: `${left * 100}%`, width: `${width * 100}%` }}
          />
        ))}
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
