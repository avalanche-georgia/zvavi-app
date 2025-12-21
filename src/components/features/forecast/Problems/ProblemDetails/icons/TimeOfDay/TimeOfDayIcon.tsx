import { center, createSectorPath, getTickCoordinates, size, timeToAngle } from '../utils'

interface TimeOfDayProps {
  timeOfDay: { start: string; end: string }
  isAllDay: boolean
}

const TimeOfDayIcon = ({ isAllDay, timeOfDay }: TimeOfDayProps) => {
  const hourTicks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI
    const { x1, x2, y1, y2 } = getTickCoordinates(angle)

    return <line key={i} stroke="white" strokeWidth={1.5} x1={x1} x2={x2} y1={y1} y2={y2} />
  })

  return (
    <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
      {/* Background circle */}
      <circle className="fill-violet-200" cx={center} cy={center} r={size / 2} />

      {/* Active arc/sector */}
      {isAllDay ? (
        <circle className="fill-violet-600" cx={center} cy={center} r={(size - 9) / 2} />
      ) : (
        timeOfDay.start &&
        timeOfDay.end && (
          <path
            className="fill-violet-600"
            d={createSectorPath(timeToAngle(timeOfDay.start), timeToAngle(timeOfDay.end))}
          />
        )
      )}

      {/* Hour ticks */}
      {hourTicks}
    </svg>
  )
}

export default TimeOfDayIcon
