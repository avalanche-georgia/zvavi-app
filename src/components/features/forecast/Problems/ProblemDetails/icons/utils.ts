export const size = 72
export const center = size / 2
const strokeWidth = 9
const innerRadius = (size - strokeWidth) / 2

export const timeToAngle = (timeStr: string | null): number => {
  if (!timeStr) return 0
  const [hours, minutes] = timeStr.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes

  return ((totalMinutes % (12 * 60)) / (12 * 60)) * 360
}

export const polarToCartesian = (angle: number, radius = innerRadius) => ({
  x: center + radius * Math.cos(((angle - 90) * Math.PI) / 180),
  y: center + radius * Math.sin(((angle - 90) * Math.PI) / 180),
})

export const createSectorPath = (startAngle: number, endAngle: number) => {
  const start = polarToCartesian(startAngle, innerRadius)
  const end = polarToCartesian(endAngle, innerRadius)
  const angleDiff = (endAngle - startAngle + 360) % 360
  const largeArcFlag = angleDiff > 180 ? 1 : 0

  return [
    `M ${center} ${center}`,
    `L ${start.x} ${start.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ')
}

export const getTickCoordinates = (angle: number) => {
  const tickLength = 6
  const outerX = center + innerRadius * Math.cos(angle - Math.PI / 2)
  const outerY = center + innerRadius * Math.sin(angle - Math.PI / 2)
  const innerX = center + (innerRadius - tickLength) * Math.cos(angle - Math.PI / 2)
  const innerY = center + (innerRadius - tickLength) * Math.sin(angle - Math.PI / 2)

  return { x1: innerX, x2: outerX, y1: innerY, y2: outerY }
}
