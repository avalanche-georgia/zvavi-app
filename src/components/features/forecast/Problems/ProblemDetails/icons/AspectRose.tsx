import { sortedAspects } from '@domain/constants'
import type { ElevationZone, Problem } from '@domain/types'
import clsx from 'clsx'

import { getLabelTransform, getRosePoints, nonRotatingLabels } from './helpers'

const zones: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']
const zoneRadius = { alpine: 27, highAlpine: 17, subAlpine: 37 }
const center = 42
const anglePer = (2 * Math.PI) / sortedAspects.length

const AspectRose = ({ selectedAspects }: { selectedAspects: Problem['aspects'] }) => {
  return (
    <svg className="size-full text-violet-600" viewBox="0 0 84 84">
      {zones.map((zone, zoneIndex) => {
        const innerRadius = zoneIndex === 0 ? 0 : zoneRadius[zones[zoneIndex - 1]]
        const outerRadius = zoneRadius[zone]
        const active = new Set(selectedAspects[zone] ?? [])

        return sortedAspects.map((direction, index) => {
          return (
            <polygon
              key={`${zone}-${direction}`}
              className={clsx(
                'stroke-gray-100',
                active.has(direction) ? 'fill-violet-600' : 'fill-violet-200',
              )}
              points={getRosePoints({ anglePer, center, index, innerRadius, outerRadius })}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          )
        })
      })}

      {sortedAspects.map((direction, index) => {
        const angle = index * anglePer - Math.PI / 2
        const labelRadius = 39
        const x = center + labelRadius * Math.cos(angle)
        const y = center + labelRadius * Math.sin(angle)
        const transform = getLabelTransform(direction, angle, x, y)
        const isDirectionActive = Object.values(selectedAspects).some((zone) =>
          zone.includes(direction),
        )

        const textElement = (
          <text
            className={clsx(
              // eslint-disable-next-line no-nested-ternary
              isDirectionActive
                ? 'fill-violet-700'
                : nonRotatingLabels.includes(direction)
                  ? 'fill-gray-700'
                  : 'fill-gray-400',
            )}
            dominantBaseline="middle"
            fontSize="8"
            textAnchor="middle"
            x={x}
            y={y}
          >
            {direction.toUpperCase()}
          </text>
        )

        return transform ? (
          <g key={`label-${direction}`} transform={transform}>
            {textElement}
          </g>
        ) : (
          <g key={`label-${direction}`}>{textElement}</g>
        )
      })}
    </svg>
  )
}

export default AspectRose
