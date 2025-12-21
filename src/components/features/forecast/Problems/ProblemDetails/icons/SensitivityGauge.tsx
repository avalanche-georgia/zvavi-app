import { sensitivityLevelsSorted } from '@domain/constants'
import type { Sensitivity } from '@domain/types'

interface SensitivityGaugeProps {
  value: Sensitivity
  diameter?: number
  strokeWidth?: number
  className?: string
}

const SensitivityGauge = ({
  className,
  diameter = 200,
  strokeWidth = 16,
  value,
}: SensitivityGaugeProps) => {
  const precision = 2
  const levels = sensitivityLevelsSorted
  const margin = 2
  const segments = levels.length
  const cx = diameter / 2
  const radius = diameter / 2 - strokeWidth / 2 - margin
  const cy = radius + margin + strokeWidth / 2
  const anglePer = Math.PI / segments
  const startAngle = Math.PI
  const gap = 0.06 // small gap between segments
  const pt = (angle: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  })
  const svgHeight = radius + strokeWidth

  return (
    <div className={className}>
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${diameter} ${svgHeight}`}
        width="100%"
      >
        {levels.map((lvl, i) => {
          const start = startAngle + i * anglePer + gap / 2
          const end = start + (anglePer - gap)
          const p1 = pt(start)
          const p2 = pt(end)

          return (
            <path
              key={lvl}
              className={lvl === value ? 'stroke-violet-600' : 'stroke-violet-200'}
              d={`M ${p1.x.toFixed(precision)} ${p1.y.toFixed(precision)} A ${radius.toFixed(precision)} ${radius.toFixed(precision)} 0 0 1 ${p2.x.toFixed(precision)} ${p2.y.toFixed(precision)}`}
              fill="none"
              strokeLinecap="butt"
              strokeWidth={strokeWidth}
            />
          )
        })}
        {/* Needle */}
        {(() => {
          const idx = levels.indexOf(value)
          const angle = startAngle + (idx + 0.5) * anglePer
          const len = radius - strokeWidth
          const x2 = cx + len * Math.cos(angle)
          const y2 = cy + len * Math.sin(angle)

          return (
            <>
              <circle className="fill-violet-200" cx={cx} cy={cy} r={5} />
              <line
                className="stroke-violet-200"
                strokeLinecap="round"
                strokeWidth={strokeWidth / 5}
                x1={cx}
                x2={x2}
                y1={cy}
                y2={y2}
              />
            </>
          )
        })()}
      </svg>
    </div>
  )
}

export default SensitivityGauge
