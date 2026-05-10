import type { HazardLevelScale } from '@domain/types'

export const hazardHexColors: Record<HazardLevelScale, string> = {
  '0': '#d0d5de',
  '1': '#6ac828',
  '2': '#ffff00',
  '3': '#f88f2c',
  '4': '#eb450b',
  '5': '#1b1a1e',
}

export const strokeColorByLevel: Record<HazardLevelScale, string> = {
  '0': '#8b9094',
  '1': '#44841a',
  '2': '#a5a500',
  '3': '#a15a1c',
  '4': '#822906',
  '5': '#4d4d57',
}

// Derived from strokeColorByLevel. Must be used as full classname because of TW
export const hoverStrokeClassByLevel: Record<HazardLevelScale, string> = {
  '0': 'hover:stroke-[#8b9094]',
  '1': 'hover:stroke-[#44841a]',
  '2': 'hover:stroke-[#a5a500]',
  '3': 'hover:stroke-[#a15a1c]',
  '4': 'hover:stroke-[#822906]',
  '5': 'hover:stroke-[#4d4d57]',
}
