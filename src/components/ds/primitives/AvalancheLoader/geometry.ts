// Everything is drawn in a 160 × 160 box that scales with the element
export const BOX = 160
export const round = (value: number) => Math.round(value * 10) / 10

// The slab as one whole shape, seen while the snow settles and cracks, before it breaks up
export const SLAB =
  '50.3,84 56,80 62,87 68,80 74,87 80,80 86,87 89,84 90.5,116 92,148 6,148 28,112 46,92'
// Bare ground the slab slides off; the zigzag top is where the crack opens
export const BED =
  '50.3,84 56,80 62,87 68,80 74,87 80,80 86,87 89,84 90,104 92,148 6,148 28,112 46,92'
export const CUT_FACE =
  '50.3,84 56,80 62,87 68,80 74,87 80,80 86,87 89,84 89.3,87.5 86,90.5 80,83.5 74,90.5 68,83.5 62,90.5 56,83.5 50.3,87.5'
// Mountain silhouette with softly rounded peak and foot
export const SILHOUETTE =
  'M88.8 24.3L87.2 23.4L85.5 23L83.7 23.3L82.1 24.3L81 25.7L46.1 91.7L27.8 112.4L10.6 140.4L10 142.4L10.1 144.5L11.2 146.3L12.9 147.6L14.9 148L145.2 148L147 147.7L148.6 146.7L149.7 145.2L150.2 143.4L150 141.5L132.2 84.6L131.6 83.4L118 62L104.4 38.7L103.4 37.5Z'

export const flakes = [
  { cx: 14, factor: 0.9 },
  { cx: 34, factor: 0.65 },
  { cx: 56, factor: 1.15 },
  { cx: 76, factor: 0.7 },
  { cx: 98, factor: 1 },
  { cx: 120, factor: 0.6 },
  { cx: 142, factor: 0.85 },
]

// [cx, cy, delay in s]
export const puffs = [
  [34, 100, 0],
  [54, 108, 0.03],
  [74, 102, 0.06],
  [24, 126, 0.02],
  [58, 124, 0.07],
  [80, 118, 0.04],
]
export const dusts = [
  [26, 140, 0],
  [52, 142, 0.04],
  [78, 140, 0.08],
]
