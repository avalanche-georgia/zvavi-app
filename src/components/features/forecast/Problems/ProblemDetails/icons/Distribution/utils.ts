import type { Distribution } from '@domain/types'

export const getFilledDots = (distribution: Distribution): Set<number> => {
  switch (distribution) {
    case 'isolated':
      // Only 2-3 dots filled (isolated areas)
      return new Set([9, 14])

    case 'specific':
      // About 8-10 dots filled (specific areas)
      return new Set([2, 3, 4, 8, 9, 10, 14, 15, 16, 20])

    case 'widespread':
      // Most dots filled (widespread), leaving some unfilled for visual variety
      return new Set([
        0, // Row 1: missing dot 3
        1,
        2,
        4,
        5,
        6, // Row 2: missing dot 8
        7,
        9,
        10,
        11,
        12, // Row 3: missing dot 16
        13,
        14,
        15,
        17, // Row 4: missing dot 18
        19,
        20,
        21,
        22,
        23,
      ])

    default:
      return new Set()
  }
}

export const dotSize = 5
export const columns = 6
export const rows = 4
export const spacing = 16
export const width = (columns - 1) * spacing + dotSize * 2
export const height = (rows - 1) * spacing + dotSize * 2

export const getDotProps = (index: number, filledDots: Set<number>) => {
  const row = Math.floor(index / columns)
  const col = index % columns
  const cx = dotSize + col * spacing
  const cy = dotSize + row * spacing
  const isFilled = filledDots.has(index)

  return { cx, cy, index, isFilled }
}
