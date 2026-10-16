export type AvalancheLoaderSize = 'lg' | 'md' | 'sm'

type SizeConfig = {
  // Tailwind size class of the square
  box: string
  // Line width of the crack in rendered pixels
  crackPx: number
  // Dust puff radius in the box
  dust: number
  // Flake radius in the box, before the per-flake factor
  flake: number
  // Background ridges, rock outcrops and highlights: too fine to read on a small square
  hasDetail: boolean
  // Powder puff radius in the box
  puff: number
  // Rendered size in pixels
  px: number
}

export const sizeConfigs: Record<AvalancheLoaderSize, SizeConfig> = {
  lg: { box: 'size-28', crackPx: 2.5, dust: 11, flake: 4.2, hasDetail: true, puff: 9, px: 112 },
  md: { box: 'size-16', crackPx: 2, dust: 12, flake: 5.5, hasDetail: true, puff: 10, px: 64 },
  sm: { box: 'size-10', crackPx: 2, dust: 12, flake: 5.5, hasDetail: false, puff: 10, px: 40 },
}
