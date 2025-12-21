import type { Aspect } from '@domain/types'

export const getRosePoints = ({
  anglePer,
  center,
  index,
  innerRadius,
  outerRadius,
}: {
  index: number
  innerRadius: number
  outerRadius: number
  center: number
  anglePer: number
}) => {
  const offset = Math.PI / 8
  const a1 = index * anglePer - Math.PI / 2 - offset
  const a2 = (index + 1) * anglePer - Math.PI / 2 - offset
  const x1 = center + innerRadius * Math.cos(a1)
  const y1 = center + innerRadius * Math.sin(a1)
  const x2 = center + outerRadius * Math.cos(a1)
  const y2 = center + outerRadius * Math.sin(a1)
  const x3 = center + outerRadius * Math.cos(a2)
  const y3 = center + outerRadius * Math.sin(a2)
  const x4 = center + innerRadius * Math.cos(a2)
  const y4 = center + innerRadius * Math.sin(a2)

  return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`
}

export const nonRotatingLabels = ['e', 'w', 's', 'n']

export const getLabelTransform = (direction: Aspect, angle: number, x: number, y: number) => {
  if (nonRotatingLabels.includes(direction)) return undefined

  let rotation = (angle * 180) / Math.PI

  if (direction === 'ne' || direction === 'sw') rotation += 90
  if (direction === 'nw' || direction === 'se') rotation -= 90
  if (rotation > 90 && rotation < 270) rotation += 180

  return `rotate(${rotation}, ${x}, ${y})`
}
